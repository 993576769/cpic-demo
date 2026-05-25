<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const content = ref('');
const state = ref<'upload' | 'done'>('upload');
const openCards = ref(['profile', 'needs', 'risk', 'next']);

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

function toggleCard(id: string) {
  openCards.value = openCards.value.includes(id)
    ? openCards.value.filter(item => item !== id)
    : [...openCards.value, id];
}
</script>

<template>
  <common-demo-page :title="state === 'done' ? '拜访记录分析' : '上传拜访记录'" :padded="state === 'done'">
    <template v-if="state === 'upload'">
      <div class="upload-space"></div>
      <div class="composer padding-bottom-safe-area">
        <div class="composer__options">
          <button class="reset-btn" @click="showToast('建设中')">
            📷 图片
          </button>
          <button class="reset-btn" @click="showToast('建设中')">
            📄 文件
          </button>
        </div>
        <div class="composer__input-row">
          <button class="reset-btn composer__close" @click="nav.goHome()">
            ×
          </button>
          <input v-model="content" class="composer__input" placeholder="输入内容" />
          <button class="reset-btn composer__voice">
            🎙
          </button>
          <button class="reset-btn composer__send" :class="{ 'is-active': canSend }" @click="submit">
            ↑
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <view class="analysis-card">
        <text class="section-title">
          与王女士的对话（5月20日）
        </text>
        <text class="bubble">
          王女士：孩子刚上小学，最近想了解儿童重疾和教育金。
        </text>
        <text class="bubble bubble--mine">
          我：可以按家庭预算先做一份组合方案。
        </text>
      </view>

      <view
        v-for="card in [
          ['profile', '👤 客户画像', '32岁女性，三线家庭，职业白领，年收入18万左右，注重家庭保障。'],
          ['needs', '🎯 核心需求', '为孩子配置重疾保障，预算5000元/年，兼顾重疾、医疗、理财需求。'],
          ['risk', '⚠️ 风险点', '意外保障偏低，理赔潜在门槛高，增额终身寿覆盖不足。'],
          ['next', '✅ 下一步建议', '建议先关注意外和住院医疗保障，并重点讲解重疾免责与条款细节。'],
        ]"
        :key="card[0]"
        class="analysis-card"
      >
        <button class="reset-btn analysis-card__header" @click="toggleCard(card[0])">
          <text class="section-title">
            {{ card[1] }}
          </text>
          <span>{{ openCards.includes(card[0]) ? '^' : 'v' }}</span>
        </button>
        <text v-if="openCards.includes(card[0])" class="analysis-card__text">
          {{ card[2] }}
        </text>
      </view>

      <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="nav.nav('/customers/wang/followup')">
        生成跟进方案 ✨
      </button>
    </template>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.upload-space {
  min-height: calc(100vh - 230px);
}

.composer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
}

.composer__options {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.composer__options button {
  height: 34px;
  padding: 0 12px;
  border-radius: 17px;
  background: #f5f5f5;
  font-size: 13px;
}

.composer__input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.composer__close,
.composer__voice,
.composer__send {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 18px;
}

.composer__input {
  flex: 1;
  height: 38px;
  padding: 0 12px;
  border-radius: 19px;
  background: #f7f7f7;
  font-size: 14px;
}

.composer__send {
  background: #d1d5dc;
  color: #fff;
}

.composer__send.is-active {
  background: #111;
}

.analysis-card {
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.section-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
}

.bubble,
.analysis-card__text {
  display: block;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f7f7f7;
  font-size: 13px;
  line-height: 20px;
  color: #4a5565;
}

.bubble--mine {
  background: #111;
  color: #fff;
}

.analysis-card__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
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
