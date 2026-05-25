<script setup lang="ts">
import { showToast } from '@/utils/toast';
</script>

<template>
  <div class="publish-page">
    <view class="publish-content">
      <view class="draft-card">
        <text class="draft-card__title">
          11月选题下发
        </text>
        <text class="draft-card__topic">
          # 儿童重疾险到底选消费型还是返还型？
        </text>
        <text class="draft-card__topic">
          # 保险怎么选：一份保障方案配置全攻略
        </text>
        <button class="reset-btn primary-button" @click="showToast('已下发到企微')">
          <text>下发到企微</text>
        </button>
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.publish-page {
  min-height: 100vh;
  background: #f5f5f7;
  color: #101828;
}

.publish-content {
  padding: 12px 10px 28px;
}

.draft-card {
  padding: 20px;
  background: $white-color;
  border-radius: 8px;
  box-sizing: border-box;
}

.draft-card__title {
  display: block;
  margin-bottom: 18px;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}

.draft-card__topic {
  display: block;
  margin: 0 0 12px;
  padding: 14px;
  border-radius: 8px;
  background: #f7f8fa;
  font-size: 13px;
  line-height: 20px;
  color: #4a5565;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-top: 10px;
  border-radius: 12px;
  background: #000;
  font-size: 14px;
  color: $white-color;
}
</style>
