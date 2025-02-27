import type { LoginParams, User } from '@/models/user';
import type { Params } from './helper/simple-store';
import { APPID, STORAGE_KEYS } from '@/constants';
import { getUserDefaultData } from '@/models/user';
import { request } from '@/utils/request';
import { computed, ref } from 'vue';
import { defineSimpleStore } from './helper/simple-store';

export interface LoginBody {
  email: string;
  password: string;
}

export const useAuthStore = defineSimpleStore('auth', getUserDefaultData, ({
  fetch,
  data,
  resetData,
}) => {
  const _accessToken = ref(uni.getStorageSync(STORAGE_KEYS.ACCESS_TOKEN) || '');
  const accessToken = computed({
    get() {
      return _accessToken.value;
    },
    set(v) {
      _accessToken.value = v;
      uni.setStorageSync(STORAGE_KEYS.ACCESS_TOKEN, v);
    },
  });

  fetch.value = (params?: Params) => {
    return request.get('mine', { params });
  };

  let loginPromise: Promise<any> | null = null;
  async function login() {
    // accessToken存在则说明有效，若无效，request方法会调用signOut清空再执行login
    if (accessToken.value) {
      return;
    }
    if (!loginPromise) {
      loginPromise = (async () => {
        try {
          const { code } = await uni.login();
          const params: LoginParams = { code, appid: APPID };
          const { data: newData } = await request.post<{ token: string; user: User }>('auth/wechat_mini_program/code_to_sessions', params);
          accessToken.value = newData.token;
          data.value = newData.user;
          return newData;
        } finally {
          loginPromise = null;
        }
      })();
    }
    return loginPromise;
  }

  function signOut() {
    accessToken.value = '';
    resetData.value();
  }

  return {
    login,
    signOut,
    accessToken,
  };
});
