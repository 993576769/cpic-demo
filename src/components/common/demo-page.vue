<script setup lang="ts">
import { nav } from '@/utils/nav';

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    tabBar?: 'home' | 'tools' | 'customers' | 'data' | 'me';
    showBack?: boolean;
    padded?: boolean;
  }>(),
  {
    subtitle: '',
    tabBar: undefined,
    showBack: true,
    padded: true,
  },
);
</script>

<template>
  <div class="demo-page" :class="{ 'demo-page--with-tab': tabBar }">
    <div class="demo-page__nav">
      <button v-if="showBack" class="reset-btn demo-page__back" @click="nav.navigateBack()">
        <text>‹</text>
      </button>
      <div class="demo-page__title-box">
        <text class="demo-page__title">
          {{ title }}
        </text>
        <text v-if="subtitle" class="demo-page__subtitle">
          {{ subtitle }}
        </text>
      </div>
      <div class="demo-page__capsule">
        <text>•••</text>
        <text>⊙</text>
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
  min-height: 64px;
  padding: 18px 10px 10px;
  background: #fff;
  box-sizing: border-box;
}

.demo-page__back {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 30px;
  line-height: 44px;
  color: #111;
}

.demo-page__title-box {
  flex: 1;
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
  line-height: 24px;
  color: #111;
}

.demo-page__subtitle {
  margin-top: 2px;
  font-size: 12px;
  line-height: 17px;
  color: #666;
}

.demo-page__capsule {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 86px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  font-size: 16px;
  color: #111;
  background: #ffffffcc;
}

.demo-page__body--padded {
  padding: 12px 10px 24px;
  box-sizing: border-box;
}
</style>
