import type { ActiveStorage } from './active-storage';
import type { Base } from './base';
import { getActiveStorageDefaultData } from './active-storage';
import { getBaseDefaultData } from './base';

/** 登录接口 传入参数 */
export interface LoginParams {
  /** 通过 uni.login 获得 code */
  code: string;
  /** 小程序 appid */
  appid: string;
}
/** 登录接口 返回值 */
export interface LoginData {
  access_token: string;
  user: User;
}

export interface User extends Base {
  cn: 'User';
  tn: 'users';
  screen_name: string;
  sns_authorized: boolean;
  avatar: ActiveStorage;
  tracking_code: string;
}

/**
 * 通过 function 获取默认数据，防止引用类型数据，改到默认数据
 *
 * @export
 * @return {*}  {User}
 */
export function getUserDefaultData(): User {
  return {
    ...getBaseDefaultData(),
    cn: 'User',
    tn: 'users',
    screen_name: '',
    sns_authorized: false,
    avatar: getActiveStorageDefaultData(),
    tracking_code: '',
  };
}
