<script setup lang="ts">
import type { ActivityCard } from './types';

defineProps<{
  activities: ActivityCard[];
}>();

const emit = defineEmits<{
  open: [url?: string];
}>();

const activityIconMap: Record<ActivityCard['icon'], string> = {
  friends: '/static/home/activity-icon-friends.png',
  event: '/static/home/activity-icon-event.png',
};
</script>

<template>
  <div class="activity-recommendations">
    <view v-for="activity in activities" :key="activity.id" class="activity-card">
      <div class="activity-card__body">
        <div class="activity-card__main">
          <view class="activity-card__icon">
            <image
              class="activity-card__icon-image"
              mode="aspectFit"
              :src="activityIconMap[activity.icon]"
            />
          </view>
          <div class="activity-card__text">
            <text class="activity-card__title">
              {{ activity.title }}
            </text>
            <text class="activity-card__scene">
              {{ activity.scene }}
            </text>
          </div>
        </div>
        <button class="reset-btn activity-card__button" @click="emit('open', '/activity')">
          <text>报名活动</text>
        </button>
      </div>

      <div class="activity-card__footer">
        <text class="activity-card__deadline">
          截至时间： {{ activity.deadline }}
        </text>
        <text class="activity-card__quota">
          名额（{{ activity.quota }}）
        </text>
      </div>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.activity-recommendations {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 6px;
}

.activity-card {
  padding: 0 12px;
  background: #fafafa;
  border-radius: 4px;
  box-sizing: border-box;
}

.activity-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 13px 0 12px;
  box-sizing: border-box;
}

.activity-card__main {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.activity-card__icon {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8f8f8;
}

.activity-card__icon-image {
  width: 25px;
  height: 26px;
}

.activity-card__text {
  min-width: 0;
}

.activity-card__title,
.activity-card__scene {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-card__title {
  font-size: 14px;
  font-weight: 400;
  color: #333;
}

.activity-card__scene {
  margin-top: 4px;
  font-size: 12px;
  line-height: 16px;
  color: #666;
}

.activity-card__button {
  flex: 0 0 auto;
  padding: 9px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: $white-color;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 400;
  color: #4a5565;
}

.activity-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  border-top: 1px solid #e5e7eb;
  font-size: 10px;
  line-height: 16px;
  color: #666;
}

.activity-card__deadline,
.activity-card__quota {
  color: inherit;
}
</style>
