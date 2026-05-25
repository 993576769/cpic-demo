<script setup lang="ts">
import { nav } from '@/utils/nav';
import { ref } from 'vue';

const mainTabs = ['推文', '状态', '链接', '卡片'];
const subTabs = ['产品推荐', '个人形象', '活动推荐', '节日祝福'];
const activeMain = ref('状态');
const activeSub = ref('产品推荐');
</script>

<template>
  <common-demo-page title="朋友圈素材库">
    <div class="search-box">
      搜索朋友圈素材
    </div>
    <scroll-view scroll-x class="tabs">
      <button
        v-for="tab in mainTabs"
        :key="tab"
        class="reset-btn tab"
        :class="{ 'is-active': activeMain === tab }"
        @click="activeMain = tab"
      >
        {{ tab }}
      </button>
    </scroll-view>
    <scroll-view scroll-x class="tabs">
      <button
        v-for="tab in subTabs"
        :key="tab"
        class="reset-btn chip"
        :class="{ 'is-active': activeSub === tab }"
        @click="activeSub = tab"
      >
        {{ tab }}
      </button>
    </scroll-view>

    <view v-for="index in 3" :key="index" class="material-row">
      <div class="thumb"></div>
      <div class="material-row__main">
        <text class="material-row__copy">
          理赔不是运气，而是合同里的约定。给家人配置保障，先把关键条款看清楚。
        </text>
        <div class="material-row__footer">
          <text>适合人群 / 发布时间</text>
          <button class="reset-btn use-button" @click="nav.nav('/material/moments/publish')">
            使用这条
          </button>
        </div>
      </div>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.search-box {
  height: 42px;
  padding: 0 14px;
  margin-bottom: 12px;
  border-radius: 10px;
  background: #fff;
  font-size: 13px;
  line-height: 42px;
  color: #99a1af;
}

.tabs {
  width: 100%;
  margin-bottom: 10px;
  white-space: nowrap;
}

.tab,
.chip {
  height: 34px;
  padding: 0 14px;
  margin-right: 8px;
  border-radius: 17px;
  background: #fff;
  font-size: 13px;
}

.tab.is-active,
.chip.is-active {
  background: #111;
  color: #fff;
}

.material-row {
  display: flex;
  gap: 12px;
  padding: 14px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #fff;
}

.thumb {
  flex: 0 0 74px;
  height: 74px;
  border-radius: 6px;
  background: #e5e7eb;
}

.material-row__main {
  flex: 1;
}

.material-row__copy {
  display: block;
  font-size: 13px;
  line-height: 20px;
}

.material-row__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
  color: #999;
}

.use-button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  font-size: 12px;
  color: #111;
}
</style>
