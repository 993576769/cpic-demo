import { forEach, isEmpty, snakeCase } from 'lodash-es';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import qs from 'qs';
import urlJoin from 'url-join';
import { decoder } from './index';
import type { CustomAxiosResponse, SupportedHTTPMethod } from '@/models/request';
import i18n from '@/i18n';

/** 构建完整 url 给 uni.request */
function buildURL(baseURL: string, url: string, params: Record<string, unknown>) {
  return `${urlJoin(baseURL, url)}${qs.stringify(params, { addQueryPrefix: true })}`;
}

/** 处理 uni.request 返回 */
function settle(resolve: Function, reject: Function, response: AxiosResponse) {
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
const request = axios.create({
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

    const result = await uni.request({
      method,
      url: buildURL(config.baseURL, config.url, config.params),
      header: config.headers,
      timeout: config.timeout,
      data: config.data,
      responseType: config.responseType || 'text',
      enableCache: true,
    });

    const response = {
      data: result.data,
      status: result.statusCode,
      statusText: result.errMsg ?? '',
      headers: result.header,
      config,
    };
    return new Promise((resolve, reject) => settle(resolve, reject, response));
  },
});

// 请求拦截
request.interceptors.request.use((config) => {
  if (config.headers) {
    // TODO
    // token
    // if (!config.headers['Authorization'] && authStore.access_token) {
    //   config.headers['Authorization'] = authStore.access_token;
    // }

    // 语言
    if (i18n.global.locale) {
      config.headers.Locale = i18n.global.locale;
    }
  }

  return config;
});

// 响应拦截
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
    if (err.response?.status === 401) {
      // TODO: 未登录
      // await authStore.signOut();
    }

    return Promise.reject(err);
  },
);

export default request;
