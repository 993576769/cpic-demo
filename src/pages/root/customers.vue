<script setup lang="ts">
import { customers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { ref } from 'vue';

const filterChips = ['全部', '高热客户', '潜在转化', '流失风险', '沉睡客户', '生日'];
const quadrants = ['高热高价客户', '高热低价客户', '低热高价客户', '低热低价客户'];
const activeChip = ref('全部');
const activeQuadrant = ref('高热高价客户');
const isQuadrantMode = ref(false);
</script>

<template>
  <common-demo-page
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
        <text>↗</text>
      </button>
    </div>

    <div class="search-box">
      搜索姓名、手机号、标签等
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
        v-for="(item, index) in quadrants"
        :key="item"
        class="reset-btn quadrant-card"
        :class="{ 'is-active': activeQuadrant === item }"
        @click="activeQuadrant = item"
      >
        <text class="quadrant-card__count">
          {{ index === 1 ? 178 : index === 3 ? 78 : 265 }}
        </text>
        <text>{{ item }}</text>
      </button>
    </div>

    <div class="stats-grid">
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
  border-radius: 8px;
  background: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
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

.icon-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 18px;
}

.search-box {
  height: 42px;
  padding: 0 14px;
  margin-top: 12px;
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  line-height: 42px;
  color: #99a1af;
}

.chip-scroll {
  width: 100%;
  margin-top: 12px;
  white-space: nowrap;
}

.chip {
  height: 34px;
  padding: 0 14px;
  margin-right: 8px;
  border-radius: 17px;
  background: #fff;
  font-size: 13px;
  color: #333;
}

.chip.is-active,
.quadrant-card.is-active {
  background: #111;
  color: #fff;
}

.quadrant-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin-top: 12px;
  overflow: hidden;
  background: #ececec;
}

.quadrant-card {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  min-height: 78px;
  padding: 14px;
  background: #fff;
  text-align: left;
}

.quadrant-card__count {
  display: block;
  margin-bottom: 5px;
  font-size: 22px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 12px;
  padding: 16px 0;
}

.stats-grid div {
  text-align: center;
}

.stats-grid text,
.stats-grid span {
  display: block;
}

.stats-grid text {
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
}

.stats-grid span {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.list-card {
  margin-top: 12px;
  padding: 0 14px;
}

.list-card__button {
  display: block;
  width: 100%;
  text-align: left;
}
</style>
