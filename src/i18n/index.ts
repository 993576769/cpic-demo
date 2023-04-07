// Doc: https://vue-i18n.intlify.dev/guide/

import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';
import type { AvailableLocale, MessageSchema } from '@/models/i18n';

const i18n = createI18n<[MessageSchema], AvailableLocale>({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  legacy: true,
  globalInjection: true,
  fallbackRoot: true,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

export default i18n;
export const t = i18n.global.t;
