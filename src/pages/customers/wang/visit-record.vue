<script setup lang="ts">
import { nav } from '@/utils/nav';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type AnalysisId = 'profile' | 'needs' | 'risk' | 'next';
type AnalysisIcon = 'user' | 'target' | 'warning' | 'check';

const analysisIconMap: Record<AnalysisIcon, string> = {
  user: '/static/customers/visit-record/icon-user-filled.svg',
  target: '/static/customers/visit-record/icon-target.svg',
  warning: '/static/customers/visit-record/icon-warning.svg',
  check: '/static/customers/visit-record/icon-check-circle.svg',
};

const content = ref('');
const state = ref<'upload' | 'done'>('upload');
const openCards = ref<AnalysisId[]>(['profile', 'needs', 'risk', 'next']);
const showFullDialog = ref(false);
const pageTitle = computed(() => state.value === 'upload' ? '上传拜访记录' : '拜访记录分析');

const analysisCards: Array<{
  id: AnalysisId;
  title: string;
  desc: string;
  icon: AnalysisIcon;
}> = [
  {
    id: 'profile',
    title: '客户画像',
    desc: '32岁女性，三线家庭，职业白领，年收入18万左右，注重家庭保障。',
    icon: 'user',
  },
  {
    id: 'needs',
    title: '核心需求',
    desc: '为孩子配置重疾保障，预算5000元/年，兼顾重疾、医疗、理财需求。',
    icon: 'target',
  },
  {
    id: 'risk',
    title: '风险点',
    desc: '意外保障偏低，理赔潜在门槛高，增额终身寿覆盖不足。',
    icon: 'warning',
  },
  {
    id: 'next',
    title: '下一步建议',
    desc: '建议先关注意外和住院医疗保障，并重点讲解重疾免责与条款细节。',
    icon: 'check',
  },
];

function syncStateFromQuery(query?: Record<string, unknown>) {
  state.value = query?.state === 'done' ? 'done' : 'upload';
}

onLoad((query) => {
  syncStateFromQuery(query);
});

onShow(() => {
  // #ifdef H5
  syncStateFromHash();
  // #endif
});

function syncStateFromHash() {
  // #ifdef H5
  const queryString = window.location.hash.split('?')[1] ?? '';
  const params = new URLSearchParams(queryString);
  syncStateFromQuery({ state: params.get('state') });
  // #endif
}

onMounted(() => {
  // #ifdef H5
  syncStateFromHash();
  window.addEventListener('hashchange', syncStateFromHash);
  // #endif
});

onBeforeUnmount(() => {
  // #ifdef H5
  window.removeEventListener('hashchange', syncStateFromHash);
  // #endif
});

const canSend = computed(() => content.value.trim().length > 0);

function submit() {
  if (!canSend.value) {
    return;
  }

  state.value = 'done';
}

function completeUpload() {
  state.value = 'done';
}

function toggleCard(id: AnalysisId) {
  openCards.value = openCards.value.includes(id)
    ? openCards.value.filter(item => item !== id)
    : [...openCards.value, id];
}
</script>

<template>
  <view class="visit-record-page">
    <common-demo-page :title="pageTitle" :padded="false">
      <template v-if="state === 'upload'">
        <view class="upload-page-space" />

        <common-button-fixed-bottom bg-color="#fff">
          <view class="upload-panel">
            <view class="upload-options">
              <button class="reset-btn upload-option" @click="completeUpload">
                <text class="upload-option__text">
                  图片
                </text>
              </button>
              <button class="reset-btn upload-option" @click="completeUpload">
                <text class="upload-option__text">
                  文件
                </text>
              </button>
            </view>

            <view class="composer">
              <button class="reset-btn composer__add" @click="completeUpload">
                <image class="composer__add-icon" mode="aspectFit" src="/static/customers/visit-record/icon-composer-add.svg" />
              </button>
              <view class="composer__input-wrap">
                <input v-model="content" class="composer__input" placeholder="输入内容" />
                <button class="reset-btn composer__voice" @click="completeUpload">
                  <image class="composer__voice-icon" mode="aspectFit" src="/static/customers/visit-record/icon-voice.svg" />
                </button>
                <button class="reset-btn composer__send" :class="{ 'is-active': canSend }" @click="submit">
                  <image class="composer__send-icon" mode="aspectFit" src="/static/customers/visit-record/icon-send-arrow.svg" />
                </button>
              </view>
            </view>
          </view>
        </common-button-fixed-bottom>
      </template>

      <template v-else>
        <view class="analysis-content">
          <view class="dialog-card">
            <view class="dialog-card__header">
              <text class="dialog-card__title">
                与王女士的对话（5月20日）
              </text>
              <button class="reset-btn dialog-card__link" @click="showFullDialog = !showFullDialog">
                查看完整记录
                <image class="dialog-card__chevron" mode="aspectFit" src="/static/customers/visit-record/icon-chevron-right.svg" />
              </button>
            </view>
            <text class="dialog-line">
              <text class="dialog-line__speaker">
                王女士：
              </text>
              最近感冒发烧快好了就饮食忌口完，我也想了解下。
            </text>
            <text class="dialog-line">
              <text class="dialog-line__speaker">
                我：
              </text>
              可以呀，您主要是想了解哪些保障或配置？
            </text>
            <text class="dialog-line">
              <text class="dialog-line__speaker">
                王女士：
              </text>
              两方面都想兼顾，不知道哪种更合适…
            </text>
            <text class="dialog-line">
              <text class="dialog-line__speaker">
                我：
              </text>
              明白，建议我先梳理的保障缺口下…
            </text>
            <template v-if="showFullDialog">
              <text class="dialog-line">
                <text class="dialog-line__speaker">
                  王女士：
                </text>
                主要还是担心孩子生病住院，预算一年大概五千左右。
              </text>
              <text class="dialog-line">
                <text class="dialog-line__speaker">
                  我：
                </text>
                可以，我会先按重疾、医疗和意外保障拆开看，再给您组合建议。
              </text>
            </template>
          </view>

          <text class="analysis-title">
            分析结果
          </text>

          <view class="analysis-result-card">
            <view
              v-for="card in analysisCards"
              :key="card.id"
              class="analysis-item"
              :class="{ 'is-open': openCards.includes(card.id) }"
            >
              <button class="reset-btn analysis-item__header" @click="toggleCard(card.id)">
                <image
                  class="analysis-icon"
                  mode="aspectFit"
                  :src="analysisIconMap[card.icon]"
                />
                <view class="analysis-item__copy">
                  <text class="analysis-item__title">
                    {{ card.title }}
                  </text>
                  <text v-if="openCards.includes(card.id)" class="analysis-item__desc">
                    {{ card.desc }}
                  </text>
                </view>
                <image
                  class="analysis-item__chevron"
                  :class="{ 'is-closed': !openCards.includes(card.id) }"
                  mode="aspectFit"
                  src="/static/customers/visit-record/icon-chevron-down.svg"
                />
              </button>
            </view>
          </view>
        </view>

        <common-button-fixed-bottom bg-color="#fff">
          <view class="analysis-bottom">
            <button class="reset-btn generate-button" @click="nav.nav('/customers/wang/followup')">
              <text>生成跟进方案</text>
              <image
                class="sparkle-icon"
                mode="aspectFit"
                src="/static/customers/visit-record/icon-sparkle.svg"
              />
            </button>
          </view>
        </common-button-fixed-bottom>
      </template>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.visit-record-page {
  min-height: 100vh;
  background: #f8f8f8;
}

.visit-record-page :deep(.demo-page),
.visit-record-page :deep(.demo-page__body) {
  width: 375px;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  background: #f8f8f8;
}

.visit-record-page :deep(.fixed-footer) {
  left: 50%;
  width: 375px;
  max-width: 100vw;
  transform: translateX(-50%);
}

.upload-page-space {
  min-height: calc(100vh - 250px);
}

.upload-panel {
  padding-top: 21px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border-radius: 16px 16px 0 0;
  background: #fff;
  box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.upload-options {
  display: flex;
  gap: 10px;
  margin: 0 0 27px;
}

.upload-option {
  flex-direction: column;
  width: 111px;
  height: 78px;
  border-radius: 12px;
  background: #f8f8f8;
  color: #000;
}

.upload-option__text {
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
}

.composer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
}

.composer__add {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f2f2f2;
}

.composer__add-icon {
  width: 16px;
  height: 16px;
}

.composer__input-wrap {
  display: flex;
  align-items: center;
  flex: 1;
  height: 38px;
  padding-left: 18px;
  border-radius: 100px;
  background: #f2f2f2;
  box-sizing: border-box;
}

.composer__input {
  flex: 1;
  min-width: 0;
  height: 38px;
  font-size: 13px;
  color: #333;
}

.composer__voice,
.composer__send {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.composer__voice {
  background: transparent;
}

.composer__voice-icon {
  width: 16px;
  height: 16px;
}

.composer__send {
  margin-right: 5px;
  background: #d5d5d5;
}

.composer__send.is-active {
  background: #1c1c1e;
}

.composer__send-icon {
  width: 15px;
  height: 14px;
}

.analysis-content {
  padding: 15px 17px 96px;
}

.dialog-card {
  width: 341px;
  min-height: 157px;
  padding: 11px 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-sizing: border-box;
}

.dialog-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 21px;
  margin-bottom: 8px;
}

.dialog-card__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #0a0a0a;
}

.dialog-card__link {
  font-size: 12px;
  line-height: 18px;
  color: #888;
}

.dialog-card__chevron {
  width: 12px;
  height: 12px;
  margin-left: 5px;
}

.dialog-line {
  display: flex;
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: #555;
}

.dialog-card__header + .dialog-line {
  margin-top: 0;
}

.dialog-line__speaker {
  flex: 0 0 auto;
  margin-right: 4px;
  color: #888;
}

.analysis-title {
  display: block;
  margin: 14px 0 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #0a0a0a;
}

.analysis-result-card {
  overflow: hidden;
  width: 341px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-sizing: border-box;
}

.analysis-item {
  position: relative;
}

.analysis-item::after {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 1px;
  background: #f0f0f0;
  content: '';
}

.analysis-item:last-child::after {
  display: none;
}

.analysis-item__header {
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 13px 12px 14px;
  text-align: left;
}

.analysis-item.is-open .analysis-item__header {
  align-items: flex-start;
  min-height: 84px;
  padding: 11px 12px 10px;
}

.analysis-icon {
  flex: 0 0 17px;
  width: 17px;
  height: 17px;
  margin: 0 10px 0 0;
}

.analysis-item.is-open .analysis-icon {
  margin-top: 1px;
}

.analysis-item__copy {
  flex: 1;
  min-width: 0;
}

.analysis-item__title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #111;
}

.analysis-item__desc {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18.6px;
  color: #666;
}

.analysis-item__chevron {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 0;
  margin-left: 10px;
}

.analysis-item.is-open .analysis-item__chevron {
  margin-top: 2px;
}

.analysis-item__chevron.is-closed {
  transform: rotate(180deg);
}

.analysis-bottom {
  padding-top: 10px;
  padding-right: 17px;
  padding-bottom: 8px;
  padding-left: 17px;
  background: #fff;
  box-sizing: border-box;
}

.generate-button {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #1c1c1e;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: #fff;
}

.sparkle-icon {
  width: 16px;
  height: 16px;
  margin-left: 12px;
}
</style>
