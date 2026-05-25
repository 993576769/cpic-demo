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
        <svg
          class="demo-page__back-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M15 5L8 12L15 19" />
        </svg>
      </button>
      <div v-if="showTitle" class="demo-page__title-box">
        <text class="demo-page__title">
          {{ title }}
        </text>
        <text v-if="subtitle" class="demo-page__subtitle">
          {{ subtitle }}
        </text>
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
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.demo-page__title-box {
  position: absolute;
  left: 56px;
  right: 56px;
  top: 0;
  min-width: 0;
  text-align: center;
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
