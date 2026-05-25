<script setup lang="ts">
import { operationCustomers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { ref } from 'vue';

const activeTab = ref('待完成 4');
const tabs = ['待完成 4', '已完成 12'];

async function sendAll() {
  await showToast('已下发到企微，请到企业微信完成群发');
  nav.nav('/operation');
}
</script>

<template>
  <common-demo-page title="2026年中秋节祝福" subtitle="问候模版已配置，可批量转发">
    <view class="hero-card">
      <text>任务时间</text>
      <span>2025/7/23 – 2025/8/23</span>
    </view>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="reset-btn tab"
        :class="{ 'is-active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <view class="customer-card">
      <div v-for="(name, index) in operationCustomers" :key="name" class="customer-row">
        <div>
          <text class="customer-row__name">
            {{ name }}
          </text>
          <text class="customer-row__meta">
            1899090989{{ index }} · 所属SA
          </text>
        </div>
        <button class="reset-btn view-button" @click="showToast('建设中')">
          查看
        </button>
      </div>
    </view>

    <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="sendAll">
      批量发送
    </button>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.hero-card,
.customer-card {
  border-radius: 8px;
  background: #fff;
}

.hero-card {
  padding: 18px;
}

.hero-card text,
.hero-card span {
  display: block;
}

.hero-card text {
  font-size: 13px;
  color: #666;
}

.hero-card span {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.tab {
  flex: 1;
  height: 38px;
  border-radius: 19px;
  background: #fff;
  font-size: 13px;
}

.tab.is-active {
  background: #111;
  color: #fff;
}

.customer-card {
  padding: 0 16px;
  margin-bottom: 82px;
}

.customer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  border-bottom: 1px solid #f0f0f0;
}

.customer-row:last-child {
  border-bottom: 0;
}

.customer-row__name,
.customer-row__meta {
  display: block;
}

.customer-row__name {
  font-size: 15px;
  font-weight: 600;
}

.customer-row__meta {
  margin-top: 6px;
  font-size: 12px;
  color: #666;
}

.view-button {
  width: 56px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #111;
  background: #fff;
  font-size: 12px;
}

.fixed-primary {
  position: fixed;
  right: 10px;
  bottom: 12px;
  left: 10px;
  height: 48px;
  border-radius: 14px;
  background: #111;
  font-size: 15px;
  color: #fff;
}
</style>
