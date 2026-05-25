<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
</script>

<template>
  <div class="detail-page">
    <view class="detail-content">
      <view class="profile-card">
        <div>
          <div class="profile-card__title">
            <text class="profile-card__name">
              王女士
            </text>
            <text class="profile-card__level">
              高价值客户
            </text>
          </div>
          <div class="profile-card__tags">
            <text>宝妈</text>
            <text>二孩家庭</text>
            <text>风险意识高</text>
          </div>
          <text class="profile-card__info">
            手机：180 **** 6666
          </text>
          <text class="profile-card__info">
            生日：1994-08-08
          </text>
        </div>
        <div class="profile-card__actions">
          <button class="reset-btn" @click="showToast('建设中')">
            <text>☎</text>
          </button>
          <button class="reset-btn" @click="showToast('建设中')">
            <text>↗</text>
          </button>
        </div>
      </view>

      <view class="placeholder-card">
        <text class="placeholder-card__title">
          AI 客户热度模型
        </text>
        <div class="score-row">
          <text class="score-row__value">
            82
          </text>
          <div>
            <text class="score-row__title">
              高热客户
            </text>
            <text class="score-row__desc">
              近期咨询儿童险种，适合继续推进家庭保障方案。
            </text>
          </div>
        </div>
        <button class="reset-btn primary-button" @click="nav.nav('/pages/customers/wang/visit-record')">
          <text>生成下一步</text>
        </button>
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f5f7;
  color: #101828;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 10px 28px;
}

.profile-card,
.placeholder-card {
  padding: 18px;
  background: $white-color;
  border-radius: 8px;
  box-sizing: border-box;
}

.profile-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.profile-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-card__name {
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
}

.profile-card__level {
  padding: 4px 8px;
  border-radius: 12px;
  background: #101828;
  font-size: 11px;
  color: $white-color;
}

.profile-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0;
}

.profile-card__tags text {
  padding: 2px 9px;
  border: 1px solid #d1d5dc;
  border-radius: 12px;
  font-size: 12px;
  color: #4a5565;
}

.profile-card__info,
.score-row__desc {
  display: block;
  margin: 7px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.profile-card__actions {
  display: flex;
  gap: 8px;
}

.profile-card__actions button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 17px;
}

.placeholder-card__title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
}

.score-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
}

.score-row__value {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border: 8px solid #101828;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 24px;
}

.score-row__title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-top: 22px;
  border-radius: 12px;
  background: #000;
  font-size: 14px;
  color: $white-color;
}
</style>
