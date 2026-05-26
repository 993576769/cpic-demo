<script setup lang="ts">
import { customers, journeyBatchCustomers, journeyCustomers } from '@/pages/demo-data';
import SegmentControl from '@/pages/root/home/SegmentControl.vue';
import { showToast } from '@/utils/toast';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const stages = [
  { key: 'D1 欢迎语', label: 'D1', compactLabel: 'D1' },
  { key: 'D3保险科普', label: 'D3', compactLabel: 'D3' },
  { key: 'D7', label: 'D7', compactLabel: 'D7' },
  { key: 'D15', label: 'D15', compactLabel: 'D15' },
  { key: 'D30', label: 'D30', compactLabel: 'D30' },
];

function getInitialStage() {
  if (getHashParam('stage') === 'D3') {
    return 'D3保险科普';
  }

  return 'D1 欢迎语';
}

function getHashParam(key: string) {
  const paramsText = globalThis.location?.hash.split('?')[1] ?? '';
  return new URLSearchParams(paramsText).get(key);
}

function getInitialSheet() {
  return getHashParam('sheet') === 'batch-send';
}

const activeStage = ref(getInitialStage());
const showSheet = ref(getInitialSheet());
const showMaterialDetail = ref(false);
const selected = ref(journeyBatchCustomers.map((_, index) => index));
const detailCopy = '很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充...很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充...很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充...';
const detailCopySecond = '很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充...很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充...';

function syncRouteState(query: Record<string, string | undefined> = {}) {
  const stage = query.stage ?? getHashParam('stage');
  const sheet = query.sheet ?? getHashParam('sheet');

  activeStage.value = stage === 'D3' ? 'D3保险科普' : 'D1 欢迎语';
  showSheet.value = sheet === 'batch-send';
  showMaterialDetail.value = false;
}

const handleHashChange = () => syncRouteState();

onLoad((query = {}) => {
  syncRouteState(query);
});

onShow(() => {
  syncRouteState();
});

onMounted(() => {
  globalThis.addEventListener?.('hashchange', handleHashChange);
});

onBeforeUnmount(() => {
  globalThis.removeEventListener?.('hashchange', handleHashChange);
});

const materialTitle = computed(() => activeStage.value === 'D1 欢迎语' ? '新客户欢迎话术' : '为什么说百万医疗险是家庭必备');
const materialType = computed(() => activeStage.value === 'D1 欢迎语' ? '文字消息' : '内容落地页');
const materialPreview = computed(() => activeStage.value === 'D1 欢迎语'
  ? '您好，感谢您添加我为好友！...'
  : '很多人觉得有社保就够了，但实际上医保报销存在很大缺口，');
const batchStageTitle = computed(() => activeStage.value === 'D1 欢迎语' ? 'Day1 欢迎语' : activeStage.value);
const batchMaterialTitle = computed(() => activeStage.value === 'D1 欢迎语' ? '新客户专属欢迎礼包' : materialTitle.value);
const batchMaterialPreview = computed(() => activeStage.value === 'D1 欢迎语'
  ? '您好，感谢您添加我为好友！我是您的专属保险顾问，接下来将为您提供家庭保障建议。'
  : '很多人觉得有社保就够了，但实际上医保报销存在很大缺口，百万医疗险可以有效补充。');
const stageTabs = computed(() => stages.map(stage => ({
  key: stage.key,
  label: getStageLabel(stage),
})));

function selectStage(stage: string) {
  activeStage.value = stage;
}

function getStageLabel(stage: typeof stages[number]) {
  return activeStage.value === 'D1 欢迎语' ? stage.label : stage.compactLabel;
}

function toggleCustomer(index: number) {
  selected.value = selected.value.includes(index)
    ? selected.value.filter(item => item !== index)
    : [...selected.value, index];
}

function toggleAll() {
  selected.value = selected.value.length === journeyBatchCustomers.length ? [] : journeyBatchCustomers.map((_, index) => index);
}

function confirmSend() {
  showSheet.value = false;
  showToast('已下发到企微，请到企业微信完成群发');
}
</script>

<template>
  <view class="journey-page">
    <common-demo-page :padded="false">
      <view class="journey-hero">
        <text class="journey-hero__title">
          自动客户旅程
        </text>
        <text class="journey-hero__subtitle">
          企微批量添加好友后触发 · 5 个阶段
        </text>
        <view class="stats">
          <view class="stats__item">
            <text class="stats__number">
              265
            </text>
            <text class="stats__label">
              旅程总人数
            </text>
          </view>
          <view class="stats__item">
            <text class="stats__number">
              178
            </text>
            <text class="stats__label">
              累计已读
            </text>
          </view>
          <view class="stats__item">
            <text class="stats__number">
              67%
            </text>
            <text class="stats__label">
              平均打开率
            </text>
          </view>
        </view>
      </view>

      <view class="journey-body">
        <SegmentControl
          :tabs="stageTabs"
          :active="activeStage"
          @change="selectStage"
        />

        <text class="section-title stage-section-title">
          本阶段发送素材
        </text>
        <button class="reset-btn content-card" @click="showMaterialDetail = true">
          <view class="content-card__main">
            <text class="chip">
              {{ materialType }}
            </text>
            <text class="content-card__title">
              {{ materialTitle }}
            </text>
            <text class="content-card__desc">
              {{ materialPreview }}
            </text>
          </view>
          <view class="open-rate">
            <image
              class="open-rate__eye"
              mode="aspectFit"
              src="/static/journey/icon-eye.svg"
            />
            <text>84%</text>
            <image
              class="open-rate__chevron"
              mode="aspectFit"
              src="/static/journey/icon-chevron-right.svg"
            />
          </view>
        </button>

        <view class="section-head">
          <text class="section-title">
            客户列表
          </text>
          <text class="section-head__count">
            72 已读 / 86 人
          </text>
        </view>

        <view class="list-card">
          <common-demo-customer-row
            v-for="(name, index) in journeyCustomers"
            :key="name"
            :customer="{ ...customers[index % customers.length], name, avatar: name.slice(0, 1) }"
          />
        </view>
      </view>

      <common-button-fixed-bottom bg-color="#fff">
        <view class="fixed-action-wrap">
          <button class="reset-btn fixed-primary" @click="showSheet = true">
            批量发送
          </button>
        </view>
      </common-button-fixed-bottom>

      <view v-if="showSheet" class="sheet-mask" @click.self="showSheet = false">
        <view class="sheet">
          <view class="sheet__head">
            <view>
              <text class="sheet__title">
                批量发送 · {{ batchStageTitle }}
              </text>
              <text class="sheet__subtitle">
                共 {{ journeyBatchCustomers.length }} 位客户
              </text>
            </view>
            <button class="reset-btn sheet__close" aria-label="关闭" @click="showSheet = false">
              <image class="sheet__close-icon" mode="aspectFit" src="/static/journey/icon-sheet-close.svg" />
            </button>
          </view>

          <view class="preview-card">
            <text class="preview-card__label">
              发送素材预览
            </text>
            <text class="preview-card__title">
              {{ batchMaterialTitle }}
            </text>
            <text class="preview-card__desc">
              {{ batchMaterialPreview }}
            </text>
          </view>

          <button class="reset-btn select-row" @click="toggleAll">
            <view class="check-box" :class="{ 'is-checked': selected.length === journeyBatchCustomers.length }">
              <image
                v-if="selected.length === journeyBatchCustomers.length"
                class="check-box__icon"
                mode="aspectFit"
                src="/static/journey/icon-checkbox-check.svg"
              />
            </view>
            <text class="select-row__label">
              全选
            </text>
            <text class="select-row__count">
              已选
              <text class="select-row__strong">
                {{ selected.length }}
              </text>
              人
            </text>
          </button>

          <scroll-view class="sheet-list" scroll-y :show-scrollbar="false">
            <button
              v-for="(customer, index) in journeyBatchCustomers"
              :key="customer.name"
              class="reset-btn sheet-customer"
              @click="toggleCustomer(index)"
            >
              <view class="check-box" :class="{ 'is-checked': selected.includes(index) }">
                <image
                  v-if="selected.includes(index)"
                  class="check-box__icon"
                  mode="aspectFit"
                  src="/static/journey/icon-checkbox-check.svg"
                />
              </view>
              <view class="sheet-customer__avatar">
                {{ customer.avatar }}
              </view>
              <text class="sheet-customer__name">
                {{ customer.name }}
              </text>
              <text v-if="customer.tag" class="sheet-customer__tag">
                {{ customer.tag }}
              </text>
            </button>
            <view class="sheet-list__spacer" />
          </scroll-view>

          <common-button-fixed-bottom bg-color="#fff" :z-index="131">
            <view class="sheet-action-wrap">
              <button class="reset-btn sheet-primary" @click="confirmSend">
                确认发送 {{ selected.length }} 人
              </button>
            </view>
          </common-button-fixed-bottom>
        </view>
      </view>

      <view v-if="showMaterialDetail" class="sheet-mask" @click.self="showMaterialDetail = false">
        <view class="material-sheet">
          <view class="material-sheet__head">
            <view>
              <text class="material-sheet__title">
                素材详情
              </text>
              <text class="material-sheet__chip">
                {{ materialType }}
              </text>
            </view>
            <button class="reset-btn material-sheet__close" aria-label="关闭" @click="showMaterialDetail = false">
              <image
                class="sheet__close-icon"
                mode="aspectFit"
                src="/static/journey/icon-sheet-close.svg"
              />
            </button>
          </view>

          <scroll-view class="material-sheet__scroll" scroll-y :show-scrollbar="false">
            <view class="material-detail-card">
              <text class="material-detail-card__title">
                为什么说百万医疗险是家庭必备？
              </text>
              <text class="material-detail-card__copy">
                {{ detailCopy }}
              </text>
              <text class="material-detail-card__copy material-detail-card__copy--second">
                {{ detailCopySecond }}
              </text>
            </view>

            <view class="material-metrics">
              <view class="material-metric">
                <image
                  class="material-metric__icon"
                  mode="aspectFit"
                  src="/static/journey/icon-eye-metric.svg"
                />
                <text class="metric-strong">
                  72
                </text>
                <text>人已读</text>
              </view>
              <text class="material-metrics__divider">
                |
              </text>
              <view class="material-metric">
                <image
                  class="material-metric__icon"
                  mode="aspectFit"
                  src="/static/journey/icon-send-users.svg"
                />
                <text>共发送</text>
                <text class="metric-strong">
                  86
                </text>
                <text>人</text>
              </view>
              <text class="material-metrics__divider">
                |
              </text>
              <view class="material-metric">
                <text class="metric-strong is-blue">
                  84%
                </text>
                <text>打开</text>
              </view>
            </view>

            <view class="material-progress">
              <view class="material-progress__head">
                <text>
                  素材打开率
                </text>
                <text>
                  84%
                </text>
              </view>
              <view class="material-progress__track">
                <view class="material-progress__bar" />
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.journey-page {
  min-height: 100vh;
  background: #fff;
}

.journey-page :deep(.demo-page),
.journey-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #fff;
}

.journey-hero {
  height: 163px;
  padding: 16px 18px 0;
  border-bottom: 1px solid #eee;
  background: #fff;
  box-sizing: border-box;
}

.journey-hero__title,
.journey-hero__subtitle,
.stats__number,
.stats__label,
.section-title,
.content-card__title,
.content-card__desc,
.section-head__count,
.sheet__title,
.sheet__subtitle,
.preview-card__label,
.preview-card__title,
.preview-card__desc,
.sheet-customer__name,
.material-sheet__title,
.material-sheet__chip,
.material-detail-card__title,
.material-detail-card__copy {
  display: block;
}

.journey-hero__title {
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  color: #000;
}

.journey-hero__subtitle {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 337px;
  margin-top: 18px;
  margin-left: 1px;
}

.stats__item {
  height: 64px;
  padding-top: 10px;
  border-radius: 14px;
  background: #f9f9fb;
  text-align: center;
  box-sizing: border-box;
}

.stats__number {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: #333;
}

.stats__label {
  margin-top: 3px;
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
  color: #999;
}

.journey-body {
  padding: 10px 20px 40px;
  background: #fff;
  box-sizing: border-box;
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: #1c1c1e;
}

.stage-section-title {
  margin-top: 10px;
  margin-left: 3px;
}

.content-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 331px;
  height: 88px;
  padding: 12px;
  margin-top: 10px;
  margin-left: 3px;
  border-radius: 14px;
  background: #f9f9fb;
  text-align: left;
  box-sizing: border-box;
}

.chip {
  display: inline-block;
  width: fit-content;
  height: 17px;
  padding: 0 5px;
  border-radius: 4px;
  background: #cbcbcb;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  color: #333;
}

.content-card__main {
  min-width: 0;
}

.content-card__title {
  overflow: hidden;
  margin-top: 9px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.content-card__desc {
  overflow: hidden;
  margin-top: 1px;
  max-width: 288px;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}

.open-rate {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 8px;
  margin-top: 3px;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
  white-space: nowrap;
  color: #999;
}

.open-rate__eye {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}

.open-rate__chevron {
  flex: 0 0 13px;
  width: 13px;
  height: 13px;
  margin-left: 4px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  margin-top: 19px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}

.section-head .section-title {
  margin-left: 3px;
}

.section-head__count {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #999;
}

.list-card {
  width: 356px;
  margin-left: -10px;
  background: #fff;
}

.list-card :deep(.customer-row) {
  min-height: 85px;
  padding: 12px 2px 12px 9px;
}

.list-card :deep(.customer-row__avatar) {
  flex-basis: 36px;
  width: 36px;
  height: 36px;
}

.list-card :deep(.customer-row__name) {
  font-size: 15px;
  line-height: 21px;
}

.list-card :deep(.customer-row__meta) {
  margin-top: 4px;
  font-size: 12px;
  line-height: 17px;
}

.list-card :deep(.customer-row__right text) {
  display: none;
}

.fixed-action-wrap {
  padding: 20px 19px 17px;
  background: #fff;
  box-sizing: border-box;
}

.fixed-primary {
  width: 337px;
  height: 48px;
  margin: 0 auto;
  border-radius: 24px;
  background: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #fff;
}

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 35%);
}

.sheet,
.material-sheet {
  position: relative;
  width: 100%;
  overflow: hidden;
  max-height: 78vh;
  border-radius: 19px 19px 0 0;
  background: #fff;
  box-sizing: border-box;
}

.sheet {
  padding-bottom: 128px;
}

.sheet__head,
.material-sheet__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 76px;
  padding: 20px 16px 13px;
  background: #fff;
  box-sizing: border-box;
}

.sheet__title,
.material-sheet__title {
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  color: #1a1a1a;
}

.sheet__subtitle {
  margin-top: 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #999;
}

.sheet__close,
.material-sheet__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
}

.sheet__close-icon {
  width: 18px;
  height: 18px;
}

.preview-card {
  height: 88px;
  padding: 13px 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background: #f9fafb;
  box-sizing: border-box;
}

.preview-card__label {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #999;
}

.preview-card__title {
  overflow: hidden;
  margin-top: 13px;
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1a1a1a;
}

.preview-card__desc {
  overflow: hidden;
  margin-top: 1px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}

.select-row,
.sheet-customer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  box-sizing: border-box;
  text-align: left;
}

.select-row {
  height: 46px;
  padding: 0 16px;
}

.check-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #333;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  box-sizing: border-box;
}

.check-box:not(.is-checked) {
  border: 1px solid #d1d5dc;
  background: #fff;
}

.check-box__icon {
  width: 11px;
  height: 11px;
}

.select-row__label {
  margin-left: 9px;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #1a1a1a;
}

.select-row__count {
  margin-left: auto;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #8e8e93;
}

.select-row__strong {
  font-weight: 600;
  color: #1a1a1a;
}

.sheet-list {
  height: calc(78vh - 346px);
  min-height: 220px;
  overflow: hidden;
}

.sheet-list :deep(.uni-scroll-view-content) {
  min-height: 100%;
  box-sizing: border-box;
}

.sheet-list__spacer {
  height: 68px;
}

.sheet-customer {
  height: 61px;
  padding: 0 16px;
}

.sheet-customer__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  margin-left: 12px;
  border-radius: 50%;
  background: #f7f7f7;
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
}

.sheet-customer__name {
  margin-left: 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #1a1a1a;
}

.sheet-customer__tag {
  height: 17px;
  padding: 0 6px;
  margin-left: 10px;
  border-radius: 5px;
  background: #f3f4f6;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: #999;
}

.sheet-action-wrap {
  padding: 25px 16px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  box-sizing: border-box;
}

.sheet-primary {
  width: 343px;
  height: 48px;
  border-radius: 24px;
  background: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #fff;
}

.material-sheet__head {
  min-height: 76px;
  border-bottom: 1px solid #f0f0f0;
}

.material-sheet__chip {
  width: fit-content;
  height: 22px;
  padding: 0 8px;
  margin-top: 5px;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 13px;
  line-height: 22px;
  color: #999;
}

.material-sheet__scroll {
  max-height: calc(78vh - 76px);
  overflow: hidden;
}

.material-sheet__scroll :deep(.uni-scroll-view-content) {
  padding-bottom: 24px;
  box-sizing: border-box;
}

.material-detail-card {
  min-height: 376px;
  margin: 24px 16px 0;
  padding: 22px 17px 0;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-sizing: border-box;
}

.material-detail-card__title {
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  color: #1a1a1a;
}

.material-detail-card__copy {
  margin-top: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
  color: #8e8e93;
}

.material-detail-card__copy--second {
  margin-top: 29px;
}

.material-metrics {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  margin: 25px 16px 0;
  border-radius: 14px;
  background: #f9f9fb;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #8e8e93;
}

.material-metric {
  display: flex;
  align-items: center;
  gap: 4px;
}

.material-metric__icon {
  width: 14px;
  height: 14px;
}

.metric-strong {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.metric-strong.is-blue {
  color: #3d7bff;
}

.material-metrics__divider {
  margin: 0 15px;
  color: #e5e7eb;
}

.material-progress {
  margin: 14px 16px 0;
}

.material-progress__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #999;
}

.material-progress__head text:last-child {
  color: #3d7bff;
}

.material-progress__track {
  height: 8px;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
  background: #f0f0f6;
}

.material-progress__bar {
  width: 84%;
  height: 100%;
  border-radius: 4px;
  background: #4a6cf7;
}
</style>
