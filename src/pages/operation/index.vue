<script setup lang="ts">
import { operationTasks } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
</script>

<template>
  <view class="operation-page">
    <common-demo-page title="运营任务" :padded="false">
      <common-page-heading
        title="运营任务"
        subtitle="请尽快完成"
      />

      <view class="operation-task-list">
        <view
          v-for="task in operationTasks"
          :key="task.id"
          class="operation-task-card"
        >
          <view class="operation-task-card__header">
            <view class="operation-task-card__main">
              <text class="operation-task-card__title">
                {{ task.title }}
              </text>
              <view class="operation-task-card__type">
                <view
                  class="operation-task-card__indicator"
                  :style="{ backgroundColor: task.color }"
                />
                <text class="operation-task-card__type-text">
                  {{ task.type }}
                </text>
              </view>
            </view>

            <button class="reset-btn operation-task-card__button" @click="nav.nav('/operation/zhongqiu')">
              去完成
            </button>
          </view>

          <view class="operation-task-card__divider" />

          <view class="operation-task-card__footer">
            <text class="operation-task-card__deadline">
              {{ task.deadline }}
            </text>
            <text class="operation-task-card__progress">
              {{ task.progress }}
            </text>
          </view>
        </view>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.operation-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.operation-page :deep(.demo-page) {
  min-height: 100vh;
  background: #f8f8f8;
}

.operation-page :deep(.demo-page__body) {
  background: #f8f8f8;
}

.operation-task-list {
  padding: 14px 15px 28px;
  box-sizing: border-box;
}

.operation-task-card {
  width: 345px;
  height: 100px;
  padding: 18px 10px 0 12px;
  margin: 0 auto 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}

.operation-task-card__header,
.operation-task-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.operation-task-card__header {
  height: 42px;
}

.operation-task-card__main {
  min-width: 0;
}

.operation-task-card__title {
  display: block;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.operation-task-card__type {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.operation-task-card__indicator {
  flex: 0 0 6px;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 50%;
}

.operation-task-card__type-text {
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  color: #666;
}

.operation-task-card__button {
  flex: 0 0 60px;
  width: 60px;
  height: 28px;
  border-radius: 4px;
  background: #000;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
  color: #fff;
}

.operation-task-card__divider {
  height: 1px;
  margin: 10px -5px 0;
  background: #dedede;
  transform: scaleY(0.5);
  transform-origin: center;
}

.operation-task-card__footer {
  height: 28px;
}

.operation-task-card__deadline,
.operation-task-card__progress {
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  color: #666;
}

.operation-task-card__deadline {
  min-width: 0;
}

.operation-task-card__progress {
  flex: 0 0 auto;
  margin-left: 8px;
  text-align: right;
}
</style>
