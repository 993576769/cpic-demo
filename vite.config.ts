import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import uni from '@dcloudio/vite-plugin-uni';
import Components from 'unplugin-vue-components/vite';
import postCssPxToRelativeUnit from './loader/postcss-px-to-relative-unit';

// https://vitejs.dev/config/
export default defineConfig({
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
        additionalData: `
          @import "@/styles/colors.scss";
          @import "@/styles/css-variable.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
  plugins: [
    Components({
      directoryAsNamespace: true,
      directives: false,
    }),
    uni(),
    checker({
      vueTsc: true,
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint "./src/**/*.{ts,vue}"',
      },
      stylelint: {
        // for example, lint .css and .vue
        lintCommand: 'stylelint ./src/**/*.{scss,vue}',
      },
    }),
  ],
});
