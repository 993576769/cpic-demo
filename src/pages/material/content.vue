<script setup lang="ts">
import { nav } from '@/utils/nav';

const contents = [
  '《上大学，很多人才现教育金准备晚了》',
  '《孩子教育金，到底该提前多久准备？》',
  '《从幼儿园到大学，大概要花多少钱？》',
];
</script>

<template>
  <common-demo-page title="教育险内容推荐">
    <div class="search-box">
      搜索内容标题、适合人群
    </div>
    <view v-for="title in contents" :key="title" class="content-row">
      <div class="thumb"></div>
      <div class="content-row__main">
        <text class="content-row__title">
          {{ title }}
        </text>
        <text class="content-row__desc">
          适合二孩家庭、关注孩子教育规划的顾客。
        </text>
        <div class="content-row__footer">
          <text>适合人群 / 发布时间</text>
          <button class="reset-btn use-button" @click="nav.nav('/material/moments/publish')">
            使用这条
          </button>
        </div>
      </div>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.search-box {
  height: 42px;
  padding: 0 14px;
  margin-bottom: 12px;
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  line-height: 42px;
  color: #99a1af;
}

.content-row {
  display: flex;
  gap: 12px;
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #fff;
}

.thumb {
  flex: 0 0 74px;
  height: 74px;
  border-radius: 6px;
  background: #e5e7eb;
}

.content-row__main {
  flex: 1;
  min-width: 0;
}

.content-row__title,
.content-row__desc {
  display: block;
}

.content-row__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
}

.content-row__desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.content-row__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
  color: #999;
}

.use-button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  font-size: 12px;
  color: #111;
}
</style>
