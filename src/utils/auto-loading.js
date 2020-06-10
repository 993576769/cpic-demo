import _ from 'lodash'
import { alert, confirm } from './dialog';
import showToast from './show-toast';

const ignoreErrors = /(cancel|ignore|请先登录)/i

const hideLoading = async () => {
  try {
    await uni.hideLoading();
  // eslint-disable-next-line no-empty
  } catch (e) {}
}

async function loading(target, title = '加载中', retry = _.get(this, 'retry', false)) {
  uni.showLoading({
    title, mask: true
  })

  const action = Promise.resolve(target instanceof Function ? target() : target)

  return action
    .catch(err => {
      const msg = err.message || ''
      if (!ignoreErrors.test(msg)) {
        if (retry) {
          confirm(msg, { cancelText: '取消', confirmText: '重试' })
            .then(() => {
              loading.call(this, ...arguments)
            })
            .catch(() => {});
        } else {
          if (msg) {
            if (msg.length > 20) {
              alert(msg);
            } else {
              setTimeout(() => showToast(msg), 0);
            }
          }
        }
      }
      throw err
    })
    .finally(hideLoading)
}

function loadingDecorator({ title, retry = _.get(this, 'retry') } = {}) {
  return function (target, name, descriptor) {
    const func = descriptor.value
    descriptor.value = function () {
      return loading(() => func.apply(this, arguments), title, retry)
    }
  }
}

export default function autoLoading(...args) {
  if (args[0] instanceof Promise || args[0] instanceof Function) {
    return loading.call(this, ...args)
  } else if (args.length === 3) {
    return loadingDecorator.call(this)(...args)
  } else {
    return loadingDecorator.call(this, args[0])
  }
}

autoLoading.retry = function () {
  return autoLoading.apply({ retry: true }, arguments)
}
