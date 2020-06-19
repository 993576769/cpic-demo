import Vue from 'vue';
import _ from 'lodash';

export default class Observable {
  static create(state) {
    const instance = new this();
    if (state) {
      _.forEach(Object.getOwnPropertyDescriptors(state), (descriptor, key) => {
        if ('value' in descriptor) {
          instance[key] = descriptor.value;
        } else {
          Object.defineProperty(instance, key, descriptor);
        }
      });
    }
    Vue.observable(instance);
    return instance;
  }
}

/*  #ifdef MP-WEIXIN  */

Observable.prototype.toJSON = toJSON;

/*  #endif  */

// 解决小程序里，store 部分属性无法设置到小程序 data 上的问题
export function toJSON() {
  if (!this.$json_names) {
    const ownNames = Object.keys(this);
    const getComputedNames = function (store, __proto__ = store.__proto__) {
      if (__proto__ === Object.prototype) {
        return;
      }
      const descriptors = Object.getOwnPropertyDescriptors(__proto__);
      _.forEach(descriptors, (descriptor, name) => {
        if (!ownNames.includes(name) && descriptor.get) {
          ownNames.push(name);
        }
      });
      getComputedNames(store, __proto__.__proto__);
    };

    getComputedNames(this);
    this.$json_names = ownNames;
  }

  const excludeJsonNames = this.constructor.excludeJsonNames || [];
  return _.pick(this, _.without(this.$json_names, ...excludeJsonNames));
}
