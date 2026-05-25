import qs from 'qs';

class Nav {
  pageAliases: Record<string, string> = {
    '/activity': '/pages/activity/index',
    '/activity/invite-list': '/pages/activity/invite-list',
    '/activity/records': '/pages/activity/records',
    '/customers/wang': '/pages/customers/wang/index',
    '/customers/wang/followup': '/pages/customers/wang/followup',
    '/customers/wang/followup/tasks': '/pages/customers/wang/followup-tasks',
    '/customers/wang/todo-list': '/pages/customers/wang/todo-list',
    '/customers/wang/visit-record': '/pages/customers/wang/visit-record',
    '/journey': '/pages/journey/index',
    '/journey/batch-send': '/pages/journey/index?sheet=batch-send',
    '/material': '/pages/material/index',
    '/material/content': '/pages/material/content',
    '/material/content-task/education': '/pages/material/content-task',
    '/material/moments': '/pages/material/moments/index',
    '/material/moments/publish': '/pages/material/moments/publish',
    '/operation': '/pages/operation/index',
    '/operation/zhongqiu': '/pages/operation/detail',
    '/todo-ai': '/pages/customers/wang/visit-record',
    '/tools': '/pages/root/tools',
  };

  tabPages = [
    '/pages/root/home',
    '/pages/root/tools',
    '/pages/root/customers',
    '/pages/root/data',
    '/pages/root/me',
  ];

  tabQueryMap: Record<string, Record<string, unknown>> = {
    '/pages/root/home': {},
    '/pages/root/tools': {},
    '/pages/root/customers': {},
    '/pages/root/data': {},
    '/pages/root/me': {},
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

  normalizeUrl(url: string) {
    const [origin, query] = url.split('?');
    const alias = this.pageAliases[origin];
    if (alias === undefined) {
      return url;
    }

    return query === undefined ? alias : `${alias}?${query}`;
  }

  nav(url: string) {
    const normalizedUrl = this.normalizeUrl(url);
    if (normalizedUrl) {
      if (normalizedUrl.startsWith('http')) {
        this.navigateTo({ url: `/pages/extra/web-site?src=${encodeURIComponent(normalizedUrl)}` });
      } else if (this.isTabPage(normalizedUrl)) {
        this.switchTab({ url: normalizedUrl });
      } else {
        this.navigateTo({ url: normalizedUrl });
      }
    }
  }
}

export const nav = new Nav();
