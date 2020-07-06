import Vue from 'vue';
import { SHARE_COVER } from '@/constants';

Vue.mixin({
  onShareAppMessage() {
    return this.$mergeShareAppMessage();
  },

  methods: {
    $mergeShareAppMessage(config = {}) {
      let { title, path, imageUrl } = config;

      if (/^http/.test(path)) {
        path = `/pages/extra/web-site?src=${encodeURIComponent(path)}`;
      } else if (!path) {
        path = '/pages/root/home';
      }

      if (!imageUrl) {
        imageUrl = SHARE_COVER;
      }

      return { title, path, imageUrl };
    },
  }
});
