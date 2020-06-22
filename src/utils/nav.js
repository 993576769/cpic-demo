import _ from 'lodash';

export function goHome() {
  uni.reLaunch({ url: '/pages/index' });
}

export const tabPages = [
  '/pages/index'
];

export function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const debouncedRedirect = _.debounce((url) => uni.redirectTo({ url }), 150);

export function redirectTo(url) {
  debouncedRedirect(url);
}

export function getPrevPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 2];
}

export function goBack(delta = 1) {
  const pages = getCurrentPages();
  const canBack = pages.length > delta;
  canBack ? uni.navigateBack({ delta }) : goHome();
}

/**
 * [处理超过十级页面无法跳转问题]
 *
 * @param   {Object | String}  options  [页面跳转参数，或页面url]
 */
export function navigateTo(options) {
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }
  const pages = getCurrentPages();
  const navType = pages.length < 10 ? 'navigateTo' : 'redirectTo';
  uni[navType](options);
}

export function isTabPage(url = getCurrentPage().route) {
  const reg = new RegExp(url);
  return !!tabPages.find(item => reg.test(item));
}

export function nav(url) {
  if (!url) {
    return goHome();
  }
  if (isTabPage(url)) {
    uni.reLaunch({ url });
  } else {
    navigateTo(url);
  }
}
