import sleep from './sleep';

export default async function(params) {
  if (!params) { throw new Error('title is not defined') }
  const defaultParams = {
    title: '',
    icon: 'none',
    mask: false,
    duration: 2000
  }
  const newParams = typeof params === 'string' ? { title: params } : params;
  const toastOpts = Object.assign({}, defaultParams, newParams);
  await sleep(100);
  uni.showToast(toastOpts);
  const duration = toastOpts.duration || 2000;
  await sleep(duration);
}
