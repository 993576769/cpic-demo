export const alert = (content, opts = {}) => {
  return uni.showModal({
    content,
    confirmText: '我知道了',
    showCancel: false,
    ...opts
  });
}

export const confirm = async (content, opts = {}) => {
  const { confirm } = await uni.showModal({
    content,
    confirmText: '确认',
    showCancel: true,
    cancelText: '取消',
    ...opts
  });
  if (!confirm) {
    return Promise.reject('用户取消');
  }
}
