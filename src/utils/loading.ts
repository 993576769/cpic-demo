import { AxiosError, isAxiosError, isCancel } from 'axios';
import { alert } from './dialog';
import { t } from '@/i18n';

export function showLoading(params: UniApp.ShowLoadingOptions = { title: '', mask: true }) {
  return uni.showLoading(params);
}

function hideLoading() {
  return uni.hideLoading();
}

function handleError(err: unknown) {
  // 主动 abort axios 请求
  if (isCancel(err)) {
    return Promise.reject(err);
  }

  if (isAxiosError(err)) {
    // 断网
    if (err.code === AxiosError.ERR_NETWORK) {
      alert(t('error.offline'));
      return Promise.reject(err);
    }

    // 超时
    if (err.code === AxiosError.ETIMEDOUT) {
      alert(t('error.timeout'));
      return Promise.reject(err);
    }

    const errStatus = err.response?.status;
    if (errStatus === 401) {
      return;
    }

    if (errStatus === 404) {
      alert(t('error.404'));
      return Promise.reject(err);
    }

    if (typeof errStatus === 'number' && errStatus >= 500) {
      alert(t('error.server', { status: errStatus }));
      return Promise.reject(err);
    }

    const msgText = err.response?.data.error_message || err.response?.data.error || err.message;
    alert(msgText);
  } else if (err instanceof Error) {
    alert(err.message);
  }

  return Promise.reject(err);
}

export function autoLoading<T>(target: (() => Promise<T>) | Promise<T>) {
  const action = target instanceof Function ? target() : target;
  showLoading();

  return action
    .then((res) => {
      hideLoading();
      return Promise.resolve(res);
    })
    .catch((err: unknown) => {
      hideLoading();
      return handleError(err);
    });
}
