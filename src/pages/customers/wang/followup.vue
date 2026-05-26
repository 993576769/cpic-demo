<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
</script>

<template>
  <view class="followup-page">
    <common-demo-page
      title="下一步建议"
      :padded="false"
    >
      <view class="followup-heading">
        <text class="followup-heading__title">
          下一步建议
        </text>
        <text class="followup-heading__meta">
          目标客户 王女士
        </text>
      </view>

      <view class="followup-divider" />

      <view class="followup-content">
        <view class="plan-card">
          <div class="plan-card__top">
            <view class="plan-card__title-wrap">
              <text class="plan-card__star">
                ☆
              </text>
              <text class="plan-card__title">
                发送教育金+重疾组合方案
              </text>
            </view>
            <text class="priority">
              高优先级
            </text>
          </div>
          <text class="plan-card__desc">
            基于客户家庭近期财务分析，针对教育储备及风险保障缺口，推荐此组合方案以实现资产稳健增长与全方位守护。
          </text>
          <div class="button-row">
            <button class="reset-btn secondary-button" @click="showToast('建设中')">
              查看详情
            </button>
            <button class="reset-btn primary-button" @click="showToast('建设中')">
              立即发送
            </button>
          </div>
        </view>

        <view class="content-card content-card--questions">
          <text class="section-title">
            需求挖掘深度问题
          </text>
          <view class="quote-card">
            <text class="quote-card__label">
              教育储备
            </text>
            <text class="quote-card__text">
              “对于孩子未来的海外教育或者国内深造，您目前是否有专项的资金隔离和增值计划？”
            </text>
          </view>
          <view class="quote-card">
            <text class="quote-card__label">
              风险保障
            </text>
            <text class="quote-card__text">
              “如果未来家庭主力收入出现波动，目前的资产配置能否支撑未来10年的家庭品质生活？”
            </text>
          </view>
        </view>

        <view class="content-card content-card--scripts">
          <text class="section-title">
            话术推荐
          </text>
          <view class="quote-card">
            <text class="quote-card__label">
              微信
            </text>
            <text class="quote-card__text">
              “陈先生您好，我是您的专属顾问。最近看到不少关于教育金政策的新讨论，想起您家宝贝快升学了，整理了一份对比表想发给您参考，您现在方便接收吗？”
            </text>
          </view>
          <view class="quote-card quote-card--phone">
            <text class="quote-card__label">
              电话
            </text>
            <text class="quote-card__text">
              “陈先生您好，没打扰您吧？我是小王。今天致电是想跟您简单沟通下，近期由于市场利率下行，很多客户都在咨询锁定长期收益的产品，我觉得特别适合您的需...
            </text>
          </view>
        </view>
      </view>

      <common-button-fixed-bottom bg-color="#fff">
        <button class="reset-btn fixed-primary" @click="nav.nav('/customers/wang/followup/tasks')">
          生成待办事项
        </button>
      </common-button-fixed-bottom>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.followup-page {
  min-height: 100vh;
  background: #fff;
}

.followup-page :deep(.demo-page),
.followup-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #fff;
}

.followup-page :deep(.demo-page__nav) {
  background: #fff;
}

.followup-heading {
  padding: 16px;
  background: #fff;
  box-sizing: border-box;
}

.followup-heading__title,
.followup-heading__meta,
.plan-card__title,
.plan-card__desc,
.section-title,
.quote-card__label,
.quote-card__text {
  display: block;
}

.followup-heading__title {
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  color: #000;
}

.followup-heading__meta {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
}

.followup-divider {
  height: 1px;
  background: #eeeeee;
}

.followup-content {
  padding: 16px 10px 114px;
  background: #fff;
  box-sizing: border-box;
}

.plan-card,
.content-card {
  width: 355px;
  border-radius: 8px;
  background: #f3f3f3;
  box-sizing: border-box;
}

.plan-card {
  min-height: 226px;
  padding: 21px 24px 23px;
  margin-bottom: 14px;
}

.content-card {
  padding: 21px 20px 23px;
  margin-bottom: 14px;
}

.content-card--questions {
  min-height: 258px;
}

.content-card--scripts {
  min-height: 291px;
  padding-bottom: 8px;
}

.plan-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 13px;
}

.plan-card__title-wrap {
  display: flex;
  align-items: center;
  min-width: 0;
}

.plan-card__star {
  flex: 0 0 20px;
  width: 20px;
  margin-right: 8px;
  font-size: 22px;
  font-weight: 600;
  line-height: 24px;
  color: #000;
}

.plan-card__title,
.section-title {
  font-weight: 400;
  color: #333;
}

.section-title {
  font-size: 17px;
  line-height: 24px;
}

.plan-card__title {
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.priority {
  flex-shrink: 0;
  width: 80px;
  height: 34px;
  border-radius: 17px;
  background: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: 34px;
  text-align: center;
  color: #fff;
}

.plan-card__desc {
  margin-top: 24px;
  font-size: 13px;
  font-weight: 400;
  line-height: 23px;
  color: #666;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 20px;
}

.secondary-button,
.primary-button {
  width: 92px;
  height: 34px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
}

.secondary-button {
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #666;
}

.primary-button,
.fixed-primary {
  background: #000;
  color: #fff;
}

.section-title {
  margin-bottom: 18px;
}

.quote-card {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  width: 303px;
  min-height: 80px;
  padding: 14px 15px 12px;
  margin: 0 auto 12px;
  background: #fff;
  box-sizing: border-box;
}

.quote-card--phone {
  min-height: 112px;
}

.quote-card:last-child {
  margin-bottom: 0;
}

.quote-card__label {
  padding-top: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #666;
}

.quote-card__text {
  overflow: hidden;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  color: #333;
}

.fixed-primary {
  width: calc(100% - 30px);
  height: 48px;
  margin: 8px 15px 10px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
}
</style>
