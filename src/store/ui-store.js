export default new class {
  systemInfo = {}

  constructor() {
    this.setSystemInfo()
  }

  setSystemInfo() {
    try {
      this.systemInfo = uni.getSystemInfoSync()
    } catch (error) {
      this.systemInfo = uni.getSystemInfoSync()
    } finally {
      this.systemInfo.platform || (this.systemInfo = uni.getSystemInfoSync())
    }
  }

  isFullScreenModel() {
    return this.isIphone11 || this.isIphoneX
  }

  get isIphoneX() {
    const { screenHeight, screenWidth, model } = this.systemInfo;
    return model.toUpperCase().indexOf('IPHONE X') !== -1 || (this.isIOS && (screenHeight / screenWidth === 2436 / 1125));
  }

  get isIphone11() {
    const { model } = this.systemInfo
    return model.toUpperCase().indexOf('IPHONE 11') !== -1
  }

  get isIOS() {
    const { platform } = this.systemInfo;
    if (platform) {
      return platform.toUpperCase() === 'IOS';
    } else {
      return false;
    }
  }

}
