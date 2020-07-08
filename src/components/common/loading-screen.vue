<template>
  <div class="loading-screen loading" v-if="loading" :style="{ paddingTop: `calc(${position_top} + 20px)` }">
    <loading/>
  </div>
  <div class="loading-screen error" v-else-if="error" :style="{ paddingTop: `calc(${position_top} + 50px)` }">
    <div @click="handleLoad" class="flex column item-center">
      <image src="/static/refresh.png" style="width: 90px;" mode="widthFix"/>
      <text class="text-center error-text">
        {{ error.message }}
        {{ error.code === blockCode ? '' : '点击重新加载' }}
      </text>
    </div>
    <button type="default" @click="$nav.navigateBack()" class="action-btn">
      返回
    </button>
  </div>
</template>

<script>
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class LoadingScreen extends Vue {
    @Prop({ type: String, default: 'onFetch' }) onFetch
    @Prop({ type: Boolean, default: false }) usedCustomNav
    @Prop({ type: String }) propCtxVid

    loading = true
    error = null
    blockCode = 40101

    mounted() {
      this.handleLoad();
    }

    async handleLoad() {
      if (_.get(this.error, 'code') === this.blockCode) {
        return;
      }
      this.loading = true;
      this.error = null;
      const propCtx = this.getPropScope();

      try {
        const onFetch = propCtx[this.onFetch] || _.noop;
        await this.$authStore.tryFetchData();
        await onFetch.call(propCtx);
        await propCtx.$nextTick();
        this.loading = false;
      } catch (err) {
        this.error = {
          message: err.message,
          code: err.code,
        };
        this.loading = false;
        throw err;
      }
    }

    // 获取使用当前组件的页面或者组件的实例
    getPropScope(parent = this.$parent) {
      if (parent.$scope._$vueId !== this.propCtxVid && parent.$parent) {
        return this.getPropScope(parent.$parent);
      }
      return parent;
    }

    get position_top() {
      const { bottom } = uni.getMenuButtonBoundingClientRect();
      return this.usedCustomNav ? `${bottom + 7}px` : '0px';
    }
  }
</script>

<style lang="scss">
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 999;
    box-sizing: border-box;
    padding: 0 10px 20px;

    .error-text {
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
    }

    .action-btn {
      width: 120px;
      height: 40px;
      line-height: 40px;
      margin-top: 20px;
    }
  }
</style>
