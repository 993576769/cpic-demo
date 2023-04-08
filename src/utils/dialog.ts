import { t } from '@/i18n';

export function alert(params: string | UniApp.ShowModalOptions) {
  let options: UniApp.ShowModalOptions;
  if (typeof params === 'string') {
    options = {
      content: params,
      showCancel: false,
      confirmText: t('global.confirm'),
    };
  } else {
    options = params;
  }
  return uni.showModal(options);
}

export async function confirm(params: string | UniApp.ShowModalOptions) {
  let options: UniApp.ShowModalOptions;
  if (typeof params === 'string') {
    options = {
      content: params,
      cancelText: t('global.cancel'),
      confirmText: t('global.confirm'),
    };
  } else {
    options = params;
  }

  const { cancel } = await uni.showModal(options);

  if (cancel) {
    return Promise.reject(new Error('confirm cancel'));
  }
}
