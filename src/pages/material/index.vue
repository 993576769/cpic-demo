<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const contentTypes = ['教育险', '医疗险', '高净值', '家庭保障内容'];
const needs = ['欢迎新顾客', '发送产品介绍', '刺激复购', '节日祝福', '朋友圈'];
</script>

<template>
  <common-demo-page title="素材库">
    <text class="section-title">
      内容推荐
    </text>
    <div class="grid">
      <button
        v-for="item in contentTypes"
        :key="item"
        class="reset-btn tile"
        @click="item === '教育险' ? nav.nav('/material/content?type=education') : showToast('建设中')"
      >
        <text>{{ item }}</text>
        <span>查看列表 ›</span>
      </button>
    </div>

    <text class="section-title">
      你可能会需要
    </text>
    <div class="grid grid--small">
      <button
        v-for="item in needs"
        :key="item"
        class="reset-btn tile"
        @click="showToast('建设中')"
      >
        <text>{{ item }}</text>
        <span>查看素材 ›</span>
      </button>
    </div>

    <text class="section-title">
      别人也在用
    </text>
    <view class="rank-card">
      <text>使用最多的图片</text>
      <text>最多人加入常用</text>
      <text>最多点击的链接</text>
      <text>发送最多的产品系列</text>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.section-title {
  display: block;
  margin: 8px 2px 10px;
  font-size: 16px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;
}

.grid--small {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tile {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  min-height: 88px;
  padding: 14px;
  border-radius: 8px;
  background: #fff;
  text-align: left;
}

.tile text,
.tile span,
.rank-card text {
  display: block;
}

.tile text {
  font-size: 15px;
  font-weight: 600;
}

.tile span {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.rank-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border-radius: 8px;
  background: #f0f0f0;
}

.rank-card text {
  padding: 16px;
  background: #fff;
  font-size: 13px;
}
</style>
