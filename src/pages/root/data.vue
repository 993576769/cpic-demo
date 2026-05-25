<template>
  <div class="main-page">
    <div class="main-page__header">
      <text class="main-page__eyebrow">
        经营洞察
      </text>
      <text class="main-page__title">
        数据
      </text>
      <text class="main-page__desc">
        业绩看板、客户分析和转化漏斗会在后续任务中接入。
      </text>
    </div>

    <common-tab-bar active="data" />
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  min-height: 100vh;
  padding: 56px 20px 84px;
  background: #f5f5f7;
  box-sizing: border-box;
}

.main-page__header {
  padding: 20px;
  background: $white-color;
  border-radius: 8px;
}

.main-page__eyebrow {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 18px;
  color: #777;
}

.main-page__title {
  display: block;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #111;
}

.main-page__desc {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}
</style>
