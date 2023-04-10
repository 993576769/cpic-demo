export function showToast(params: string | UniApp.ShowToastOptions) {
  let options: UniApp.ShowToastOptions;
  if (typeof params === 'string') {
    options = { title: params, icon: 'none', duration: 1500 };
  } else {
    options = params;
  }
  uni.showToast(options);
  return new Promise(resolve => setTimeout(resolve, options.duration));
}
