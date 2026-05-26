<script setup lang="ts">
import { customers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { ref } from 'vue';

const filterChips = ['全部', '高热客户', '潜在转化', '流失风险', '沉睡客户', '生日'];
const quadrants = [
  { label: '高热高价客户', count: '265' },
  { label: '高热低价客户', count: '178' },
  { label: '低热高价客户', count: '265' },
  { label: '低热低价客户', count: '78' },
];
const activeChip = ref('全部');
const activeQuadrant = ref('高热高价客户');
const isQuadrantMode = ref(false);
const searchKeyword = ref('');
</script>

<template>
  <common-demo-page
    class="customers-page"
    title="客户档案"
    tab-bar="customers"
    :show-back="false"
    :show-title="false"
  >
    <div class="page-header">
      <div>
        <text class="page-header__title">
          客户档案
        </text>
        <text class="page-header__desc">
          按标签、热度和价值快速定位跟进对象
        </text>
      </div>
      <button class="reset-btn icon-button" @click="isQuadrantMode = !isQuadrantMode">
        <image mode="aspectFit" src="/static/customer/icon-mode-switch.svg" />
      </button>
    </div>

    <div class="search-box">
      <image class="search-box__icon" mode="aspectFit" src="/static/customer/icon-search.svg" />
      <input
        v-model="searchKeyword"
        class="search-box__input"
        placeholder="搜索姓名、手机号、标签等"
      />
    </div>

    <scroll-view v-if="!isQuadrantMode" scroll-x class="chip-scroll">
      <button
        v-for="chip in filterChips"
        :key="chip"
        class="reset-btn chip"
        :class="{ 'is-active': activeChip === chip }"
        @click="activeChip = chip"
      >
        {{ chip }}
      </button>
    </scroll-view>

    <div v-else class="quadrant-grid">
      <button
        v-for="quadrant in quadrants"
        :key="quadrant.label"
        class="reset-btn quadrant-card"
        :class="{ 'is-active': activeQuadrant === quadrant.label }"
        @click="activeQuadrant = quadrant.label"
      >
        <text>{{ quadrant.count }}</text>
        <span>{{ quadrant.label }}</span>
      </button>
    </div>

    <div v-if="!isQuadrantMode" class="stats-grid">
      <div>
        <text>32</text>
        <span>本月维护</span>
      </div>
      <div>
        <text>12</text>
        <span>高热客户</span>
      </div>
      <div>
        <text>5</text>
        <span>待跟进</span>
      </div>
    </div>

    <div class="list-card">
      <button
        v-for="customer in customers"
        :key="customer.id"
        class="reset-btn list-card__button"
        @click="nav.nav('/customers/wang')"
      >
        <common-demo-customer-row :customer="customer" />
      </button>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.page-header,
.list-card,
.stats-grid,
.quadrant-grid {
  background: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 12px;
}

.page-header__title,
.page-header__desc {
  display: block;
}

.page-header__title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.page-header__desc {
  margin-top: 4px;
  font-size: 13px;
  line-height: 19px;
  color: #666;
}

.customers-page {
  background: #fff;
}

.customers-page :deep(.demo-page) {
  background: #fff;
}

.customers-page :deep(.demo-page__body--padded) {
  padding: 10px 16px 84px;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}

.icon-button image {
  width: 22px;
  height: 22px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 42px;
  padding: 0 14px;
  margin-top: 0;
  border-radius: 11px;
  background: #f7f7f7;
  font-size: 15px;
  color: #888;
}

.search-box__icon {
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
}

.search-box__input {
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 0;
  background: transparent;
  font-size: 15px;
  line-height: 42px;
  color: #333;
  outline: none;
}

.chip-scroll {
  width: 100%;
  margin-top: 24px;
  white-space: nowrap;
}

.chip {
  display: inline-flex;
  height: 28px;
  padding: 0 13px;
  margin-right: 8px;
  border: 1px solid #eeeeee;
  border-radius: 15px;
  background: #fff;
  font-size: 12px;
  color: #888;
}

.chip.is-active,
.chip.is-active {
  background: #111;
  color: #fff;
}

.quadrant-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 10px;
  margin: 22px 0 28px;
}

.quadrant-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1px;
  height: 64px;
  padding: 0 8px;
  border-radius: 12px;
  background: #f9f9fb;
  text-align: center;
  color: #999;
}

.quadrant-card text,
.quadrant-card span {
  display: block;
}

.quadrant-card text {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333;
}

.quadrant-card span {
  margin-top: 1px;
  font-size: 12px;
  line-height: 18px;
}

.quadrant-card.is-active {
  background: #000;
  color: #fff;
}

.quadrant-card.is-active text {
  color: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 10px -16px 0;
  padding: 10px 0 11px;
  border-top: 1px solid #eeeeee;
  border-bottom: 6px solid #f8f8f8;
  border-radius: 0;
}

.stats-grid div {
  text-align: center;
}

.stats-grid text,
.stats-grid span {
  display: block;
}

.stats-grid text {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: #1a1a1a;
}

.stats-grid span {
  margin-top: 3px;
  font-size: 12px;
  color: #aaa;
}

.list-card {
  margin: 0 -16px;
  padding: 0;
  border-radius: 0;
}

.list-card__button {
  display: block;
  width: 100%;
  text-align: left;
}
</style>
