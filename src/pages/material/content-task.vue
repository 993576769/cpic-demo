<template>
  <common-demo-page title="内容详情页">
    <view class="content-card">
      <text class="title">
        从幼儿园到大学，大概要花多少钱？
      </text>
      <text class="desc">
        中产家庭、关注孩子教育规划
      </text>
      <text class="link">
        查看内容 ›
      </text>
    </view>
    <div class="stats">
      <div>
        <text>72</text>
        <span>人已读</span>
      </div>
      <div>
        <text>86</text>
        <span>共发送</span>
      </div>
      <div>
        <text class="blue">
          84%
        </text>
        <span>打开</span>
      </div>
    </div>
    <view class="content-card">
      <text class="section-title">
        涉及保险产品
      </text>
      <text class="desc">
        教育金储备方案 / 儿童重疾保障计划
      </text>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.content-card,
.stats {
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.title,
.desc,
.link,
.section-title {
  display: block;
}

.title,
.section-title {
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
}

.desc,
.link {
  margin-top: 10px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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

.blue {
  color: #3d7bff;
}
</style>
