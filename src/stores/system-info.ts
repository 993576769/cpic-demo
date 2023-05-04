import { defineStore } from 'pinia';

export const useSystemInfoStore = defineStore('systemInfo', () => {
  const data = getData();

  function getData() {
    return uni.getSystemInfoSync();
  }

  const isIos = () => {
    const platform = data?.platform;
    if (platform) {
      return platform.toUpperCase() === 'IOS';
    } else {
      return false;
    }
  };

  const rpx2px = (rpx: number) => {
    const { windowWidth } = data;
    return (rpx / 750) * windowWidth;
  };

  return {
    isIos,
    data,
    rpx2px,
  };
});

export const systemInfoStore = useSystemInfoStore();
