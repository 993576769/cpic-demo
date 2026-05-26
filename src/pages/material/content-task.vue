<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const productNames = [
  '产品名称 D21311KP71-BK/XL',
];

const selectedTags = [
  '年收30-50万',
  '有房有车',
  '算法工程师',
];

function copyProduct() {
  showToast('已复制');
}

function chooseMaterial() {
  nav.nav('/material/moments');
}

function confirmTask() {
  showToast('已确定');
}
</script>

<template>
  <view class="content-task-page">
    <common-demo-page title="内容详情页" :padded="false">
      <view class="content-task-hero">
        <common-page-heading
          title="内容详情页"
          subtitle="从幼儿园到大学，大概要花多少钱？"
          meta="中产家庭、关注孩子教育规划"
          size="compact"
        />
        <button class="reset-btn content-link" @click="showToast('建设中')">
          <text class="content-link__text">
            查看内容
          </text>
          <image
            class="content-link__chevron"
            mode="aspectFit"
            src="/static/material/icon-chevron-right-light.svg"
          />
        </button>

        <view class="content-task-stats">
          <view class="stat-item stat-item--read">
            <image
              class="stat-item__icon"
              mode="aspectFit"
              src="/static/material/icon-eye.svg"
            />
            <text class="stat-item__text">
              <text class="stat-item__value">
                72
              </text>
              <text class="stat-item__label">
                人已读
              </text>
            </text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item stat-item--send">
            <image
              class="stat-item__icon"
              mode="aspectFit"
              src="/static/material/icon-users.svg"
            />
            <text class="stat-item__text">
              <text class="stat-item__label">
                共发送
              </text>
              <text class="stat-item__value">
                86
              </text>
              <text class="stat-item__label">
                人
              </text>
            </text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item stat-item--open">
            <text class="stat-item__text">
              <text class="stat-item__value stat-item__value--blue">
                84%
              </text>
              <text class="stat-item__label">
                打开
              </text>
            </text>
          </view>
        </view>
      </view>

      <view class="task-content">
        <view class="task-card task-card--products">
          <view class="task-card__header">
            <text class="task-card__title">
              涉及保险产品
            </text>
          </view>
          <view class="product-list">
            <view
              v-for="product in productNames"
              :key="product"
              class="product-row"
            >
              <text class="product-row__name">
                {{ product }}
              </text>
              <button class="reset-btn product-row__copy" @click="copyProduct">
                <image
                  class="copy-icon"
                  mode="aspectFit"
                  src="/static/material/icon-copy.svg"
                />
              </button>
            </view>
          </view>
        </view>

        <view class="task-card task-card--copy">
          <view class="task-card__header">
            <text class="task-card__title">
              参考文案
            </text>
          </view>
          <view class="copy-box">
            <text class="copy-box__text">
              文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材文字素材
            </text>
          </view>
          <button class="reset-btn outline-button" @click="chooseMaterial">
            去素材库选择
          </button>
        </view>

        <view class="task-card task-card--audience">
          <view class="task-card__header">
            <text class="task-card__title">
              选择人群
            </text>
          </view>
          <text class="audience-label">
            已选标签
          </text>
          <view class="tag-list">
            <text
              v-for="tag in selectedTags"
              :key="tag"
              class="tag-chip"
            >
              {{ tag }}
            </text>
          </view>
          <button class="reset-btn outline-button outline-button--tag" @click="showToast('建设中')">
            添加标签
          </button>
        </view>

        <view class="task-card task-card--schedule">
          <view class="task-card__header">
            <text class="task-card__title">
              定时推送
            </text>
          </view>
          <view class="schedule-list">
            <button class="reset-btn schedule-row" @click="showToast('建设中')">
              <view class="schedule-row__content">
                <text class="schedule-row__label">
                  选择日期
                </text>
                <text class="schedule-row__value">
                  今天 2025-07-14
                </text>
              </view>
              <image
                class="chevron-down"
                mode="aspectFit"
                src="/static/material/icon-chevron-down-field.svg"
              />
            </button>
            <button class="reset-btn schedule-row" @click="showToast('建设中')">
              <view class="schedule-row__content">
                <text class="schedule-row__label">
                  选择时间
                </text>
                <text class="schedule-row__value schedule-row__value--muted">
                  13:00
                </text>
              </view>
              <image
                class="chevron-down"
                mode="aspectFit"
                src="/static/material/icon-chevron-down-field.svg"
              />
            </button>
          </view>
        </view>
      </view>

      <common-button-fixed-bottom bg-color="#fff">
        <view class="bottom-actions">
          <button class="reset-btn secondary-button" @click="nav.navigateBack()">
            取消
          </button>
          <button class="reset-btn primary-button" @click="confirmTask">
            确定
          </button>
        </view>
      </common-button-fixed-bottom>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.content-task-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.content-task-page :deep(.demo-page) {
  width: 375px;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  background: #f8f8f8;
}

.content-task-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #f8f8f8;
}

.content-task-page :deep(.fixed-footer) {
  left: 50%;
  width: 375px;
  max-width: 100vw;
  transform: translateX(-50%);
}

.content-task-hero {
  position: relative;
  height: 228px;
  background: #fff;
  box-sizing: border-box;
}

.content-task-hero::after {
  position: absolute;
  top: 141px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #0000000f;
  content: '';
}

.content-task-page :deep(.page-heading) {
  height: auto;
  padding: 16px 16px 0;
}

.content-task-page :deep(.page-heading__title) {
  font-size: 16px;
  line-height: 32px;
  color: #0a0a0a;
}

.content-task-page :deep(.page-heading__subtitle) {
  margin-top: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 32px;
  color: #0a0a0a;
}

.content-task-page :deep(.page-heading__meta) {
  margin-top: 0;
  font-size: 10px;
  line-height: 18px;
  color: #666;
}

.content-link {
  display: flex;
  align-items: center;
  width: 56px;
  height: 17px;
  margin: 10px 0 0 16px;
  background: #fff;
}

.content-link__text,
.content-link__chevron,
.stat-item__text,
.stat-item__value,
.stat-item__label,
.task-card__title,
.product-row__name,
.copy-box__text,
.audience-label,
.tag-chip,
.schedule-row__label,
.schedule-row__value {
  display: block;
}

.content-link__text {
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: #333;
}

.content-link__chevron {
  margin-left: 5px;
  width: 13px;
  height: 16px;
}

.content-task-stats {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 343px;
  height: 48px;
  margin: 31px 19px 0 13px;
  padding: 0 16px;
  border-radius: 14px;
  background: #f9f9fb;
  box-sizing: border-box;
}

.stat-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
}

.stat-item--read {
  width: 78px;
}

.stat-item--send {
  width: 96px;
}

.stat-item--open {
  width: 57px;
}

.stat-divider {
  flex: 0 0 1px;
  width: 1px;
  height: 14px;
  margin: 0 16px;
  background: #e5e5e5;
}

.stat-item__text,
.stat-item__value,
.stat-item__label {
  display: inline;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
}

.stat-item__value {
  margin: 0 3px;
  font-weight: 600;
  color: #333;
}

.stat-item__value--blue {
  color: #3d7bff;
}

.stat-item__label {
  font-weight: 400;
  color: #8e8e93;
}

.stat-item__icon {
  flex: 0 0 14px;
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.task-content {
  padding: 16px 10px 108px;
  box-sizing: border-box;
}

.task-card {
  width: 355px;
  margin: 0 0 14px;
  padding: 0 10px;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}

.task-card--products {
  height: 118px;
  min-height: 118px;
}

.task-card--copy {
  height: 243px;
  min-height: 243px;
  padding-bottom: 0;
}

.task-card--audience {
  height: 210px;
  min-height: 210px;
  padding-bottom: 0;
}

.task-card--schedule {
  height: 198px;
  min-height: 198px;
}

.task-card__header {
  height: 43px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}

.task-card__title {
  padding-top: 13px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #333;
}

.product-list {
  padding-top: 17px;
}

.product-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 313px;
  height: 36px;
  margin: 0 auto;
  padding: 0 12px;
  border-radius: 4px;
  background: #f8f8f8;
  box-sizing: border-box;
}

.product-row__name {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #333;
}

.product-row__copy {
  width: 24px;
  height: 24px;
  background: transparent;
}

.copy-icon {
  width: 20px;
  height: 20px;
}

.copy-box {
  width: 324px;
  height: 97px;
  min-height: 97px;
  margin: 19px 0 0;
  padding: 10px 12px;
  border-radius: 2px;
  background: #f8f8f8;
  box-sizing: border-box;
}

.copy-box__text {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #333;
}

.outline-button {
  width: 313px;
  height: 40px;
  margin: 20px 0 0 5px;
  border: 1px solid #000;
  border-radius: 100px;
  background: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #000;
}

.audience-label {
  margin: 14px 0 0 2px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 0 0;
}

.tag-chip {
  height: 24px;
  padding: 0 10px;
  border-radius: 100px;
  background: #eaeaea;
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  color: #949494;
}

.outline-button--tag {
  margin-top: 29px;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 29px;
}

.schedule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 313px;
  height: 48px;
  margin: 0 0 0 5px;
  padding: 0 16px;
  border: 1px solid #dcdcdc;
  border-radius: 100px;
  background: #fff;
  box-sizing: border-box;
}

.schedule-row__content {
  display: flex;
  align-items: center;
  min-width: 0;
}

.schedule-row__label,
.schedule-row__value {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.schedule-row__label {
  color: #333;
}

.schedule-row__value {
  margin-left: 16px;
  color: #333;
}

.schedule-row__value--muted {
  color: #ccc;
}

.chevron-down {
  width: 24px;
  height: 24px;
}

.bottom-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  max-width: 375px;
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  background: #fff;
  box-sizing: border-box;
}

.secondary-button,
.primary-button {
  height: 48px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
}

.secondary-button {
  border: 1px solid #0000001f;
  background: #fff;
  color: #000;
}

.primary-button {
  border: 1px solid #000;
  background: #000;
  color: #fff;
}
</style>
