<script setup lang="ts">
import { nav } from '@/utils/nav';

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    tabBar?: 'home' | 'tools' | 'customers' | 'data' | 'me';
    showBack?: boolean;
    showTitle?: boolean;
    padded?: boolean;
  }>(),
  {
    subtitle: '',
    tabBar: undefined,
    showBack: true,
    showTitle: true,
    padded: true,
  },
);
</script>

<template>
  <div class="demo-page" :class="{ 'demo-page--with-tab': tabBar }">
    <div v-if="showBack || showTitle" class="demo-page__nav">
      <button v-if="showBack" class="reset-btn demo-page__back" @click="nav.navigateBack()">
        <image
          class="demo-page__back-icon"
          mode="aspectFit"
          src="/static/common/icon-nav-back.svg"
        />
      </button>
      <div v-if="showTitle" class="demo-page__title-box">
        <text class="demo-page__title">
          {{ title }}
        </text>
        <text v-if="subtitle" class="demo-page__subtitle">
          {{ subtitle }}
        </text>
      </div>
      <div v-if="$slots.navRight" class="demo-page__nav-right">
        <slot name="navRight"></slot>
      </div>
    </div>
    <div class="demo-page__body" :class="{ 'demo-page__body--padded': padded }">
      <slot></slot>
    </div>
    <common-tab-bar v-if="tabBar" :active="tabBar" />
  </div>
</template>

<style lang="scss" scoped>
.demo-page {
  min-height: 100vh;
  background: #f5f5f7;
  color: #101828;
  box-sizing: border-box;
}

.demo-page--with-tab {
  padding-bottom: 84px;
}

.demo-page__nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 44px;
  background: #fff;
  box-sizing: border-box;
}

.demo-page__back {
  position: absolute;
  left: 0;
  top: 0;
  width: 44px;
  height: 44px;
  border-radius: 0;
  color: #111;
}

.demo-page__back-icon {
  width: 24px;
  height: 24px;
}

.demo-page__title-box {
  position: absolute;
  left: 56px;
  right: 56px;
  top: 0;
  min-width: 0;
  text-align: center;
}

.demo-page__nav-right {
  position: absolute;
  right: 12px;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 36px;
}

.demo-page__title,
.demo-page__subtitle {
  display: block;
}

.demo-page__title {
  font-size: 17px;
  font-weight: 600;
  line-height: 44px;
  color: #111;
}

.demo-page__subtitle {
  margin-top: 2px;
  font-size: 12px;
  line-height: 17px;
  color: #666;
}

.demo-page__body--padded {
  padding: 12px 10px 24px;
  box-sizing: border-box;
}
</style>
