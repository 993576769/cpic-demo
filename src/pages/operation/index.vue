<script setup lang="ts">
import { nav } from '@/utils/nav';

const tasks = [
  ['7月生日祝福发送', 'Birthday', '截至 2026年7月12日 12:20', '0/21'],
  ['2026年父情节祝福', 'Father-s-Day', '截至 2026年7月12日 12:20', '0/21'],
];
</script>

<template>
  <common-demo-page title="运营任务" subtitle="请尽快完成">
    <view v-for="task in tasks" :key="task[0]" class="task-card">
      <div>
        <text class="task-card__type">
          {{ task[1] }}
        </text>
        <text class="task-card__title">
          {{ task[0] }}
        </text>
        <text class="task-card__meta">
          {{ task[2] }} · 进度 {{ task[3] }}
        </text>
      </div>
      <button class="reset-btn task-card__button" @click="nav.nav('/operation/zhongqiu')">
        去完成
      </button>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.task-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.task-card__type,
.task-card__title,
.task-card__meta {
  display: block;
}

.task-card__type {
  font-size: 12px;
  color: #ed6c00;
}

.task-card__title {
  margin-top: 8px;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}

.task-card__meta {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.task-card__button {
  align-self: center;
  flex: 0 0 76px;
  height: 34px;
  border-radius: 17px;
  background: #111;
  font-size: 13px;
  color: #fff;
}
</style>
