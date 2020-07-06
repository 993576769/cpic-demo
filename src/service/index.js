import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export class Service extends Vue {
  pageListeners = {}

  subscribe(name, handle, auto_clear = true) {
    name = this.buildEventName(name);
    this.$on(name, handle);
    const clear = () => {
      this.$off(name, handle);
    };
    if (auto_clear) {
      const page_id = this.$nav.currentPage.__wxWebviewId__;
      if (!this.pageListeners[page_id]) {
        this.pageListeners[page_id] = [];
      }
      this.pageListeners[page_id].push(clear);
    }
    return clear;
  }

  buildEventName(name) {
    if (typeof name === 'string') {
      return _.kebabCase(name);
    } else if (_.isObject(name)) {
      const { event, model } = name;
      return `${_.kebabCase(event)}:${model.tn}:${model.id}`;
    }
  }

  dispatchEvent(name, ...args) {
    this.$emit(this.buildEventName(name), ...args);
  }
}

export const service = new Service;

Vue.mixin({
  onUnload() {
    _.forEach(service.pageListeners[this.__wxWebviewId__], v => v());
  }
});
