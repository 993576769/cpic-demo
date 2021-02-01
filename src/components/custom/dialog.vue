<template>
  <common-popup v-model="showDialog" :customStyle="contentStyle" @close="handleCloseDialog">
    <custom-share-wrapper :event="config.event">
      <div class="dialog-content flex column" @click="handleClick(config)">
        <div class='image-wrapper' :style="[imageWrapperStyle]">
          <image :src="config.image" class='flex-1 image' mode="widthFix" :style="[imageStyle]" />
        </div>
        <div class='close flex content-center item-center' @click.stop="handleCloseDialog">X</div>
      </div>
    </custom-share-wrapper>
  </common-popup>
</template>

<script>
  import { Component, Mixins, Prop } from 'vue-property-decorator';
  import  CustomComponent from '@/mixins/custom-component';

  @Component
  export default class CustomDialog extends Mixins(CustomComponent) {
    @Prop(Object) resource
    @Prop(Object) config

    showDialog = true

    get contentStyle() {
      return {
        width: '600rpx',
        backgroundColor: 'transparent'
      };
    }

    get imageWrapperStyle() {
      if (!this.config.style) {
        return {};
      }
      const { height, borderRadius, backgroundColor } = this.config.style;
      return {
        backgroundColor,
        height: height * 2 + 'rpx',
        borderRadius: borderRadius * 2 + 'rpx'
      };
    }

    get imageStyle() {
      if (!this.config.style) {
        return {};
      }
      const { height, borderRadius } = this.config.style;
      return {
        height: height * 2 + 'px',
        borderRadius: borderRadius * 2 + 'rpx'
      };
    }

    handleCloseDialog() {
      this.showDialog = false;
      this.$emit('close', this.config);
    }
  }
</script>

<style lang='scss' scoped>
  .dialog-content {
    position: relative;
    width: 100%;
    height: 100%;

    .image-wrapper {
      width: 100%;
      overflow: hidden;
    }

    .image {
      width: 100%;
    }

    .close {
      width: 30px;
      height: 30px;
      margin: 20px auto;
      border: 2px solid #fff;
      border-radius: 50%;
      font-size: 24px;
      color: #fff;
    }
  }
</style>
