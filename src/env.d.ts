/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 环境 */
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  /** api origin */
  readonly VITE_APP_API_ORIGIN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
