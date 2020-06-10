
export function pageRefresh(target, name, descriptor) {
  const func = descriptor.value

  async function action() {
    try {
      await (name === 'onPullDownRefresh' ? func.call(this) : this[name]())
    } catch (err) {
      err.message && uni.showModal({
        title: '请求失败',
        content: err.message,
        showCancel: false,
        confirmText: '确定',
      })
    } finally {
      uni.stopPullDownRefresh()
    }
  }

  if (name === 'onPullDownRefresh') {
    descriptor.value = action
  } else {
    Object.defineProperty(target, 'onPullDownRefresh', {
      value: action
    })
  }
}
