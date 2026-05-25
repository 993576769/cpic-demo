<script setup lang="ts">
import { nav } from '@/utils/nav';
</script>

<template>
  <common-demo-page title="邀请任务">
    <view class="hero-card">
      <text class="hero-card__title">
        HIH 线下艺术展邀约
      </text>
      <text class="hero-card__meta">
        2026年2月23日 · 上海环贸iapm商场3L-320室
      </text>
      <span>9天 距离结束</span>
    </view>

    <button class="reset-btn data-card" @click="nav.nav('/activity/records')">
      <div>
        <text>37 位顾客已预约</text>
        <span>还差14 位满额</span>
      </div>
      <em>查看记录 ›</em>
    </button>

    <view class="content-card">
      <text class="section-title">
        建议邀约人群
      </text>
      <div class="tags">
        <span>年消费1万 – 2万顾客</span>
        <span>有孩子的家庭 顾客</span>
      </div>
    </view>

    <view class="content-card">
      <text class="section-title">
        活动详情
      </text>
      <div class="skeleton"></div>
      <div class="skeleton skeleton--short"></div>
      <div class="skeleton"></div>
    </view>

    <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="nav.nav('/activity/invite-list')">
      批量邀请
    </button>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.hero-card,
.data-card,
.content-card {
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.hero-card {
  position: relative;
  min-height: 132px;
}

.hero-card__title,
.hero-card__meta,
.data-card text,
.data-card span,
.section-title {
  display: block;
}

.hero-card__title {
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
}

.hero-card__meta {
  margin-top: 12px;
  padding-right: 76px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.hero-card span {
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 5px 9px;
  border-radius: 12px;
  background: #111;
  font-size: 12px;
  color: #fff;
}

.data-card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
}

.data-card text {
  font-size: 16px;
  font-weight: 600;
}

.data-card span {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.data-card em {
  align-self: center;
  font-style: normal;
  font-size: 13px;
  color: #666;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tags span {
  padding: 7px 10px;
  border-radius: 14px;
  background: #f3f4f6;
  font-size: 12px;
}

.skeleton {
  height: 18px;
  margin-top: 14px;
  border-radius: 4px;
  background: #e5e7eb;
}

.skeleton--short {
  width: 70%;
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
