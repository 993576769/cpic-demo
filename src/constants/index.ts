const { VITE_APP_ENV } = import.meta.env;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${VITE_APP_ENV}_ACCESS_TOKEN`,
  UPDATE_USER_INFO: `${VITE_APP_ENV}_UPDATE_USER_INFO`,
};

export const APPID = (() => {
  const accountInfo = uni.getAccountInfoSync();

  return accountInfo.miniProgram.appId;
})();

export const SESSION_STORAGE_KEYS = {
  COUNTDOWN_KEY: `${import.meta.env.VITE_APP_ENV}_COUNTDOWN_KEY`,
};
