<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

type AnalysisId = 'profile' | 'needs' | 'risk' | 'next';

const content = ref('');
const state = ref<'upload' | 'done'>('upload');
const openCards = ref<AnalysisId[]>(['profile', 'needs', 'risk', 'next']);

const analysisCards: Array<{
  id: AnalysisId;
  title: string;
  desc: string;
  icon: 'user' | 'target' | 'warning' | 'check';
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

onLoad((query) => {
  if (query?.state === 'done') {
    state.value = 'done';
  }
});

const canSend = computed(() => content.value.trim().length > 0);

function submit() {
  if (!canSend.value) {
    return;
  }

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
    <common-demo-page title="" :show-title="false" :padded="false">
      <template v-if="state === 'upload'">
        <common-page-heading title="上传拜访记录" size="plain" />

        <view class="upload-page-space" />

        <common-button-fixed-bottom bg-color="#fff">
          <view class="upload-panel">
            <view class="upload-options">
              <button class="reset-btn upload-option" @click="showToast('建设中')">
                <view class="upload-option__icon upload-option__icon--image" />
                <text class="upload-option__text">
                  图片
                </text>
              </button>
              <button class="reset-btn upload-option" @click="showToast('建设中')">
                <view class="upload-option__icon upload-option__icon--file" />
                <text class="upload-option__text">
                  文件
                </text>
              </button>
            </view>

            <view class="composer">
              <button class="reset-btn composer__close" @click="nav.nav('/tools')">
                <view class="composer__close-icon" />
              </button>
              <view class="composer__input-wrap">
                <input v-model="content" class="composer__input" placeholder="输入内容" />
                <button class="reset-btn composer__voice" @click="showToast('建设中')">
                  <view class="composer__voice-icon" />
                </button>
                <button class="reset-btn composer__send" :class="{ 'is-active': canSend }" @click="submit">
                  <view class="composer__send-icon" />
                </button>
              </view>
            </view>
          </view>
        </common-button-fixed-bottom>
      </template>

      <template v-else>
        <common-page-heading title="拜访记录分析" size="plain" />

        <view class="analysis-content">
          <view class="dialog-card">
            <view class="dialog-card__header">
              <text class="dialog-card__title">
                与王女士的对话（5月20日）
              </text>
              <button class="reset-btn dialog-card__link" @click="showToast('建设中')">
                查看完整记录
                <text class="dialog-card__chevron">
                  >
                </text>
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
          </view>

          <text class="analysis-title">
            分析结果
          </text>

          <view class="analysis-result-card">
            <view
              v-for="card in analysisCards"
              :key="card.id"
              class="analysis-item"
            >
              <button class="reset-btn analysis-item__header" @click="toggleCard(card.id)">
                <view class="analysis-icon" :class="`analysis-icon--${card.icon}`" />
                <view class="analysis-item__copy">
                  <text class="analysis-item__title">
                    {{ card.title }}
                  </text>
                  <text v-if="openCards.includes(card.id)" class="analysis-item__desc">
                    {{ card.desc }}
                  </text>
                </view>
                <view class="analysis-item__chevron" :class="{ 'is-closed': !openCards.includes(card.id) }" />
              </button>
            </view>
          </view>
        </view>

        <common-button-fixed-bottom bg-color="#fff">
          <view class="analysis-bottom">
            <button class="reset-btn generate-button" @click="nav.nav('/customers/wang/followup')">
              <text>生成跟进方案</text>
              <view class="sparkle-icon" />
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
  min-height: 100vh;
  background: #f8f8f8;
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
  margin: 0 10px 36px;
}

.upload-option {
  flex-direction: column;
  width: 111px;
  height: 78px;
  border-radius: 12px;
  background: #f8f8f8;
  color: #000;
}

.upload-option__icon {
  position: relative;
  width: 22px;
  height: 22px;
  margin-bottom: 8px;
}

.upload-option__icon--image {
  border: 1.5px solid #999;
  border-radius: 4px;
}

.upload-option__icon--image::before {
  position: absolute;
  left: 4px;
  bottom: 4px;
  width: 12px;
  height: 7px;
  border-radius: 1px;
  background: linear-gradient(135deg, transparent 45%, #999 46%, #999 62%, transparent 63%);
  content: '';
}

.upload-option__icon--file {
  border: 1.5px solid #999;
  border-radius: 3px;
}

.upload-option__icon--file::before,
.upload-option__icon--file::after {
  position: absolute;
  left: 4px;
  right: 4px;
  height: 1.5px;
  background: #999;
  content: '';
}

.upload-option__icon--file::before {
  top: 7px;
}

.upload-option__icon--file::after {
  top: 12px;
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

.composer__close {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f2f2f2;
}

.composer__close-icon {
  position: relative;
  width: 18px;
  height: 18px;
}

.composer__close-icon::before,
.composer__close-icon::after {
  position: absolute;
  top: 8px;
  left: 0;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: #333;
  content: '';
}

.composer__close-icon::before {
  transform: rotate(45deg);
}

.composer__close-icon::after {
  transform: rotate(-45deg);
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
  position: relative;
  width: 14px;
  height: 20px;
}

.composer__voice-icon::before {
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: 2px solid #999;
  border-radius: 6px;
  content: '';
}

.composer__voice-icon::after {
  position: absolute;
  left: 1px;
  top: 9px;
  width: 12px;
  height: 8px;
  border-bottom: 2px solid #999;
  border-left: 2px solid #999;
  border-right: 2px solid #999;
  border-radius: 0 0 8px 8px;
  content: '';
}

.composer__send {
  margin-right: 5px;
  background: #d5d5d5;
}

.composer__send.is-active {
  background: #1c1c1e;
}

.composer__send-icon {
  position: relative;
  width: 14px;
  height: 15px;
}

.composer__send-icon::before,
.composer__send-icon::after {
  position: absolute;
  background: #f2f2f2;
  content: '';
}

.composer__send-icon::before {
  left: 6px;
  top: 2px;
  width: 2px;
  height: 13px;
  border-radius: 2px;
}

.composer__send-icon::after {
  left: 2px;
  top: 2px;
  width: 9px;
  height: 9px;
  border-left: 2px solid #f2f2f2;
  border-top: 2px solid #f2f2f2;
  background: transparent;
  transform: rotate(45deg);
}

.analysis-content {
  padding: 80px 14px 122px;
}

.dialog-card {
  padding: 24px 26px 21px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
}

.dialog-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.dialog-card__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #0a0a0a;
}

.dialog-card__link,
.dialog-card__chevron {
  font-size: 12px;
  line-height: 18px;
  color: #999;
}

.dialog-card__chevron {
  margin-left: 5px;
}

.dialog-line {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  line-height: 22px;
  color: #777;
}

.dialog-line__speaker {
  color: #777;
}

.analysis-title {
  display: block;
  margin: 33px 0 22px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #0a0a0a;
}

.analysis-result-card {
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #fff;
}

.analysis-item {
  margin: 0 26px;
  border-bottom: 1px solid #f0f0f0;
}

.analysis-item:last-child {
  border-bottom: 0;
}

.analysis-item__header {
  align-items: flex-start;
  width: 100%;
  min-height: 84px;
  padding: 20px 0 18px;
  text-align: left;
}

.analysis-icon {
  position: relative;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  margin: 1px 18px 0 0;
}

.analysis-icon--user::before {
  position: absolute;
  top: 0;
  left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #626262;
  content: '';
}

.analysis-icon--user::after {
  position: absolute;
  left: 1px;
  bottom: 0;
  width: 16px;
  height: 8px;
  border-radius: 8px 8px 2px 2px;
  background: #626262;
  content: '';
}

.analysis-icon--target {
  border: 2px solid #626262;
  border-radius: 50%;
  box-sizing: border-box;
}

.analysis-icon--target::before,
.analysis-icon--target::after {
  position: absolute;
  border-radius: 50%;
  content: '';
}

.analysis-icon--target::before {
  inset: 3px;
  border: 2px solid #626262;
}

.analysis-icon--target::after {
  inset: 7px;
  background: #626262;
}

.analysis-icon--warning {
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-bottom: 18px solid #626262;
  border-left: 10px solid transparent;
}

.analysis-icon--warning::before {
  position: absolute;
  left: -1px;
  top: 7px;
  width: 2px;
  height: 6px;
  background: #fff;
  content: '';
}

.analysis-icon--warning::after {
  position: absolute;
  left: -1px;
  top: 15px;
  width: 2px;
  height: 2px;
  background: #fff;
  content: '';
}

.analysis-icon--check {
  border: 2px solid #626262;
  border-radius: 50%;
  box-sizing: border-box;
}

.analysis-icon--check::before {
  position: absolute;
  left: 4px;
  top: 5px;
  width: 7px;
  height: 4px;
  border-bottom: 2px solid #626262;
  border-left: 2px solid #626262;
  content: '';
  transform: rotate(-45deg);
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
  color: #0a0a0a;
}

.analysis-item__desc {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 19px;
  color: #626262;
}

.analysis-item__chevron {
  position: relative;
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 2px;
}

.analysis-item__chevron::before {
  position: absolute;
  left: 3px;
  top: 6px;
  width: 9px;
  height: 9px;
  border-left: 2px solid #b8b8b8;
  border-top: 2px solid #b8b8b8;
  content: '';
  transform: rotate(45deg);
}

.analysis-item__chevron.is-closed::before {
  top: 2px;
  transform: rotate(-135deg);
}

.analysis-bottom {
  padding-top: 13px;
  padding-right: 17px;
  padding-bottom: 10px;
  padding-left: 17px;
  background: #fff;
  box-sizing: border-box;
}

.generate-button {
  width: 100%;
  height: 54px;
  border-radius: 14px;
  background: #1c1c1e;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #fff;
}

.sparkle-icon {
  position: relative;
  width: 16px;
  height: 16px;
  margin-left: 12px;
}

.sparkle-icon::before,
.sparkle-icon::after {
  position: absolute;
  background: #fff;
  content: '';
}

.sparkle-icon::before {
  left: 7px;
  top: 2px;
  width: 2px;
  height: 12px;
}

.sparkle-icon::after {
  left: 2px;
  top: 7px;
  width: 12px;
  height: 2px;
}
</style>
