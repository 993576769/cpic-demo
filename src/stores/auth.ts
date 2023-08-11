import { computed, ref } from 'vue';
import { type Params, defineSimpleStore } from './helper/simple-store';
import { request } from '@/utils/request';
import { APPID, STORAGE_KEYS } from '@/constants';
import type { LoginParams, User } from '@/models/user';
import { getUserDefaultData } from '@/models/user';

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

  async function login() {
    const { code } = await uni.login();
    const params: LoginParams = { code, appid: APPID };

    const { data: newData } = await request.post<{ access_token: string; user: User }>('auth/wechat_mini_program/code_to_sessions', params);
    accessToken.value = newData.access_token;
    data.value = newData.user;
    return newData;
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
