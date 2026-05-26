<script setup lang="ts">
import { nav } from '@/utils/nav';

interface TodoItem {
  id: string;
  dateLabel: string;
  dateDay: string;
  title: string;
  desc: string;
  featured?: boolean;
}

const todos: TodoItem[] = [
  {
    id: 'education-plan',
    dateLabel: '今日',
    dateDay: '12',
    title: '发送教育金+重疾组合方案',
    desc: '基于客户家庭近期财务分析，针对教育储备及风险保障缺口，推荐此组合方案以实现资产稳健增长与全方位守护。',
    featured: true,
  },
  {
    id: 'revisit-call',
    dateLabel: '明天',
    dateDay: '13',
    title: '回访电话确认',
    desc: '确认案例阅读反馈，口头解答条款细节，探测客户购买意向度。',
  },
  {
    id: 'analysis-report',
    dateLabel: '3天后',
    dateDay: '15',
    title: '发送定制化分析',
    desc: '基于客户家庭资产情况，发送 AI 生成的《家庭全面保障缺口深度分析报告》。',
  },
  {
    id: 'offline-meeting',
    dateLabel: '5天后',
    dateDay: '17',
    title: '预约线下见证',
    desc: '邀请客户至职场进行合同演示或进行面谈成交，',
  },
];
</script>

<template>
  <view class="todo-list-page">
    <common-demo-page
      title="待办事项列表"
      :show-back="false"
      :padded="false"
    >
      <view class="todo-heading">
        <text class="todo-heading__title">
          待办事项列表
        </text>
        <text class="todo-heading__meta">
          目标客户 王女士
        </text>
      </view>

      <view class="todo-divider" />

      <view class="todo-section">
        <view class="todo-section__header">
          <view class="todo-section__title-wrap">
            <image class="todo-section__icon" mode="aspectFit" src="/static/customer/icon-todo-task-list.svg" />
            <text class="todo-section__title">
              待办任务列表
            </text>
          </view>
          <text class="todo-section__count">
            4 条建议
          </text>
        </view>

        <view
          v-for="todo in todos"
          :key="todo.id"
          class="todo-card"
          :class="{ 'todo-card--featured': todo.featured }"
        >
          <view class="todo-card__date-box">
            <text class="todo-card__date-label">
              {{ todo.dateLabel }}
            </text>
            <text class="todo-card__date-day">
              {{ todo.dateDay }}
            </text>
          </view>

          <view class="todo-card__content">
            <view class="todo-card__top">
              <view class="todo-card__title-wrap">
                <text class="todo-card__title">
                  {{ todo.title }}
                </text>
              </view>
            </view>

            <text class="todo-card__desc">
              {{ todo.desc }}
            </text>
          </view>
        </view>
      </view>

      <common-button-fixed-bottom bg-color="#fff">
        <view class="bottom-actions">
          <button class="reset-btn secondary-button" @click="nav.goHome()">
            编辑事项
          </button>
          <button class="reset-btn primary-button" @click="nav.goHome()">
            加入待办项
          </button>
        </view>
      </common-button-fixed-bottom>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.todo-list-page {
  min-height: 100vh;
  background: #fff;
}

.todo-list-page :deep(.demo-page),
.todo-list-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #fff;
}

.todo-heading {
  padding: 16px;
  background: #fff;
  box-sizing: border-box;
}

.todo-heading__title,
.todo-heading__meta,
.todo-section__title,
.todo-section__count,
.todo-card__date-label,
.todo-card__date-day,
.todo-card__title,
.todo-card__desc {
  display: block;
}

.todo-heading__title {
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.2px;
  color: #000;
}

.todo-heading__meta {
  margin-top: 2px;
  margin-left: 3px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #333;
}

.todo-divider {
  height: 1px;
  background: rgb(0 0 0 / 6%);
}

.todo-section {
  padding: 15px 14px 122px;
  box-sizing: border-box;
}

.todo-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 345px;
  height: 34px;
  padding: 4px 8px;
  margin-bottom: 28px;
  box-sizing: border-box;
}

.todo-section__title-wrap,
.todo-card__title-wrap,
.todo-card__top {
  display: flex;
  align-items: center;
}

.todo-section__icon {
  flex: 0 0 18px;
  width: 18px;
  height: 20px;
  margin-right: 8px;
}

.todo-section__title {
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  color: #1a1c1c;
}

.todo-section__count {
  width: 81px;
  height: 24px;
  border-radius: 9999px;
  background: #e2e2e2;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.24px;
  text-align: center;
  color: #1a1c1c;
}

.todo-card {
  position: relative;
  display: flex;
  width: 345px;
  min-height: 118px;
  padding: 19px 19px 18px 20px;
  margin-bottom: 14px;
  border-radius: 12px;
  background: #f3f3f3;
  box-sizing: border-box;
}

.todo-card--featured {
  min-height: 171px;
  padding-top: 19px;
  margin-bottom: 14px;
}

.todo-card__date-box {
  flex: 0 0 65px;
  width: 65px;
  height: 64px;
  margin-right: 21px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  background: #f3f3f3;
  box-sizing: border-box;
}

.todo-card--featured .todo-card__date-box {
  background: #f9f9f9;
}

.todo-card__date-label {
  padding-top: 14px;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.24px;
  text-align: center;
  color: #5e5e5e;
}

.todo-card__date-day {
  margin-top: -1px;
  font-size: 21px;
  font-weight: 600;
  line-height: 26px;
  text-align: center;
  color: #1a1c1c;
}

.todo-card__content {
  flex: 1;
  min-width: 0;
}

.todo-card__top {
  justify-content: space-between;
  height: 26px;
}

.todo-card__title-wrap {
  min-width: 0;
}

.todo-card__title {
  overflow: hidden;
  max-width: 184px;
  font-size: 14px;
  font-weight: 400;
  line-height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1a1c1c;
}

.todo-card__desc {
  overflow: hidden;
  width: 220px;
  margin-top: 11px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #626262;
}

.todo-card--featured .todo-card__desc {
  width: 220px;
  max-height: 96px;
  line-height: 24px;
}

.bottom-actions {
  display: grid;
  grid-template-columns: 114px 224px;
  gap: 7px;
  padding: 10px 15px;
  background: #fff;
  box-sizing: border-box;
}

.secondary-button,
.primary-button {
  height: 48px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
}

.secondary-button {
  border: 1px solid #000;
  background: #fff;
  color: #333;
}

.primary-button {
  border: 1px solid #000;
  background: #000;
  color: #fff;
}
</style>
