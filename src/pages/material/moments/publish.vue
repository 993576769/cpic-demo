<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

async function publish() {
  await showToast('已发布');
  nav.nav('/tools');
}
</script>

<template>
  <common-demo-page title="发布朋友圈">
    <view class="content-card">
      <text class="section-title">
        涉及产品
      </text>
      <div class="product-list">
        <span>D21311KP71-BK/XL</span>
        <span>儿童重疾保障计划</span>
        <span>教育金储备方案</span>
      </div>
    </view>

    <view class="content-card">
      <text class="section-title">
        图片素材
      </text>
      <div class="image-grid">
        <div v-for="index in 5" :key="index"></div>
        <button class="reset-btn" @click="showToast('建设中')">
          +
        </button>
      </div>
    </view>

    <view class="content-card">
      <text class="section-title">
        参考文案
      </text>
      <text class="copy">
        儿童重疾险到底选消费型还是返还型？关键不是哪种更贵，而是哪种更适合家庭预算和孩子成长阶段。
      </text>
      <button class="reset-btn library-button" @click="nav.nav('/material/moments')">
        去素材库选择
      </button>
    </view>

    <div class="bottom-actions padding-bottom-safe-area">
      <button class="reset-btn secondary-button" @click="nav.navigateBack()">
        取消
      </button>
      <button class="reset-btn primary-button" @click="publish">
        确定
      </button>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.content-card {
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.section-title,
.copy {
  display: block;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.product-list span {
  padding: 7px 10px;
  border-radius: 14px;
  background: #f3f4f6;
  font-size: 12px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.image-grid div,
.image-grid button {
  aspect-ratio: 1;
  border-radius: 6px;
  background: #e5e7eb;
}

.image-grid button {
  font-size: 26px;
  color: #666;
}

.copy {
  margin-top: 14px;
  padding: 14px;
  border-radius: 8px;
  background: #f7f7f7;
  font-size: 13px;
  line-height: 21px;
  color: #333;
}

.library-button {
  width: 100%;
  height: 40px;
  margin-top: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  font-size: 14px;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  background: #fff;
}

.secondary-button,
.primary-button {
  height: 48px;
  border-radius: 14px;
  font-size: 15px;
}

.secondary-button {
  border: 1px solid #e5e7eb;
  background: #fff;
}

.primary-button {
  background: #111;
  color: #fff;
}
</style>
