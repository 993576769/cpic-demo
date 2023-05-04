import { ref } from 'vue';
import { defineStore } from 'pinia';
import { mapSimpleStore, useSimpleStore } from './helper/simple';
import type { LoginData, LoginParams, User } from '@/models/user';
import { getUserDefaultData } from '@/models/user';
import { APPID, STORAGE_KEYS } from '@/constants';
import { request } from '@/utils/request';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(getUserDefaultData());
  const simpleStore = useSimpleStore({
    async fetch() {
      const { data } = await request.get<User>('mine');
      user.value = data;
      return { data };
    },
  });

  const accessToken = ref<string>(uni.getStorageSync(STORAGE_KEYS.ACCESS_TOKEN) || '');

  function setAccessToken(v: string) {
    accessToken.value = v;
    uni.setStorageSync(STORAGE_KEYS.ACCESS_TOKEN, v);
  }

  async function fetch() {
    const { data } = await request.get<User>('mine');
    user.value = data;
    return { data };
  }

  let uniqueLoginPromise: Promise<void> | null = null;
  function login() {
    if (uniqueLoginPromise) {
      return uniqueLoginPromise;
    }
    uniqueLoginPromise = getLoginPromise().finally(() => uniqueLoginPromise = null);
    return uniqueLoginPromise;
  }
  async function getLoginPromise() {
    const { code } = await uni.login();
    const params: LoginParams = { code, appid: APPID };
    const { data: { access_token, user: userData } } = await request.post<LoginData>('auth/wechat_mini_program/code_to_sessions', params);
    user.value = userData;
    setAccessToken(access_token);
    simpleStore.isFulfilled = true;
  }

  function signOut() {
    setAccessToken('');
    user.value = getUserDefaultData();
    simpleStore.isFulfilled = false;
  }

  return {
    ...mapSimpleStore(simpleStore),
    user,
    login,
    fetch,
    signOut,
    accessToken,
  };
});

export const authStore = useAuthStore();
