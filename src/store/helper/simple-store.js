import _ from 'lodash'
import Vue from 'vue'
import StoreHelper from './store-helper'

export class SimpleStore extends StoreHelper {
  isFetching = false
  isRejected = false
  isFulfilled = false
  error = null

  constructor() {
    super()
    activate(this)
  }

  setPendingState() {
    this.isFetching = true
  }

  setFulfilledState(newState) {
    Object.assign(this, {
      isFetching: false,
      isRejected: false,
      isFulfilled: true,
      error: null,
    }, newState)
  }

  setRejectedState(error, options) {
    const nextState = {
      error,
      isFetching: false,
      isRejected: true,
    }
    Object.assign(this, nextState, options)
  }

  fetchData() {
    return Promise.resolve()
  }

  tryFetchData() {
    return !this.isFulfilled && this.fetchData(...arguments)
  }

  mergeFetched(handle) {
    return this.fetching(handle, true)
  }

  async fetching(handle, autoMerge = false) {
    this.setPendingState()
    try {
      const res = await (typeof handle === 'function' ? handle() : handle)
      const newState = autoMerge ? (res.isResponse ? res.data : res) : void 0
      this.setFulfilledState(newState)
    } catch (err) {
      this.setRejectedState(err)
      throw err
    }
  }
}

function getAllPrototypeDescriptors(target) {
  let descriptors = Object.getOwnPropertyDescriptors(target)
  let { __proto__ } = target
  while (__proto__ !== Object.prototype) {
    descriptors = Object.assign({}, Object.getOwnPropertyDescriptors(__proto__), descriptors)
    __proto__ = __proto__.__proto__
  }
  return _.omit(descriptors, 'constructor')
}

function activate(store) {
  const descriptors = getAllPrototypeDescriptors(store)
  _.forEach(descriptors, (descriptor, name) => {
    if (descriptor.get && !descriptor.enumerable) {
      descriptor.enumerable = true
      Object.defineProperty(store, name, descriptor)
    }
  })
}

Vue.prototype.$SimpleStore = SimpleStore
