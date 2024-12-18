import { onShareAppMessage } from '@dcloudio/uni-app';

interface ShareConfig {
  title?: string;
  path?: string;
  imageUrl?: string;
}

/**
 * 小程序分享钩子函数
 * @param fn 返回分享配置的函数
 *
 * @example
 * // 使用默认配置
 * const onShareAppMessage = useShare();
 *
 * // 自定义配置
 * const onShareAppMessage = useShare(() => ({
 *   title: '分享标题',
 *   path: '/pages/index/index',
 *   imageUrl: 'https://example.com/share.png'
 * }));
 */
export function useShare(fn: () => ShareConfig = () => ({})) {
  onShareAppMessage(() => {
    let { title, path, imageUrl } = fn();

    if (path?.startsWith('http')) {
      path = `/pages/extra/web-site?src=${encodeURIComponent(path)}`;
    } else if (!path) {
      path = '/pages/root/home';
    }

    return { title, path, imageUrl };
  });

  return onShareAppMessage;
}
