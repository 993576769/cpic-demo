<script setup lang="ts">
import { showToast } from '@/utils/toast';
</script>

<template>
  <div class="activity-page">
    <view class="activity-content">
      <view class="hero-card">
        <text class="hero-card__scene">
          亲子场景
        </text>
        <text class="hero-card__title">
          虹口区亲子烘焙活动
        </text>
        <text class="hero-card__deadline">
          截至时间：2026/01/11 18:00
        </text>
      </view>

      <view class="info-card">
        <text class="info-card__title">
          报名概况
        </text>
        <div class="quota-row">
          <text class="quota-row__value">
            0/2
          </text>
          <text class="quota-row__label">
            当前名额
          </text>
        </div>
        <button class="reset-btn primary-button" @click="showToast('已报名活动')">
          <text>报名活动</text>
        </button>
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.activity-page {
  min-height: 100vh;
  background: #f5f5f7;
  color: #101828;
}

.activity-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 10px 28px;
}

.hero-card,
.info-card {
  padding: 20px;
  background: $white-color;
  border-radius: 8px;
  box-sizing: border-box;
}

.hero-card {
  min-height: 172px;
  background: linear-gradient(135deg, #111827 0%, #2f3848 100%);
  color: $white-color;
}

.hero-card__title,
.hero-card__scene,
.hero-card__deadline,
.info-card__title {
  display: block;
}

.hero-card__scene {
  display: block;
  font-size: 13px;
  color: #d1d5dc;
}

.hero-card__title {
  margin-top: 18px;
  font-size: 24px;
  line-height: 34px;
}

.hero-card__deadline {
  display: block;
  margin-top: 38px;
  font-size: 13px;
  color: #e5e7eb;
}

.info-card__title {
  font-size: 16px;
  line-height: 22px;
}

.quota-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 18px;
}

.quota-row__value {
  font-size: 32px;
  line-height: 42px;
}

.quota-row__label {
  font-size: 13px;
  color: #666;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-top: 20px;
  border-radius: 12px;
  background: #000;
  font-size: 14px;
  color: $white-color;
}
</style>
