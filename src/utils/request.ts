import type { CustomAxiosResponse, SupportedHTTPMethod } from '@/models/request';
import type { AxiosResponse } from 'axios';
import i18n from '@/i18n';
import { useAuthStore } from '@/stores/auth';
import axios, { AxiosError } from 'axios';
import { forEach, isEmpty, snakeCase } from 'lodash-es';
import qs from 'qs';
import urlJoin from 'url-join';
import { decoder } from './decoder';

/** 构建完整 url 给 uni.request */
function buildURL(baseURL: string, url: string, params: Record<string, unknown>) {
  return `${urlJoin(baseURL, url)}${qs.stringify(params, { addQueryPrefix: true, arrayFormat: 'brackets' })}`;
}

/** 处理 uni.request 返回 */
function settle(resolve: (value: AxiosResponse) => void, reject: (reason?: any) => void, response: AxiosResponse) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      `Request failed with status code ${response.status}`,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response,
    ));
  }
}

const apiOrigin = import.meta.env.VITE_APP_API_ORIGIN ?? '';
export const request = axios.create({
  baseURL: `${apiOrigin}/app_api/v1`,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  async adapter(config) {
    const method = (() => {
      if (config.method === undefined) {
        throw new Error('axios method is undefined');
      }

      const upperCaseName = config.method.toUpperCase();
      if (!['GET', 'POST', 'PUT', 'DELETE'].includes(upperCaseName)) {
        throw new Error('axios method is not supported');
      }

      return upperCaseName as SupportedHTTPMethod;
    })();

    if (!config.baseURL) {
      throw new Error('axios baseURL is invalid');
    }

    if (!config.url) {
      throw new Error('axios url is invalid');
    }

    try {
      const request = await uni.request({
        method,
        url: buildURL(config.baseURL, config.url, config.params),
        // wx.request warning header must be an object
        header: JSON.parse(JSON.stringify(config.headers)),
        timeout: config.timeout,
        data: config.data,
        responseType: config.responseType || 'text',
        enableCache: true,
      });
      const response = {
        data: request.data,
        status: request.statusCode,
        statusText: request.errMsg || '',
        headers: request.header,
        config,
      };
      return new Promise((resolve, reject) => settle(resolve, reject, response));
    } catch (err: unknown) {
      /**
       * 微信小程序请求方法 返回错误数据如下
       * { errMsg: 'request:fail ' } => 断网
       * { errMsg: 'request:fail timeout' } => 超时
       */
      if (
        typeof err === 'object'
        && err !== null
        && 'errMsg' in err
        && typeof err.errMsg === 'string'
      ) {
        const axiosErrorCode = (() => {
          // 断网
          if (/^request:fail $/.test(err.errMsg)) {
            return AxiosError.ERR_NETWORK;
          }
          // 超时
          if (/^request:fail timeout$/.test(err.errMsg)) {
            return AxiosError.ETIMEDOUT;
          }
        })();

        return Promise.reject(new AxiosError(
          err.errMsg,
          axiosErrorCode,
          config,
        ));
      }

      return Promise.reject(err);
    }
  },
});

// 请求拦截
request.interceptors.request.use((config) => {
  if (config.headers) {
    const authStore = useAuthStore();
    // token
    if (!config.headers.Authorization && authStore.accessToken) {
      config.headers.Authorization = authStore.accessToken;
    }

    // 语言
    if (i18n.global.locale) {
      config.headers.Locale = i18n.global.locale;
    }
  }

  return config;
});

// 响应拦截
let request_count = 0;
const MAX_REQUEST_COUNT = 5;
request.interceptors.response.use(
  (res: CustomAxiosResponse) => {
    const meta: CustomAxiosResponse['meta'] = {};
    forEach(res.headers, (v, k) => {
      if (/^x-/i.test(k)) {
        const key = snakeCase(k.replace(/^x-/i, ''));
        Object.assign(meta, { [key]: decoder(v) });
      }
    });
    if (!isEmpty(meta)) {
      res.meta = meta;
    }

    return res;
  },
  async (err: AxiosError) => {
    // 未登录
    if (err.response?.status === 401) {
      request_count += 1;
      const authStore = useAuthStore();
      authStore.signOut();
      await authStore.login();
      if (request_count < MAX_REQUEST_COUNT) {
        // 重新请求的时候token可能是旧的, 需要更新
        const resConfig = {
          ...err.response?.config,
          headers: { ...err.response?.config.headers, Authorization: authStore.accessToken },
        };
        return request(resConfig);
      }
      if (request_count >= MAX_REQUEST_COUNT) {
        request_count = 0;
        throw new Error('登录失败, 请检查token是否有效');
      }
    }

    return Promise.reject(err);
  },
);
