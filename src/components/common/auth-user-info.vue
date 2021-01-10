<template>
  <block v-if="onlyBtn">
    <button
      v-if="!wechatAuthorized" class="auth-user-info-btn" open-type="getUserInfo"
      :disabled="disabled" @getuserinfo="handleGetUserInfo" hover-class="none"
    ></button>
  </block>
  <div v-else class="common-auth-user-info" :class="[{ disabled }]" @click.stop="onClick">
    <button
      v-if="!wechatAuthorized" class="auth-user-info-btn" open-type="getUserInfo"
      :disabled="disabled" @getuserinfo="handleGetUserInfo" hover-class="none"
    ></button>
    <slot/>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class AuthUserInfo extends Vue {
    @Prop(Boolean) disabled;
    @Prop(Boolean) withCredentials;
    @Prop(Boolean) onlyBtn;

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

    onClick() {
      if (this.wechatAuthorized) {
        this.$emit('success');
      }
    }

    get wechatAuthorized() {
      return this.$authStore.user.wechatAuthorized;
    }
  }
</script>

<style lang="scss">
  .common-auth-user-info {
    position: relative;
    display: inline-block;
  }

  .auth-user-info-btn {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    opacity: 0;
  }
</style>
