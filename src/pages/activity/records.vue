<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['全部', '已打开', '已预约', '已到场核销'];
const activeTab = ref('全部');
const records = [
  {
    title: '7月上海静安中心内买会',
    time: '邀请时间：2026年12月12日 12:00',
    status: '/暂未提交预约',
  },
  {
    title: '7月上海静安中心内买会',
    time: '邀请时间：2026年12月12日 12:00',
    status: '/已预约',
    contact: '张朱迪 18990909898',
  },
  {
    title: '7月上海静安中心内买会',
    time: '邀请时间：2026年12月12日 12:00',
    status: '/已核销 2026/09/09 17:00',
    contact: '张朱迪 18990909898',
  },
  {
    title: '7月上海静安中心内买会',
    time: '邀请时间：2026年12月12日 12:00',
    status: '/暂未接收邀请',
  },
];
</script>

<template>
  <common-demo-page title="邀约记录" class="records-page">
    <text class="page-title">
      7月HIH 线下艺术展邀约
    </text>

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

    <view v-for="record in records" :key="record.status" class="record-card">
      <text class="record-card__title">
        {{ record.title }}
      </text>
      <text class="record-card__meta">
        {{ record.time }}
      </text>
      <view class="record-card__bottom">
        <text class="record-card__status">
          {{ record.status }}
        </text>
        <text v-if="record.contact" class="record-card__contact">
          {{ record.contact }}
        </text>
      </view>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.records-page {
  background: #fff;

  :deep(.demo-page__body--padded) {
    padding-top: 16px;
    padding-right: 30px;
    padding-left: 20px;
  }
}

.page-title {
  display: block;
  margin: 0 0 11px;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  color: #333;
}

.tabs {
  width: 325px;
  margin: 0 0 21px;
  margin-left: 1px;
  border-bottom: 1px solid #d8d8d8;
  white-space: nowrap;
}

.tab {
  height: 22px;
  padding: 0;
  margin-right: 13px;
  border-radius: 0;
  background: transparent;
  font-size: 12px;
  line-height: 20px;
  color: #666;
}

.tab.is-active {
  background: transparent;
  font-weight: 600;
  color: #fff;
  color: #000;
}

.record-card {
  height: 65px;
  padding: 0 2px;
  margin: 0 0 16px 2px;
  border-bottom: 1px solid #d8d8d8;
  border-radius: 0;
  background: #fff;
}

.record-card__title,
.record-card__meta,
.record-card__status {
  display: block;
}

.record-card__title {
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #000;
}

.record-card__meta,
.record-card__status,
.record-card__contact {
  font-size: 11px;
  line-height: 15px;
  color: #666;
}

.record-card__meta {
  margin-top: 4px;
}

.record-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 11px;
}

.record-card__status,
.record-card__contact {
  display: block;
}

.record-card__contact {
  flex: 0 0 auto;
  text-align: right;
}
</style>
