<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const productNames = [
  '产品名称 D21311KP71-BK/XL',
  '产品名称 D9131TTS50-BK/L',
  '产品名称 D8321RFT21-MG/2XL',
];

const mediaSlots = Array.from({ length: 4 }, (_, index) => index);

const referenceCopy = '文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材';

async function publish() {
  await showToast('已发布');
  nav.nav('/tools');
}
</script>

<template>
  <view class="moments-publish-page">
    <common-demo-page title="" :padded="false">
      <view class="publish-heading">
        发布朋友圈
      </view>

      <view class="publish-card publish-card--products">
        <view class="publish-card__header">
          <text class="publish-card__title">
            涉及产品
          </text>
        </view>
        <view class="product-list">
          <view
            v-for="product in productNames"
            :key="product"
            class="product-row"
          >
            <text class="product-row__name">
              {{ product }}
            </text>
            <button class="reset-btn product-row__copy" @click="showToast('已复制')">
              <view class="copy-icon copy-icon--back" />
              <view class="copy-icon copy-icon--front" />
            </button>
          </view>
        </view>
      </view>

      <view class="publish-card publish-card--media">
        <view class="publish-card__header">
          <text class="publish-card__title">
            图片素材
          </text>
        </view>
        <view class="media-grid">
          <view
            v-for="slot in mediaSlots"
            :key="slot"
            class="media-grid__item"
          />
          <button class="reset-btn media-grid__item media-grid__item--add" @click="showToast('建设中')">
            <text class="media-grid__plus">
              +
            </text>
          </button>
        </view>
      </view>

      <view class="publish-card publish-card--copy">
        <view class="publish-card__header">
          <text class="publish-card__title">
            参考文案
          </text>
        </view>
        <view class="copy-box">
          <text class="copy-box__text">
            {{ referenceCopy }}
          </text>
        </view>
        <button class="reset-btn library-button" @click="nav.nav('/material/moments')">
          去素材库选择
        </button>
      </view>

      <view class="bottom-spacer" />

      <view class="bottom-actions padding-bottom-safe-area">
        <button class="reset-btn secondary-button" @click="nav.navigateBack()">
          取消
        </button>
        <button class="reset-btn primary-button" @click="publish">
          确定
        </button>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.moments-publish-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.moments-publish-page :deep(.demo-page) {
  min-height: 100vh;
  background: #f8f8f8;
}

.moments-publish-page :deep(.demo-page__nav) {
  position: relative;
  min-height: 88px;
  padding: 44px 282px 0 0;
  background: #fff;
}

.moments-publish-page :deep(.demo-page__back) {
  width: 44px;
  height: 44px;
  border-radius: 0;
  font-size: 34px;
  line-height: 42px;
}

.moments-publish-page :deep(.demo-page__title-box) {
  display: none;
}

.publish-heading {
  height: 66px;
  padding: 12px 16px 22px;
  border-bottom: 1px solid #0000000f;
  background: #fff;
  box-sizing: border-box;
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  color: #000;
}

.publish-card {
  width: 355px;
  margin: 12px auto 0;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}

.publish-card--products {
  height: 222px;
}

.publish-card--media {
  height: 281px;
  margin-top: 14px;
}

.publish-card--copy {
  height: 243px;
  margin-top: 14px;
}

.publish-card__header {
  height: 43px;
  margin: 0 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}

.publish-card__title {
  display: block;
  padding-top: 13px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #333;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 313px;
  margin: 17px auto 0;
}

.product-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 12px;
  border-radius: 4px;
  background: #f8f8f8;
  box-sizing: border-box;
}

.product-row__name {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #333;
}

.product-row__copy {
  position: relative;
  width: 24px;
  height: 24px;
  background: transparent;
}

.copy-icon {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #999;
  border-radius: 2px;
  box-sizing: border-box;
}

.copy-icon--back {
  top: 6px;
  left: 9px;
}

.copy-icon--front {
  top: 9px;
  left: 6px;
  background: #f8f8f8;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(3, 98px);
  gap: 12px 15px;
  margin: 14px 0 0 10px;
}

.media-grid__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 95px;
  border-radius: 2px;
  background: #f8f8f8c4;
}

.media-grid__item--add {
  background: #f8f8f8;
}

.media-grid__plus {
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  color: #999;
}

.copy-box {
  width: 324px;
  height: 97px;
  margin: 19px 0 0 10px;
  padding: 10px 12px;
  border-radius: 2px;
  background: #f8f8f8;
  box-sizing: border-box;
}

.copy-box__text {
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
}

.library-button {
  width: 313px;
  height: 40px;
  margin: 20px 0 0 15px;
  border: 1px solid #000;
  border-radius: 100px;
  background: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #000;
}

.bottom-spacer {
  height: 177px;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 15px 20px 45px;
  background: #fff;
  box-sizing: border-box;
}

.secondary-button,
.primary-button {
  height: 48px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
}

.secondary-button {
  border: 1px solid #0000001f;
  background: #fff;
  color: #000;
}

.primary-button {
  border: 1px solid #000;
  background: #000;
  color: #fff;
}
</style>
