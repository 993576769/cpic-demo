import _ from 'lodash';
import qs from 'qs';
import { randomString } from './random';

class Nav {
  tabPages = [
    '/pages/root/home'
  ]

  tabQueryList = {
    '/pages/root/home': {},
  }

  get currentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  }

  get prevPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 2];
  }

  goHome() {
    return uni.reLaunch({ url: '/pages/root/home' });
  }

  isTabPage(url = this.currentPage.route) {
    const reg = new RegExp(url);
    return !!this.tabPages.find(item => reg.test(item));
  }

  createRouteEvent(handle) {
    const name = randomString();
    uni.$on(name, handle);
    return name;
  }

  dispatchRouteEvent(name = '', params) {
    uni.$emit(name, params);
  }

  navigateTo(options) {
    let { url, params } = options;
    // 支持 url 参数中传递函数
    if (params) {
      params = _.mapValues(params, value => {
        if (typeof value === 'function') {
          return this.createRouteEvent(value);
        }
        return value;
      });

      url = url + qs.stringify(params, { addQueryPrefix: true, encode: false });
    }

    // 处理超过十级页面无法跳转问题
    const pages = getCurrentPages();
    const navType = pages.length < 10 ? 'navigateTo' : 'redirectTo';
    return uni[navType]({ ...options, url });
  }

  redirectTo(options) {
    return uni.redirectTo(options);
  }

  reLaunch(options) {
    return uni.redirectTo(options);
  }

  switchTab(options) {
    const { url } = options;
    const [link, search] = url.split('?');
    // 支持跳转 tab 时，传递参数，一般是 url 来源 api
    this.tabQueryList[url] = qs.parse(search);
    uni.switchTab({ ...options, url: link });
  }

  navigateBack(options = {}) {
    const { delta = 1 } = options;
    const pages = getCurrentPages();
    const canBack = pages.length > delta;
    canBack ? uni.navigateBack(options) : this.goHome();
  }

  nav(link) {
    if (link) {
      if (/^http/.test(link)) {
        this.navigateTo({ url: `/pages/extra/web-site?src=${encodeURIComponent(link)}` });
      } else if (this.isTabPage(link)) {
        this.switchTab({ url: link });
      } else {
        this.navigateTo({ url: link });
      }
    }
  }
}

export const nav = new Nav();
