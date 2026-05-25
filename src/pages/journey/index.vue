<script setup lang="ts">
import { customers, journeyCustomers } from '@/pages/demo-data';
import { showToast } from '@/utils/toast';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

const stages = ['D1 欢迎语', 'D3', 'D7', 'D15', 'D30'];
const activeStage = ref('D1 欢迎语');
const showSheet = ref(false);
const selected = ref(journeyCustomers.map((_, index) => index));

onLoad((query) => {
  if (query?.stage === 'D3') {
    activeStage.value = 'D3';
  }
  if (query?.sheet === 'batch-send') {
    showSheet.value = true;
  }
});

const materialTitle = computed(() => activeStage.value === 'D1 欢迎语' ? '新客户欢迎话术' : '为什么说百万医疗险是家庭必备');
const materialType = computed(() => activeStage.value === 'D1 欢迎语' ? '文字消息' : '内容落地页');
const materialPreview = computed(() => activeStage.value === 'D1 欢迎语'
  ? '您好，感谢您添加我为好友！这里有一份新客户专属欢迎礼包。'
  : '很多人觉得有社保就够了，但实际上医保报销存在很大缺口。');

function toggleCustomer(index: number) {
  selected.value = selected.value.includes(index)
    ? selected.value.filter(item => item !== index)
    : [...selected.value, index];
}

function toggleAll() {
  selected.value = selected.value.length === journeyCustomers.length ? [] : journeyCustomers.map((_, index) => index);
}

function confirmSend() {
  showSheet.value = false;
  showToast('已下发到企微，请到企业微信完成群发');
}
</script>

<template>
  <common-demo-page title="自动客户旅程" subtitle="企微批量添加好友后触发 · 5 个阶段">
    <div class="stats">
      <div><text>265</text><span>旅程总人数</span></div>
      <div><text>178</text><span>累计已读</span></div>
      <div><text>67%</text><span>平均打开率</span></div>
    </div>

    <scroll-view scroll-x class="stage-tabs">
      <button
        v-for="stage in stages"
        :key="stage"
        class="reset-btn stage-tab"
        :class="{ 'is-active': activeStage === stage }"
        @click="activeStage = stage"
      >
        {{ stage }}
      </button>
    </scroll-view>

    <view class="content-card">
      <text class="chip">
        {{ materialType }}
      </text>
      <text class="content-card__title">
        {{ materialTitle }}
      </text>
      <text class="content-card__desc">
        {{ materialPreview }}
      </text>
      <text class="open-rate">
        84% 打开率 ›
      </text>
    </view>

    <div class="section-head">
      <text>客户列表</text>
      <span>72 已读 / 86 人</span>
    </div>
    <view class="list-card">
      <common-demo-customer-row
        v-for="(name, index) in journeyCustomers"
        :key="name"
        :customer="{ ...customers[index % customers.length], name, avatar: name.slice(0, 1) }"
      />
    </view>

    <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="showSheet = true">
      批量发送
    </button>

    <div v-if="showSheet" class="sheet-mask" @click.self="showSheet = false">
      <div class="sheet padding-bottom-safe-area">
        <button class="reset-btn sheet__close" @click="showSheet = false">
          ×
        </button>
        <text class="sheet__title">
          批量发送 · Day1 欢迎语
        </text>
        <text class="sheet__subtitle">
          共 6 位客户
        </text>
        <view class="preview-card">
          <text>新客户专属欢迎礼包</text>
          <span>{{ materialPreview }}</span>
        </view>
        <button class="reset-btn select-row" @click="toggleAll">
          ✓ 全选
          <span>已选 {{ selected.length }} 人</span>
        </button>
        <button
          v-for="(name, index) in journeyCustomers"
          :key="name"
          class="reset-btn sheet-customer"
          @click="toggleCustomer(index)"
        >
          <span :class="{ 'is-checked': selected.includes(index) }">✓</span>
          <text>{{ name }}</text>
          <em>{{ index % 2 === 0 ? '高净值' : '宝妈' }}</em>
        </button>
        <button class="reset-btn sheet-primary" @click="confirmSend">
          确认发送 {{ selected.length }} 人
        </button>
      </div>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.stats,
.content-card,
.list-card {
  border-radius: 8px;
  background: #fff;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 16px 0;
}

.stats div {
  text-align: center;
}

.stats text,
.stats span {
  display: block;
}

.stats text {
  font-size: 24px;
  font-weight: 600;
}

.stats span {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.stage-tabs {
  width: 100%;
  margin: 12px 0;
  white-space: nowrap;
}

.stage-tab {
  height: 36px;
  padding: 0 14px;
  margin-right: 8px;
  border-radius: 18px;
  background: #fff;
  font-size: 13px;
}

.stage-tab.is-active {
  background: #111;
  color: #fff;
}

.content-card {
  position: relative;
  padding: 18px;
}

.chip {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 10px;
  background: #f3f4f6;
  font-size: 11px;
  color: #666;
}

.content-card__title,
.content-card__desc,
.open-rate {
  display: block;
}

.content-card__title {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
}

.content-card__desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.open-rate {
  margin-top: 12px;
  font-size: 13px;
  color: #3d7bff;
}

.section-head {
  display: flex;
  justify-content: space-between;
  margin: 18px 2px 8px;
  font-size: 15px;
  font-weight: 600;
}

.section-head span {
  font-size: 12px;
  font-weight: 400;
  color: #666;
}

.list-card {
  padding: 0 14px;
  margin-bottom: 82px;
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

.sheet-mask {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 35%);
}

.sheet {
  position: relative;
  width: 100%;
  max-height: 78vh;
  padding: 20px 16px 12px;
  border-radius: 18px 18px 0 0;
  overflow: auto;
  background: #fff;
  box-sizing: border-box;
}

.sheet__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 22px;
}

.sheet__title,
.sheet__subtitle,
.preview-card text,
.preview-card span {
  display: block;
}

.sheet__title {
  font-size: 17px;
  font-weight: 600;
}

.sheet__subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #666;
}

.preview-card {
  padding: 14px;
  margin: 16px 0;
  border-radius: 8px;
  background: #f7f7f7;
}

.preview-card text {
  font-weight: 600;
}

.preview-card span {
  margin-top: 8px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.select-row,
.sheet-customer {
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  border-bottom: 1px solid #f0f0f0;
}

.select-row span,
.sheet-customer em {
  font-style: normal;
  font-size: 12px;
  color: #666;
}

.sheet-customer {
  justify-content: flex-start;
  gap: 10px;
}

.sheet-customer span {
  width: 20px;
  height: 20px;
  border: 1px solid #111;
  border-radius: 4px;
  color: transparent;
  text-align: center;
  line-height: 20px;
}

.sheet-customer span.is-checked {
  background: #111;
  color: #fff;
}

.sheet-customer text {
  flex: 1;
  text-align: left;
}

.sheet-primary {
  width: 100%;
  height: 48px;
  margin-top: 14px;
  border-radius: 14px;
  background: #111;
  font-size: 15px;
  color: #fff;
}
</style>
