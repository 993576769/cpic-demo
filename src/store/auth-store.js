import { SimpleStore } from './helper/simple-store';
import { authRequest } from '@/utils';

const { VUE_APP_ENV } = process.env;
const TOKEN_STORAGE_KEY = `${VUE_APP_ENV}_token`;

export class AuthStore extends SimpleStore {
  token = '';

  async saveToken(token) {
    this.token = token;
    uni.setStorage({
      key: TOKEN_STORAGE_KEY,
      data: token
    });
    return this.token;
  }

  async getToken() {
    if (!this.token) {
      try {
        const { data } = await uni.getStorage({ key: TOKEN_STORAGE_KEY });
        this.token = data || '';
      } catch (e) {
        this.token = '';
      }
    }
    return this.token;
  }

  async checkLogin() {
    const token = await this.getToken();
    if (token) {
      try {
        await uni.checkSession();
        return token;
      } catch (e) {
        return this.login();
      }
    }
    return this.login();
  }

  async login() {
    this.saveToken('');
    const { code } = await uni.login();
    const { data: { access_token } } = await authRequest.post('/users/token', { code });
    return this.saveToken(access_token);
  }
}

export const authStore = new AuthStore();
