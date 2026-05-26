<script setup lang="ts">
import { nav } from '@/utils/nav';

const inviteTags = ['年消费1万 - 2万顾客', '有孩子的家庭 顾客'];
</script>

<template>
  <common-demo-page title="邀请任务" class="activity-page" :padded="false">
    <view class="activity-hero">
      <view>
        <text class="activity-hero__title">
          HIH 线下艺术展邀约
        </text>
        <text class="activity-hero__meta">
          2026年2月23日
        </text>
        <text class="activity-hero__meta">
          上海环贸iapm商场3L-320室
        </text>
      </view>
      <view class="countdown">
        <view class="countdown__number">
          <text>9</text>
          <span>天</span>
        </view>
        <text class="countdown__label">
          距离结束
        </text>
      </view>
    </view>

    <view class="activity-content">
      <button class="reset-btn data-card" @click="nav.nav('/activity/records')">
        <view>
          <text class="section-title">
            预约数据
          </text>
          <text class="data-card__desc">
            37 位顾客已预约，还差14 位满额
          </text>
        </view>
        <view class="record-link">
          <text>查看记录</text>
          <img src="/static/activity/icon-record-arrow.svg" alt="" />
        </view>
      </button>

      <view class="invite-card">
        <text class="section-title">
          建议邀约人群
        </text>
        <view class="invite-list">
          <text v-for="tag in inviteTags" :key="tag">
            {{ tag }}
          </text>
        </view>
      </view>

      <view class="detail-card">
        <view class="detail-card__head">
          <text class="section-title">
            活动详情
          </text>
          <text class="collapse-text">
            收起
          </text>
        </view>
        <view class="detail-skeleton">
          <span class="line line-a"></span>
          <span class="line line-b"></span>
          <span class="line line-c"></span>
          <span class="block block-a"></span>
          <span class="line line-d"></span>
          <span class="image image-a"></span>
          <span class="image image-b"></span>
          <span class="image image-c"></span>
          <span class="line line-e"></span>
          <span class="line line-f"></span>
          <span class="line line-g"></span>
        </view>
      </view>
    </view>

    <common-button-fixed-bottom bg-color="transparent">
      <button class="reset-btn fixed-primary" @click="nav.nav('/activity/invite-list')">
        批量邀请
      </button>
    </common-button-fixed-bottom>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.activity-page {
  background: #f8f8f8;

  :deep(.button-fixed-bottom) {
    height: 92px !important;
  }

  :deep(.fixed-footer) {
    height: 92px !important;
  }
}

.activity-hero {
  display: flex;
  justify-content: space-between;
  height: 133px;
  padding: 34px 20px 0 21px;
  background: #fff;
  box-sizing: border-box;
}

.activity-hero__title,
.activity-hero__meta,
.countdown__label,
.section-title,
.data-card__desc,
.invite-list text,
.collapse-text {
  display: block;
}

.activity-hero__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333;
}

.activity-hero__meta {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #999;
}

.activity-hero__title + .activity-hero__meta {
  margin-top: 6px;
}

.countdown {
  width: 52px;
  margin-top: 6px;
  text-align: left;
}

.countdown__number {
  display: flex;
  align-items: flex-end;
  height: 42px;
  padding-left: 11px;
  box-sizing: border-box;
}

.countdown__number text {
  font-size: 30px;
  font-weight: 400;
  line-height: 42px;
  color: #333;
}

.countdown__number span {
  margin: 0 0 8px 1px;
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  color: #333;
}

.countdown__label {
  margin-top: -5px;
  font-size: 13px;
  line-height: 18px;
  color: #666;
}

.activity-content {
  width: 345px;
  margin: 15px 15px 136px;
}

.data-card,
.invite-card,
.detail-card {
  width: 345px;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
}

.data-card {
  position: relative;
  display: block;
  height: 86px;
  padding: 14px 14px 0 16px;
  margin: 0;
  text-align: left;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #333;
}

.data-card__desc {
  margin-top: 20px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #666;
}

.record-link {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: flex-start;
  height: 17px;
}

.record-link text {
  display: block;
  width: 40px;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: #333;
}

.record-link img {
  display: block;
  width: 13px;
  height: 15px;
  margin-left: 3px;
}

.invite-card {
  height: 136px;
  padding: 14px 16px 0;
  margin-top: 16px;
}

.invite-list {
  margin-top: 20px;
}

.invite-list text {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #333;
}

.invite-list text:first-child {
  height: 30px;
  margin-bottom: 12px;
  border-bottom: 1px solid #e6e6e6;
}

.detail-card {
  height: 543px;
  margin-top: 16px;
  overflow: hidden;
}

.detail-card__head {
  display: flex;
  justify-content: space-between;
  width: 313px;
  height: 22px;
  margin: 14px 16px 20px;
}

.collapse-text {
  margin-top: 3px;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #666;
}

.detail-skeleton {
  position: relative;
  width: 315px;
  height: 554px;
  margin-left: 15px;
}

.detail-skeleton span {
  position: absolute;
  display: block;
  border-radius: 6px;
  box-sizing: border-box;
}

.line {
  background: #eee;
}

.block,
.image {
  background: #e4e4e4;
}

.line-a {
  left: 2px;
  top: 0;
  width: 313px;
  height: 14px;
  background: #e4e4e4;
}

.line-b {
  left: 102px;
  top: 20px;
  width: 211px;
  height: 14px;
}

.line-c {
  left: 2px;
  top: 40px;
  width: 313px;
  height: 27px;
}

.block-a {
  left: 0;
  top: 76px;
  width: 237px;
  height: 133px;
}

.line-d {
  left: 0;
  top: 232px;
  width: 313px;
  height: 27px;
}

.image-a {
  left: 0;
  top: 266px;
  width: 312px;
  height: 208px;
}

.image-b {
  left: 27px;
  top: 287px;
  width: 171px;
  height: 154px;
}

.image-c {
  left: 220px;
  top: 410px;
  width: 81px;
  height: 54px;
}

.line-e {
  left: 2px;
  top: 487px;
  width: 313px;
  height: 14px;
  background: #e4e4e4;
}

.line-f {
  left: 102px;
  top: 508px;
  width: 211px;
  height: 14px;
}

.line-g {
  left: 2px;
  top: 528px;
  width: 313px;
  height: 27px;
}

.fixed-primary {
  width: 345px;
  height: 48px;
  margin: 0 15px 44px;
  border-radius: 24px;
  background: #000;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
  color: #fff;
}
</style>
