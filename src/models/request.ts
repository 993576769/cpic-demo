import type { AxiosResponse } from 'axios';

/** meta 暂时只用到这些 */
export interface ResponseMeta {
  total: number;
  page: number;
  total_pages: number;
  offset: number;
  per_page: number;
}
/**
 * 将 header 信息 X-xx-xx 加入 axios response meta 里面
 */
export interface CustomAxiosResponse<T = unknown> extends AxiosResponse<T> {
  meta?: Partial<ResponseMeta>;
}

/** 目前支持的 http method */
export type SupportedHTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
