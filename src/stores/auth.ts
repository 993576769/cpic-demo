import { reactive } from 'vue';
import { SimpleStore } from './helper/simple';
import type { LoginData, LoginParams, User } from '@/models/user';
import { getUserDefaultData } from '@/models/user';
import { request } from '@/utils';
import { APPID, STORAGE_KEYS } from '@/constants';

const STORAGE_KEY = STORAGE_KEYS.ACCESS_TOKEN;
class AuthStore extends SimpleStore<LoginData> {
  user: User = getUserDefaultData();
  $access_token = '';

  set access_token(v: string) {
    this.$access_token = v;
    uni.setStorageSync(STORAGE_KEY, v);
  }

  get access_token(): string {
    this.$access_token = this.$access_token || uni.getStorageSync(STORAGE_KEY) || '';
    return this.$access_token;
  }

  async fetch() {
    const { code } = await uni.login();
    const params: LoginParams = { code, appid: APPID };
    return request.post<LoginData>('auth/wechat_mini_program/code_to_sessions', params);
  }

  async login() {
    const { data: { access_token, user } } = await this.fetchData();
    this.user = user;
    return this.access_token = access_token;
  }

  signOut() {
    this.access_token = '';
    this.user = getUserDefaultData();
    this.isFulfilled = false;
  }

  async fetchUser() {
    const { data } = await request.get<User>('mine');
    this.user = data;
    return data;
  }
}
export const authStore = reactive(new AuthStore());
