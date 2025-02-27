/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}

interface ImportMetaEnv {
  /** 环境 */
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  /** api origin */
  readonly VITE_APP_API_ORIGIN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
