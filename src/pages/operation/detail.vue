<script setup lang="ts">
import type { OperationCustomer } from '@/pages/demo-data';
import { operationCustomers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { computed, ref } from 'vue';

type TabKey = OperationCustomer['status'];

const tabLabels: Record<TabKey, string> = {
  todo: '待完成',
  done: '已完成',
};

const tabs = computed(() => (['todo', 'done'] as const).map(key => ({
  key,
  label: tabLabels[key],
  count: operationCustomers.filter(customer => customer.status === key).length,
})));

const activeTab = ref<TabKey>('todo');

const visibleCustomers = computed(() => operationCustomers.filter(customer => customer.status === activeTab.value));

function selectTab(tab: TabKey) {
  activeTab.value = tab;
}

async function viewCustomer() {
  await showToast('建设中');
}

async function sendAll() {
  await showToast('已下发到企微，请到企业微信完成群发');
  nav.nav('/operation');
}
</script>

<template>
  <view class="operation-detail-page">
    <common-demo-page title="2026年中秋节祝福" :padded="false">
      <common-page-heading
        title="2026年中秋节祝福"
        subtitle="问候模版已配置，可批量转发"
        meta="任务时间 2025年7月23日 - 2025年8月23日"
        size="compact"
      />

      <view class="operation-detail-tabs" role="tablist" aria-label="完成状态">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="reset-btn operation-detail-tabs__item"
          :class="{ 'is-active': activeTab === tab.key }"
          role="tab"
          :aria-selected="activeTab === tab.key"
          @click="selectTab(tab.key)"
        >
          <text>{{ tab.label }} {{ tab.count }}</text>
          <view v-if="activeTab === tab.key" class="operation-detail-tabs__bar" />
        </button>
      </view>

      <view class="operation-customer-list">
        <view class="operation-customer-list__inner">
          <view
            v-for="customer in visibleCustomers"
            :key="customer.name"
            class="operation-customer-row"
          >
            <view class="operation-customer-row__content">
              <text class="operation-customer-row__name">
                {{ customer.name }}
              </text>
              <text class="operation-customer-row__phone">
                手机号：{{ customer.phone }}
              </text>
              <text class="operation-customer-row__owner">
                所属SA：{{ customer.owner }}
              </text>
            </view>
            <button class="reset-btn operation-customer-row__button" @click="viewCustomer">
              查看
            </button>
          </view>
        </view>
      </view>

      <common-button-fixed-bottom v-if="activeTab === 'todo'" bg-color="#fff">
        <view class="batch-send-wrap">
          <button class="reset-btn batch-send-button" @click="sendAll">
            批量发送
          </button>
        </view>
      </common-button-fixed-bottom>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.operation-detail-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.operation-detail-page :deep(.demo-page) {
  min-height: 100vh;
  background: #f8f8f8;
}

.operation-detail-page :deep(.demo-page__body) {
  background: #f8f8f8;
}

.operation-detail-page :deep(.page-heading--compact) {
  height: 133px;
  padding-top: 29px;
}

.operation-detail-tabs {
  display: flex;
  align-items: flex-end;
  height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  box-sizing: border-box;
}

.operation-detail-tabs__item {
  position: relative;
  width: 70px;
  height: 48px;
  margin-right: 17px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #999;
}

.operation-detail-tabs__item.is-active {
  color: #333;
}

.operation-detail-tabs__bar {
  position: absolute;
  display: block;
  right: 0;
  bottom: 0;
  left: 0;
  height: 4px;
  background: #333;
  content: '';
}

.operation-customer-list {
  padding: 13px 16px 114px;
  background: #fff;
  box-sizing: border-box;
}

.operation-customer-list__inner {
  background: #fff;
}

.operation-customer-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 96px;
  padding: 0 11px;
  border-bottom: 1px solid #0000001a;
  box-sizing: border-box;
}

.operation-customer-row + .operation-customer-row {
  padding-top: 10px;
}

.operation-customer-row__content {
  min-width: 0;
  padding-bottom: 12px;
}

.operation-customer-row__name,
.operation-customer-row__phone,
.operation-customer-row__owner {
  display: block;
}

.operation-customer-row__name {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #000;
}

.operation-customer-row__phone,
.operation-customer-row__owner {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #666;
}

.operation-customer-row__phone {
  margin-top: 2px;
}

.operation-customer-row__button {
  flex: 0 0 60px;
  width: 60px;
  height: 28px;
  margin-top: 24px;
  border: 1px solid #979797;
  border-radius: 8px;
  background: #000;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #fff;
}

.batch-send-wrap {
  padding-top: 15px;
  padding-right: 17px;
  padding-bottom: 15px;
  padding-left: 17px;
  background: #fff;
  box-sizing: border-box;
}

.batch-send-button {
  width: 341px;
  height: 54px;
  margin: 0 auto;
  border-radius: 14px;
  background: #1c1c1e;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #fff;
}
</style>
