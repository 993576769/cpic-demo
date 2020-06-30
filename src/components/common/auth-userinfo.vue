<template>
  <div class="common-auth-userinfo" :class="{ disabled }">
    <button
      class="btn-auth"
      open-type="getUserInfo"
      :disabled="disabled"
      @getuserinfo="handleGetUserInfo"
      hover-class="none"
    ></button>
    <slot />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class AuthUserinfo extends Vue {
    @Prop(Boolean) disabled;
    @Prop(Boolean) withCredentials;

    loading = false;

    async handleGetUserInfo(e) {
      const { userInfo } = e.detail;
      if (!userInfo) {
        return;
      }
      if (this.withCredentials) {
        if (this.loading) {
          return;
        }
        try {
          this.loading = true;
          const { code } = await uni.login();
          const res = await uni.getUserInfo({ withCredentials: true });
          this.$emit('success', { ..._.omit(res), code });
        } finally {
          this.loading = false;
        }
        return;
      }
      this.$emit('success', _.omit(e.detail, 'errMsg'));
    }
  }
</script>

<style lang="scss">
  .common-auth-userinfo {
    position: relative;
    display: inline-block;

    .btn-auth {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
    }
  }
</style>
