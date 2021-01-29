import { SimpleStore } from './helper/simple-store';
import Observable from './helper/observable';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { request } from '@/utils';

class User extends Observable {
  nickname = ''
  avatar = ''

  get wechat_authorized() {
    return this.avatar && this.nickname;
  }
}

class AuthStore extends SimpleStore {
  $access_token = uni.getStorageSync(ACCESS_TOKEN_KEY)
  user = User.create()

  async checkLogin() {
    if (this.access_token) {
      try {
        await uni.checkSession();
        return this.access_token;
      } catch (e) {
        return this.login();
      }
    }
    return this.login();
  }

  async login() {
    const { code } = await uni.login();
    const { data: { access_token, user } } = await request.post('/users/token', { code });
    this.user = User.create(user);
    return this.access_token = access_token;
  }

  set access_token(v) {
    this.$access_token = v;
    uni.setStorageSync(ACCESS_TOKEN_KEY, v);
  }

  get access_token() {
    return this.$access_token;
  }
}

export const authStore = new AuthStore();
