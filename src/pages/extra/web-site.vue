<template>
  <web-view :src="src" @message="handleMessage"></web-view>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import _ from 'lodash';
  import { PropReference } from '@/plugins/prop-reference';

  @Component
  export default class WebSite extends Vue {
    @PropReference({ type: Function, default: () => _.noop }) onMessage

    src = ''
    share_config = {}

    onLoad({ src }) {
      const { scene } = uni.getLaunchOptionsSync();
      this.src = src ? decodeURIComponent(src) : process.env.VUE_APP_API_HOST + scene;
    }

    handleMessage(res) {
      const result = _.last(res.detail.data);
      if (result) {
        if (result.type === 'share') {
          this.share_config = result.config;
        }
        this.onMessage(result);
      }
    }

    onShareAppMessage() {
      return this.$mergeShareAppMessage(this.share_config);
    }
  }
</script>
