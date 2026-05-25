<template>
  <div class="main-page">
    <div class="main-page__header">
      <div class="main-page__eyebrow">
        智能工具箱
      </div>
      <h1 class="main-page__title">
        工具
      </h1>
      <p class="main-page__desc">
        拜访记录分析、产品查询和素材工具会在后续任务中接入。
      </p>
    </div>

    <common-tab-bar active="tools" />
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
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 18px;
  color: #777;
}

.main-page__title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #111;
}

.main-page__desc {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}
</style>
