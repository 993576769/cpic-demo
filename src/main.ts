import { createSSRApp } from 'vue';
import type { PiniaPluginContext } from 'pinia';
import { createPinia } from 'pinia';
import { cloneDeep } from 'lodash-es';
import App from './App.vue';
import i18n from '@/i18n';
import '@/styles/global.scss';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  function resetPlugin(ctx: PiniaPluginContext) {
    const store = ctx.store;
    const initialState = cloneDeep(store.$state);
    store.$reset = () => {
      store.$patch(($state) => {
        Object.assign($state, cloneDeep(initialState));
      });
    };
  }

  pinia.use(resetPlugin);

  app
    .use(i18n)
    .use(pinia);

  return {
    app,
  };
}
