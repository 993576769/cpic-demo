import { Prop } from 'vue-property-decorator';

let referenceCount = 0;
const referenceList = new Map();

export default function install(Vue) {
  Vue.mixin({
    created() {
      this.$referenceIds = [];
    },

    destroyed() {
      referenceList.forEach((id, reference) => {
        if (this.$referenceIds.includes(id)) {
          referenceList.delete(reference);
        }
      });
    },

    methods: {
      $getReferenceId(value) {
        if (!referenceList.has(value)) {
          const id = String(++referenceCount);
          this.$referenceIds.push(id);
          referenceList.set(value, id);
        }
        return referenceList.get(value);
      },
    }
  });
}

export function PropReference(options) {
  const { type, default: getDefault = () => null, required } = options;
  return (target, name, descriptor) => {
    // #ifdef MP-WEIXIN || APP-PLUS
    const idPropName = name + 'Id';
    Prop({ type: String, required })(target, idPropName, descriptor);

    Object.defineProperty(target, name, {
      get() {
        for (let [reference, id] of referenceList) {
          if (id === this[idPropName]) {
            if (!(reference instanceof type)) {
              // eslint-disable-next-line no-console
              console.warn(`name is not a ${type.name}`);
            }
            return reference;
          }
        }
        return getDefault();
      }
    });
    // #endif

    // #ifdef H5
    Prop(options)(target, name, descriptor);
    // #endif
  };
}
