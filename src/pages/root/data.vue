<template>
  <common-demo-page title="数据" tab-bar="data" :show-back="false">
    <view class="hero-card">
      <text class="hero-card__eyebrow">
        本月经营概览
      </text>
      <text class="hero-card__value">
        ¥128,000
      </text>
      <text class="hero-card__desc">
        已转化年化保费 · 较上月 +18%
      </text>
    </view>

    <div class="metric-grid">
      <view v-for="item in [['32', '维护客户'], ['12', '高热客户'], ['5', '待跟进'], ['84%', '内容打开率']]" :key="item[1]" class="metric-card">
        <text>{{ item[0] }}</text>
        <span>{{ item[1] }}</span>
      </view>
    </div>

    <view class="content-card">
      <text class="section-title">
        转化漏斗
      </text>
      <div v-for="item in [['触达客户', '86', 100], ['已读内容', '72', 84], ['产生咨询', '21', 24], ['预约面谈', '8', 9]]" :key="item[0]" class="funnel-row">
        <div class="funnel-row__label">
          <text>{{ item[0] }}</text>
          <span>{{ item[1] }}</span>
        </div>
        <div class="funnel-row__track">
          <div :style="{ width: `${item[2]}%` }"></div>
        </div>
      </div>
    </view>

    <view class="content-card">
      <text class="section-title">
        客户分布
      </text>
      <div class="segment-row">
        <span>高热高价客户</span>
        <text>265</text>
      </div>
      <div class="segment-row">
        <span>高热低价客户</span>
        <text>178</text>
      </div>
      <div class="segment-row">
        <span>低热高价客户</span>
        <text>265</text>
      </div>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.hero-card,
.metric-card,
.content-card {
  border-radius: 8px;
  background: #fff;
}

.hero-card {
  padding: 22px 18px;
}

.hero-card__eyebrow,
.hero-card__value,
.hero-card__desc,
.section-title {
  display: block;
}

.hero-card__eyebrow {
  font-size: 13px;
  color: #666;
}

.hero-card__value {
  margin-top: 12px;
  font-size: 34px;
  font-weight: 700;
  line-height: 42px;
}

.hero-card__desc {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.metric-card {
  padding: 16px;
}

.metric-card text,
.metric-card span {
  display: block;
}

.metric-card text {
  font-size: 26px;
  font-weight: 600;
}

.metric-card span {
  margin-top: 6px;
  font-size: 12px;
  color: #666;
}

.content-card {
  padding: 18px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.funnel-row {
  margin-top: 14px;
}

.funnel-row__label,
.segment-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.funnel-row__track {
  height: 8px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 8px;
  background: #f0f0f0;
}

.funnel-row__track div {
  height: 100%;
  border-radius: 8px;
  background: #111;
}

.segment-row {
  padding: 13px 0;
  border-bottom: 1px solid #f0f0f0;
}

.segment-row:last-child {
  border-bottom: 0;
}

.segment-row text {
  font-weight: 600;
}
</style>
