import Fly from 'flyio/dist/npm/fly';
import EngineWrapper from 'flyio/dist/npm/engine-wrapper';
import _ from 'lodash';
import { authStore } from '@/store';

function adapter(request, responseCallback) {
  uni.request({
    method: request.method,
    url: request.url,
    dataType: request.dataType || undefined,
    header: request.headers,
    data: request.body || {},
    success(res) {
      responseCallback({
        statusCode: res.statusCode,
        responseText: res.data,
        headers: res.header,
        statusMessage: res.errMsg,
      });
    },
    fail(res) {
      responseCallback({
        responseText: res.data,
        statusCode: res.statusCode || 0,
        statusMessage: res.errMsg
      });
    },
  });
}

const request = new Fly(EngineWrapper(adapter));
const authRequest = new Fly(EngineWrapper(adapter));

request.config.baseURL = `${process.env.VUE_APP_API_HOST || `http://${process.env.VUE_APP_IPV4}:3000`}/api/v1`;
request.config.timeout = 15000;
authRequest.config = request.config;

async function handleAuth() {
  return authStore.login();
}

const handleError = async (e) => {
  const { error, message } = _.get(e, 'response.data', {});
  let msg = error || message;
  if (!msg) {
    if (String(e.message).indexOf('request:ok') !== -1) {
      msg = `服务器错误 statusCode: ${e.status}`;
    } else if (String(e.message).indexOf('timeout') !== -1) {
      msg = '网络连接超时，请重试';
    } else {
      msg = e.message;
    }
  }
  return Promise.reject(new Error(msg));
};

async function requestInterceptors(req) {
  const token = await authStore.getToken();
  if (token) {
    req.headers.Authorization = token;
  }
  req.headers['Content-Type'] = 'application/json';
  return req;
}

request.interceptors.request.use(requestInterceptors);
authRequest.interceptors.request.use(requestInterceptors);

authRequest.interceptors.response.use(
  async res => {
    return { data: res.data };
  },
  handleError
);

request.interceptors.response.use(
  async res => {
    return { data: res.data };
  },
  async(err) => {
    if (err.status === 401) {
      request.lock();
      try {
        await handleAuth();
        request.unlock();
        return request.request(err.request);
      } catch (e) {
        request.unlock();
        return handleError(e);
      }
    }
    return handleError(err);
  }
);

export { request, authRequest };
