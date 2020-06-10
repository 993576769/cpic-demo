import Vue from 'vue'
import _ from 'lodash'

export default class StoreHelper {
  static checkKey(instanceKey) {
    if (!instanceKey) {
      throw new Error('instanceKey is not defined')
    }
    return String(instanceKey)
  }

  static get instanceList() {
    if (!this._instanceList) this._instanceList = new Map
    return this._instanceList
  }

  static find(instanceKey) {
    return this.instanceList.get(this.checkKey(instanceKey))
  }

  static create(state) {
    const instance = new this(state)
    if (state) {
      _.forEach(Object.getOwnPropertyDescriptors(state), (descriptor, key) => {
        if ('value' in descriptor) {
          instance[key] = descriptor.value
        } else {
          Object.defineProperty(instance, key, descriptor)
        }
      })
    }
    Vue.observable(instance)
    return instance
  }

  static findOrCreate(instanceKey, newState) {
    const key = this.checkKey(instanceKey)
    if (!this.instanceList.has(key)) {
      this.instanceList.set(key, this.create(newState))
    }
    return this.instanceList.get(key)
  }

  static createOrUpdate(instanceKey, newState) {
    const key = this.checkKey(instanceKey)
    if (!this.instanceList.has(key)) {
      this.instanceList.set(key, this.create(newState))
    } else {
      newState && this.instanceList.get(key).setState(newState)
    }
    return this.instanceList.get(key)
  }

  setState(newState) {
    return Object.assign(this, newState)
  }
}
