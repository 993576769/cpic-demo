// import enUS from '@/i18n/locales/en-US.json';
import type zhCN from '@/i18n/locales/zh-CN.json';

/** 使用的语言, 没用到的不需要写入联合类型中 */
export type AvailableLocale =
  'en-US' |
  'zh-CN';

/** 使用的语言对应的 Schema, 用到哪个就填哪个, 填一个即可 */
export type MessageSchema = typeof zhCN;
