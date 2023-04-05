// Doc: https://vue-i18n.intlify.dev/guide/

import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';
import type { AvailableLocale, MessageSchema } from '@/models/i18n';

const i18n = createI18n<[MessageSchema], AvailableLocale>({
  locale: 'zh-CN',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  fallbackRoot: true,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
});

export default i18n;
export const t = i18n.global.t;
