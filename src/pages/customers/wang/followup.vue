<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
</script>

<template>
  <common-demo-page title="下一步建议" subtitle="目标客户 王女士">
    <view class="plan-card">
      <div class="plan-card__top">
        <text class="plan-card__title">
          ☆ 发送教育金+重疾组合方案
        </text>
        <text class="priority">
          高优先级
        </text>
      </div>
      <text class="plan-card__desc">
        结合客户二孩家庭、孩子即将上小学和风险意识高的特征，建议先用教育储备切入，再补充儿童重疾保障。
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

    <view class="content-card">
      <text class="section-title">
        需求挖掘深度问题
      </text>
      <text class="question">
        教育储备：对于孩子未来的海外教育，您更关注资金确定性还是投入灵活度？
      </text>
      <text class="question">
        风险保障：如果未来家庭主力收入出现波动，您希望孩子教育计划不受影响吗？
      </text>
    </view>

    <view class="content-card">
      <text class="section-title">
        话术推荐
      </text>
      <text class="script-line">
        微信：陈先生您好，我是您的专属顾问，结合孩子年龄给您整理了教育金+重疾组合方案。
      </text>
      <text class="script-line">
        电话：陈先生您好，没打扰您吧？想和您确认下孩子教育储备的预算区间。
      </text>
    </view>

    <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="nav.nav('/customers/wang/followup/tasks')">
      生成待办事项
    </button>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.plan-card,
.content-card {
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.plan-card__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.plan-card__title,
.section-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
}

.priority {
  flex-shrink: 0;
  height: 22px;
  padding: 0 8px;
  border-radius: 11px;
  background: #111;
  font-size: 11px;
  line-height: 22px;
  color: #fff;
}

.plan-card__desc,
.question,
.script-line {
  display: block;
  margin-top: 12px;
  font-size: 13px;
  line-height: 21px;
  color: #4a5565;
}

.button-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

.secondary-button,
.primary-button {
  height: 42px;
  border-radius: 12px;
  font-size: 14px;
}

.secondary-button {
  border: 1px solid #e5e7eb;
  background: #fff;
}

.primary-button,
.fixed-primary {
  background: #111;
  color: #fff;
}

.fixed-primary {
  position: fixed;
  right: 10px;
  bottom: 12px;
  left: 10px;
  height: 48px;
  border-radius: 14px;
  font-size: 15px;
}
</style>
