<template>
  <common-demo-page title="数据" tab-bar="data" :show-back="false">
    <view class="placeholder-card">
      <text class="placeholder-card__title">
        数据
      </text>
      <text class="placeholder-card__desc">
        建设中
      </text>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.placeholder-card {
  padding: 28px 18px;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}

.placeholder-card__title,
.placeholder-card__desc {
  display: block;
}

.placeholder-card__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333;
}

.placeholder-card__desc {
  margin-top: 8px;
  font-size: 13px;
  line-height: 18px;
  color: #999;
}
</style>
