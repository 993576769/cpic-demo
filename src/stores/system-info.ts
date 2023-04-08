class SystemInfoStore {
  data: UniApp.GetSystemInfoResult | undefined;

  constructor() {
    this.data = this.getData();
  }

  getData() {
    return uni.getSystemInfoSync();
  }

  get isIOS() {
    const platform = this.data?.platform;

    if (platform) {
      return platform.toUpperCase() === 'IOS';
    } else {
      return false;
    }
  }
}

export const systemInfoStore = new SystemInfoStore();
