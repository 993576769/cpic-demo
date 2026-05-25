<template>
  <div class="main-page">
    <div class="main-page__header">
      <div class="main-page__eyebrow">
        客户经营
      </div>
      <h1 class="main-page__title">
        顾客
      </h1>
      <p class="main-page__desc">
        顾客档案、标签筛选和四象限视图会在后续任务中接入。
      </p>
    </div>

    <common-tab-bar active="customers" />
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
