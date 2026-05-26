<script setup lang="ts">
import { nav } from '@/utils/nav';

interface MaterialContent {
  title: string;
  summary: string;
  audience: string;
  time: string;
}

const contents: MaterialContent[] = [
  {
    title: '《上大学，很多人才现教育金准备晚了》',
    summary: '教育不是一笔一次性支出，国际学校，到未来留学，真正在花钱的时候往往集中在孩子成长后期。',
    audience: '二孩家庭、孩子 3-8 岁家庭',
    time: '12:00-13:00',
  },
  {
    title: '《为什么越来越多家长提前准备教金？》',
    summary: '而是越来越多人发现：孩子未来真正需要花钱的阶段，往往和家庭事业压力最大的阶段重叠。。',
    audience: '中产家庭、关注孩子教育规划',
    time: '18:00-19:00',
  },
  {
    title: '《从幼儿园到大学，大概要花多少钱？》',
    summary: '很多家长低估了教育支出。兴趣班、升学、留学、生活费……育金真正重要的，不只是“存钱”。',
    audience: '孩子即将上小学家庭',
    time: '09:00-10:00',
  },
];

function useContent() {
  nav.nav('/material/moments/publish');
}
</script>

<template>
  <view class="material-content-page">
    <common-demo-page title="教育险内容推荐" :padded="false">
      <common-page-heading title="教育险内容推荐" />

      <view class="material-search">
        <view class="material-search__icon" />
        <text class="material-search__placeholder">
          搜索素材
        </text>
      </view>

      <view class="material-list">
        <view
          v-for="item in contents"
          :key="item.title"
          class="material-card"
        >
          <view class="material-card__content">
            <view class="material-card__thumb" />
            <view class="material-card__main">
              <text class="material-card__title">
                {{ item.title }}
              </text>
              <text class="material-card__summary">
                {{ item.summary }}
              </text>
            </view>
          </view>

          <view class="material-card__divider" />

          <view class="material-card__footer">
            <view class="material-card__meta">
              <view class="material-card__meta-line">
                <text class="material-card__meta-label">
                  适合人群
                </text>
                <text class="material-card__meta-value">
                  {{ item.audience }}
                </text>
              </view>
              <view class="material-card__meta-line">
                <text class="material-card__meta-label">
                  发布时间
                </text>
                <text class="material-card__meta-value">
                  {{ item.time }}
                </text>
              </view>
            </view>
            <button class="reset-btn use-button" @click="useContent">
              使用这条
            </button>
          </view>
        </view>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.material-content-page {
  min-height: 100vh;
  background: #fff;
}

.material-content-page :deep(.demo-page) {
  width: 375px;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
}

.material-content-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #fff;
}

.material-content-page :deep(.page-heading) {
  height: 64px;
  padding: 16px 16px 0;
  border-bottom: 1px solid #eee;
}

.material-content-page :deep(.page-heading__title) {
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  color: #000;
}

.material-search__placeholder,
.material-card__title,
.material-card__summary,
.material-card__meta-label,
.material-card__meta-value {
  display: block;
}

.material-search {
  display: flex;
  align-items: center;
  width: 347px;
  height: 32px;
  margin: 13px 14px 0;
  padding: 0 10px;
  border-radius: 100px;
  background: #f5f5f5;
  box-sizing: border-box;
}

.material-search__icon {
  position: relative;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

.material-search__icon::before,
.material-search__icon::after {
  position: absolute;
  content: '';
  box-sizing: border-box;
}

.material-search__icon::before {
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
  border: 2px solid #999;
  border-radius: 50%;
}

.material-search__icon::after {
  right: 2px;
  bottom: 3px;
  width: 8px;
  height: 2px;
  border-radius: 2px;
  background: #999;
  transform: rotate(45deg);
  transform-origin: center;
}

.material-search__placeholder {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #999;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 14px 40px;
  box-sizing: border-box;
}

.material-card {
  overflow: hidden;
  width: 348px;
  height: 178px;
  min-height: 178px;
  padding: 0;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 2px 10px #0000000a;
  box-sizing: border-box;
}

.material-card__content {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  height: 124px;
  padding: 11px 11px 0;
  box-sizing: border-box;
}

.material-card__thumb {
  flex: 0 0 70px;
  width: 70px;
  height: 85px;
  border-radius: 11px;
  background: #f8f8f8;
}

.material-card__main {
  flex: 1;
  min-width: 0;
  height: 85px;
  overflow: hidden;
  padding-top: 0;
}

.material-card__title,
.material-card__summary {
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  color: #333;
}

.material-card__summary {
  margin-top: 0;
}

.material-card__divider {
  height: 1px;
  margin: 0 11px;
  background: #eee;
}

.material-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 53px;
  padding: 8px 11px 9px;
  box-sizing: border-box;
}

.material-card__meta {
  flex: 1;
  min-width: 0;
}

.material-card__meta-line {
  display: flex;
  align-items: center;
  min-height: 18px;
}

.material-card__meta-label,
.material-card__meta-value {
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
}

.material-card__meta-label {
  flex: 0 0 42px;
  color: #9b9bad;
}

.material-card__meta-value {
  margin-left: 4px;
  color: #666;
}

.use-button {
  flex: 0 0 64px;
  width: 64px;
  height: 24px;
  margin-bottom: 6px;
  border: 1px solid #333;
  border-radius: 100px;
  background: #fff;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  color: #333;
}
</style>
