<script setup lang="ts">
import { nav } from '@/utils/nav';

const todos = [
  ['今日 12', '发送教育金+重疾组合方案', '先发微信方案，重点说明预算区间和孩子保障缺口。'],
  ['明天 13', '回访电话确认', '确认教育金预算、是否需要加入父母保障。'],
  ['3天后 15', '发送定制化分析', '补充不同预算版本和理赔案例。'],
  ['5天后 17', '预约线下见证', '邀请客户进行方案确认和保单讲解。'],
];
</script>

<template>
  <common-demo-page title="待办事项列表" subtitle="目标客户 王女士">
    <div class="summary-card">
      <text class="summary-card__title">
        📋 待办任务列表
      </text>
      <span>4 条建议</span>
    </div>

    <div class="timeline">
      <div v-for="todo in todos" :key="todo[0]" class="todo-card">
        <text class="todo-card__date">
          {{ todo[0] }}
        </text>
        <div>
          <text class="todo-card__title">
            {{ todo[1] }}
          </text>
          <text class="todo-card__desc">
            {{ todo[2] }}
          </text>
        </div>
      </div>
    </div>

    <div class="bottom-actions padding-bottom-safe-area">
      <button class="reset-btn secondary-button" @click="nav.goHome()">
        编辑事项
      </button>
      <button class="reset-btn primary-button" @click="nav.goHome()">
        加入待办项
      </button>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.summary-card,
.todo-card {
  border-radius: 8px;
  background: #fff;
}

.summary-card {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  margin-bottom: 14px;
}

.summary-card__title {
  font-size: 16px;
  font-weight: 600;
}

.summary-card span {
  padding: 3px 9px;
  border-radius: 12px;
  background: #f3f4f6;
  font-size: 12px;
  color: #666;
}

.timeline {
  padding-bottom: 92px;
}

.todo-card {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
  padding: 16px;
  margin-bottom: 10px;
}

.todo-card__date,
.todo-card__title,
.todo-card__desc {
  display: block;
}

.todo-card__date {
  font-size: 15px;
  font-weight: 600;
}

.todo-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}

.todo-card__desc {
  margin-top: 7px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
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
