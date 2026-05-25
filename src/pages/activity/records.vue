<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['全部', '已打开', '已预约', '已到场核销'];
const activeTab = ref('全部');
const records = [
  ['7月上海静安中心内买会', '邀请时间 2026年12月12日 12:00', '暂未提交预约'],
  ['7月上海静安中心内买会', '邀请时间 2026年12月12日 12:00', '已预约 · 联系人 张朱迪 18990909898'],
  ['7月上海静安中心内买会', '邀请时间 2026年12月12日 12:00', '已核销 2026/09/09 17:00 · 联系人 张朱迪'],
  ['7月上海静安中心内买会', '邀请时间 2026年12月12日 12:00', '暂未接收邀请'],
];
</script>

<template>
  <common-demo-page title="7月HIH 线下艺术展邀约">
    <scroll-view scroll-x class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="reset-btn tab"
        :class="{ 'is-active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </scroll-view>

    <view v-for="record in records" :key="record[2]" class="record-card">
      <text class="record-card__title">
        {{ record[0] }}
      </text>
      <text class="record-card__meta">
        {{ record[1] }}
      </text>
      <text class="record-card__status">
        {{ record[2] }}
      </text>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  margin-bottom: 12px;
  white-space: nowrap;
}

.tab {
  height: 34px;
  padding: 0 14px;
  margin-right: 8px;
  border-radius: 17px;
  background: #fff;
  font-size: 13px;
}

.tab.is-active {
  background: #111;
  color: #fff;
}

.record-card {
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #fff;
}

.record-card__title,
.record-card__meta,
.record-card__status {
  display: block;
}

.record-card__title {
  font-size: 15px;
  font-weight: 600;
}

.record-card__meta,
.record-card__status {
  margin-top: 8px;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.record-card__status {
  color: #111;
}
</style>
