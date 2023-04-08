import qs from 'qs';

class Nav {
  tabPages = [
    '/pages/root/home',
  ];

  tabQueryMap: Record<string, Record<string, unknown>> = {
    '/pages/root/home': {},
  };

  get currentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  }

  get prevPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 2];
  }

  goHome() {
    return uni.switchTab({ url: '/pages/root/home' });
  }

  isTabPage(url = this.currentPage.route) {
    const origin = url?.split('?')[0];
    if (origin === undefined) {
      return false;
    }
    const regex = new RegExp(origin);
    return !!this.tabPages.find(item => regex.test(item));
  }

  navigateTo(options: UniNamespace.NavigateToOptions | UniNamespace.RedirectToOptions) {
    const pages = getCurrentPages();
    // 处理超过十级页面无法跳转问题
    if (pages.length < 10) {
      return uni.navigateTo(options);
    }

    return this.redirectTo(options);
  }

  redirectTo(options: UniNamespace.RedirectToOptions) {
    return uni.redirectTo(options);
  }

  reLaunch(options: UniNamespace.ReLaunchOptions) {
    return uni.reLaunch(options);
  }

  switchTab(options: UniNamespace.SwitchTabOptions) {
    const { url } = options;
    const [origin, query] = url.split('?');
    // 支持跳转 tab 时，传递参数，一般是 url 来源 api
    if (Object.prototype.hasOwnProperty.call(this.tabQueryMap, origin)) {
      this.tabQueryMap[origin] = qs.parse(query);
    }
    uni.switchTab({ ...options, url: origin });
  }

  navigateBack(options: UniNamespace.NavigateBackOptions = {}) {
    const { delta = 1 } = options;
    const pages = getCurrentPages();
    const canBack = pages.length > delta;
    canBack ? uni.navigateBack(options) : this.goHome();
  }

  nav(url: string) {
    if (url) {
      if (url.startsWith('http')) {
        this.navigateTo({ url: `/pages/extra/web-site?src=${encodeURIComponent(url)}` });
      } else if (this.isTabPage(url)) {
        this.switchTab({ url });
      } else {
        this.navigateTo({ url });
      }
    }
  }
}

export const nav = new Nav();
