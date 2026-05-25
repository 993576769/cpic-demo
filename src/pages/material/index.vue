<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const contentTypes = [
  '教育险',
  '医疗险',
  '高净值',
  '家庭保障内容',
];

const needs = [
  '欢迎新顾客',
  '发送产品介绍',
  '刺激复购',
  '节日祝福',
  '朋友圈',
];

const popularActions = [
  {
    title: '使用最多的图片',
    action: '查看图片',
  },
  {
    title: '最多人加入常用',
    action: '查看素材',
  },
];

const linkRankings = [
  { name: '链接名称', count: 125 },
  { name: '链接名称', count: 89 },
  { name: '链接名称', count: 76 },
  { name: '链接名称', count: 67 },
];

const productRankings = Array.from({ length: 4 }, () => ({
  name: '产品名称',
  count: 85,
}));

function openContent(item: string) {
  if (item === '教育险') {
    nav.nav('/material/content?type=education');
    return;
  }

  showToast('建设中');
}

function openNeed(item: string) {
  if (item === '朋友圈') {
    nav.nav('/material/moments');
    return;
  }

  showToast('建设中');
}
</script>

<template>
  <view class="material-home-page">
    <common-demo-page title="素材库" :padded="false">
      <view class="material-home-content">
        <view class="material-section material-section--content">
          <text class="section-title">
            内容推荐
          </text>
          <view class="content-grid">
            <button
              v-for="item in contentTypes"
              :key="item"
              class="reset-btn content-card"
              @click="openContent(item)"
            >
              <text class="content-card__title">
                {{ item }}
              </text>
              <text class="content-card__action">
                查看列表
              </text>
            </button>
          </view>
        </view>

        <view class="material-section material-section--needs">
          <text class="section-title">
            你可能会需要
          </text>
          <view class="needs-grid">
            <button
              v-for="item in needs"
              :key="item"
              class="reset-btn need-card"
              @click="openNeed(item)"
            >
              <text class="need-card__title">
                {{ item }}
              </text>
              <view class="need-card__footer">
                <text class="need-card__action">
                  查看素材
                </text>
                <text class="chevron">
                  ›
                </text>
              </view>
            </button>
          </view>
        </view>

        <view class="material-section material-section--popular">
          <text class="section-title">
            别人也在用
          </text>
          <view class="rank-grid">
            <button
              v-for="item in popularActions"
              :key="item.title"
              class="reset-btn rank-card rank-card--action"
              @click="showToast('建设中')"
            >
              <text class="rank-card__title">
                {{ item.title }}
              </text>
              <view class="rank-card__divider" />
              <view class="rank-card__footer">
                <text class="rank-card__action">
                  {{ item.action }}
                </text>
                <text class="chevron">
                  ›
                </text>
              </view>
            </button>

            <view class="rank-card rank-card--list">
              <text class="rank-card__title">
                最多点击的链接
              </text>
              <view class="rank-card__divider" />
              <view class="ranking-list">
                <view
                  v-for="item in linkRankings"
                  :key="`${item.name}-${item.count}`"
                  class="ranking-row"
                >
                  <text class="ranking-row__name">
                    {{ item.name }}
                  </text>
                  <text class="ranking-row__count">
                    {{ item.count }}
                  </text>
                </view>
              </view>
            </view>

            <view class="rank-card rank-card--list">
              <text class="rank-card__title">
                发送最多的产品系列
              </text>
              <view class="rank-card__divider" />
              <view class="ranking-list">
                <view
                  v-for="(item, index) in productRankings"
                  :key="`${item.name}-${index}`"
                  class="ranking-row"
                >
                  <text class="ranking-row__name">
                    {{ item.name }}
                  </text>
                  <text class="ranking-row__count">
                    {{ item.count }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.material-home-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.material-home-page :deep(.demo-page) {
  min-height: 100vh;
  background: #f8f8f8;
}

.material-home-content {
  padding: 18px 15px 70px;
  box-sizing: border-box;
}

.material-section + .material-section--needs {
  margin-top: 39px;
}

.material-section + .material-section--popular {
  margin-top: 24px;
}

.section-title,
.content-card__title,
.content-card__action,
.need-card__title,
.need-card__action,
.rank-card__title,
.rank-card__action,
.ranking-row__name,
.ranking-row__count {
  display: block;
}

.section-title {
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #333;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 167px);
  gap: 10px 10px;
}

.content-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 167px;
  height: 99px;
  padding: 20px 17px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  text-align: left;
}

.content-card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #000;
}

.content-card__action,
.need-card__action,
.rank-card__action {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #333;
}

.needs-grid {
  display: grid;
  grid-template-columns: repeat(3, 107px);
  gap: 14px 12px;
}

.need-card {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-direction: column;
  width: 107px;
  height: 80px;
  padding: 10px 5px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  text-align: left;
}

.need-card__title {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #000;
}

.need-card__footer,
.rank-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chevron {
  display: block;
  width: 16px;
  height: 16px;
  font-size: 21px;
  font-weight: 300;
  line-height: 14px;
  text-align: center;
  color: #ccc;
}

.rank-grid {
  display: grid;
  grid-template-columns: repeat(2, 166px);
  gap: 13px 13px;
}

.rank-card {
  width: 166px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  text-align: left;
}

.rank-card--action {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  height: 81px;
  padding: 11px 11px 0;
}

.rank-card--list {
  height: 154px;
  padding: 11px 11px 0;
}

.rank-card__title {
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  color: #333;
}

.rank-card__divider {
  height: 1px;
  margin-top: 14px;
  background: #e6e6e6;
}

.rank-card__footer {
  height: 34px;
}

.ranking-list {
  padding-top: 8px;
}

.ranking-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 23px;
}

.ranking-row__name {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #333;
}

.ranking-row__count {
  min-width: 24px;
  font-family: 'DIN Alternate', Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
  text-align: right;
  color: #999;
}
</style>
