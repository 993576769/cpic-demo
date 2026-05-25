<script setup lang="ts">
import { nav } from '@/utils/nav';
import { ref } from 'vue';

const content = ref('');
</script>

<template>
  <div class="visit-page">
    <view class="visit-content">
      <view class="customer-summary">
        <text class="section-title">
          王女士
        </text>
        <text class="customer-summary__desc">
          根据线下对话信息进行商机分析，帮你快速察觉下一步跟进重点。
        </text>
      </view>

      <view class="record-card">
        <text class="section-title">
          输入拜访记录
        </text>
        <textarea
          v-model="content"
          class="record-card__textarea"
          placeholder="例如：客户提到孩子刚上小学，最近关注儿童重疾和教育金配置。"
        ></textarea>
        <button class="reset-btn primary-button" @click="nav.nav('/pages/customers/wang/visit-record?state=done')">
          <text>发送并分析</text>
        </button>
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.visit-page {
  min-height: 100vh;
  background: #f5f5f7;
  color: #101828;
}

.visit-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 10px 28px;
}

.customer-summary,
.record-card {
  padding: 18px;
  background: $white-color;
  border-radius: 8px;
  box-sizing: border-box;
}

.section-title {
  display: block;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}

.customer-summary__desc {
  display: block;
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.record-card__textarea {
  width: 100%;
  height: 168px;
  padding: 14px;
  margin-top: 14px;
  border: 0;
  border-radius: 8px;
  background: #f7f8fa;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 20px;
  color: #101828;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-top: 16px;
  border-radius: 12px;
  background: #000;
  font-size: 14px;
  color: $white-color;
}
</style>
