<script setup lang="ts">
import { nav } from '@/utils/nav';
import { ref } from 'vue';

const mainTabs = ['推文', '状态', '链接', '卡片'];
const subTabs = ['产品推荐', '个人形象', '活动推荐', '节日祝福'];
const activeMain = ref(mainTabs[0]);
const activeSub = ref(subTabs[0]);

function selectMainTab(tab: string) {
  activeMain.value = tab;
}

function selectSubTab(tab: string) {
  activeSub.value = tab;
}

const materials = [
  {
    copy: '理赔不是运气，而是合同里的约定。 上周协助客户完成住院理赔，资料齐全，3天到账。 保险的价值，不在宣传里， 而在需要时，真的帮到你。',
    audience: '有娃家庭、生活压力大',
    time: '12:00-13:00',
  },
  {
    copy: '理赔更快，心里更安稳。 上个月帮助客户解决车险理赔，资料准备充分，1天到账。 保险的意义，体现在每一次帮助中。',
    audience: '上班族、追求高效生活',
    time: '18:00-19:00',
  },
  {
    copy: '保障无忧，生活更美好。 最近协调客户的医疗保险索赔，过程顺利，2天到账。 保险的真谛，不在于投保，而在于真正需要时的支持。',
    audience: '中老年人、关注健康保障',
    time: '09:00-10:00',
  },
];
</script>

<template>
  <view class="moments-material-page">
    <common-demo-page title="朋友圈素材库" :padded="false">
      <view class="material-search-wrap">
        <view class="material-search">
          <view class="material-search__icon" />
          <text class="material-search__placeholder">
            搜索素材
          </text>
        </view>
      </view>

      <view class="material-main-tabs" role="tablist" aria-label="素材类型">
        <button
          v-for="tab in mainTabs"
          :key="tab"
          class="reset-btn material-main-tabs__item"
          :class="{ 'is-active': activeMain === tab }"
          role="tab"
          :aria-selected="activeMain === tab"
          @click="selectMainTab(tab)"
        >
          <text>{{ tab }}</text>
        </button>
      </view>

      <scroll-view scroll-x class="material-sub-tabs" :show-scrollbar="false">
        <view class="material-sub-tabs__inner">
          <button
            v-for="tab in subTabs"
            :key="tab"
            class="reset-btn material-sub-tabs__item"
            :class="{ 'is-active': activeSub === tab }"
            @click="selectSubTab(tab)"
          >
            <text>{{ tab }}</text>
          </button>
        </view>
      </scroll-view>

      <view class="material-list">
        <view v-for="item in materials" :key="item.copy" class="material-card">
          <view class="material-card__content">
            <view class="material-card__thumb" />
            <text class="material-card__copy">
              {{ item.copy }}
            </text>
          </view>

          <view class="material-card__divider" />

          <view class="material-card__footer">
            <view class="material-card__meta">
              <view class="material-card__meta-line">
                <text class="material-card__meta-label">
                  适合人群
                </text>
                <text class="material-card__meta-value">
                  {{ item.audience }}
                </text>
              </view>
              <view class="material-card__meta-line">
                <text class="material-card__meta-label">
                  发布时间
                </text>
                <text class="material-card__meta-value">
                  {{ item.time }}
                </text>
              </view>
            </view>
            <button class="reset-btn use-button" @click="nav.nav('/material/moments/publish')">
              使用这条
            </button>
          </view>
        </view>
      </view>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.moments-material-page {
  min-height: 100vh;
  background: #fff;
}

.moments-material-page :deep(.demo-page) {
  min-height: 100vh;
  background: #fff;
}

.moments-material-page :deep(.demo-page__body) {
  background: #fff;
}

.material-search-wrap {
  height: 58px;
  padding: 10px 14px 16px;
  background: #fff;
  box-sizing: border-box;
}

.material-search {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  border-radius: 100px;
  background: #f5f5f5;
  box-sizing: border-box;
}

.material-search__icon {
  position: relative;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

.material-search__icon::before,
.material-search__icon::after {
  position: absolute;
  content: '';
  box-sizing: border-box;
}

.material-search__icon::before {
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
  border: 2px solid #999;
  border-radius: 50%;
}

.material-search__icon::after {
  right: 3px;
  bottom: 3px;
  width: 7px;
  height: 2px;
  border-radius: 2px;
  background: #999;
  transform: rotate(45deg);
  transform-origin: center;
}

.material-search__placeholder {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #999;
}

.material-main-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  box-sizing: border-box;
}

.material-main-tabs__item {
  position: relative;
  flex: 0 0 78px;
  width: 78px;
  height: 44px;
  background: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
}

.material-main-tabs__item.is-active::after {
  position: absolute;
  display: block;
  top: 40px;
  width: 30px;
  left: 50%;
  height: 4px;
  background: #333;
  content: '';
  transform: translateX(-50%);
}

.material-sub-tabs {
  width: 100%;
  height: 59px;
  background: #fff;
  white-space: nowrap;
}

.material-sub-tabs__inner {
  display: flex;
  gap: 10px;
  width: max-content;
  padding: 18px 13px 13px 14px;
  box-sizing: border-box;
}

.material-sub-tabs__item {
  width: 79px;
  height: 28px;
  border-radius: 6px;
  background: #f8f8f8;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  color: #333;
}

.material-sub-tabs__item.is-active {
  width: 80px;
  background: #000;
  color: #fff;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 0 13px 24px 14px;
  background: #fff;
  box-sizing: border-box;
}

.material-card {
  height: 178px;
  overflow: hidden;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(28, 31, 35, 0.06);
  box-sizing: border-box;
}

.material-card__content {
  display: flex;
  gap: 11px;
  height: 124px;
  padding: 20px 11px 19px;
  box-sizing: border-box;
}

.material-card__thumb {
  flex: 0 0 70px;
  width: 70px;
  height: 85px;
  border-radius: 11px;
  background: #f8f8f8;
}

.material-card__copy {
  display: block;
  flex: 1;
  min-width: 0;
  padding-top: 1px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  color: #333;
}

.material-card__divider {
  height: 1px;
  margin: 0 11px;
  background: #f3f4f8;
}

.material-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  padding: 8px 11px 8px;
  box-sizing: border-box;
}

.material-card__meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.material-card__meta-line {
  display: flex;
  align-items: center;
  min-width: 0;
  height: 16px;
  line-height: 16px;
}

.material-card__meta-label,
.material-card__meta-value {
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
}

.material-card__meta-label {
  flex: 0 0 auto;
  margin-right: 4px;
  color: #9b9bad;
}

.material-card__meta-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.use-button {
  flex: 0 0 75px;
  width: 75px;
  height: 26px;
  border: 1px solid #333;
  border-radius: 19px;
  background: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 17px;
  color: #333;
}
</style>
