import process from 'node:process';
import uni from '@dcloudio/vite-plugin-uni';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import postCssPxToRelativeUnit from './loader/postcss-px-to-relative-unit';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const {
    VITE_APP_API_HOST,
    VITE_APP_PORT,
  } = loadEnv(mode, process.cwd());

  const defaultServerConfig = {
    host: true,
    proxy: {
      '/app_api/v1': {
        target: VITE_APP_API_HOST,
        changeOrigin: true,
      },
    },
  };

  return {
    plugins: [
      Components({
        directoryAsNamespace: true,
        directives: false,
      }),
      uni(),
      checker({
        vueTsc: true,
        eslint: {
          useFlatConfig: true, // https://github.com/fi3ework/vite-plugin-checker/issues/320#issuecomment-2115446921
          // for example, lint .ts and .tsx
          lintCommand: 'eslint "./src/**/*.{ts,vue}"',
        },
        stylelint: {
          // for example, lint .css and .vue
          lintCommand: 'stylelint ./src/**/*.{scss,vue}',
        },
      }),
    ],
    server: {
      port: Number(VITE_APP_PORT),
      ...defaultServerConfig,
    },
    preview: {
      ...defaultServerConfig,
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRelativeUnit({
            baseDpr: 1,
            targetUnit: 'rpx',
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          additionalData: `
            @use "@/styles/colors.scss" as *;
            @use "@/styles/css-variable.scss" as *;
            @use "@/styles/mixins.scss" as *;
          `,
        },
      },
    },
  };
});
