<script lang="ts" setup>
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

type TabKey = 'home' | 'tools' | 'customers' | 'data' | 'me';

interface TabItem {
  key: TabKey;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
  url?: string;
}

const props = defineProps<{
  active: TabKey;
}>();

const tabs: TabItem[] = [
  {
    key: 'home',
    label: '任务',
    activeIcon: '/static/tab-bar/tab-home-active.svg',
    inactiveIcon: '/static/tab-bar/tab-home-inactive.svg',
    url: '/pages/root/home',
  },
  {
    key: 'tools',
    label: '工具',
    activeIcon: '/static/tab-bar/tab-tools-active.svg',
    inactiveIcon: '/static/tab-bar/tab-tools-inactive.svg',
    url: '/pages/root/tools',
  },
  {
    key: 'customers',
    label: '顾客',
    activeIcon: '/static/tab-bar/tab-customers-active.svg',
    inactiveIcon: '/static/tab-bar/tab-customers-inactive.svg',
    url: '/pages/root/customers',
  },
  {
    key: 'data',
    label: '数据',
    activeIcon: '/static/tab-bar/tab-data-active.svg',
    inactiveIcon: '/static/tab-bar/tab-data-inactive.svg',
  },
  {
    key: 'me',
    label: '我',
    activeIcon: '/static/tab-bar/tab-me-active.svg',
    inactiveIcon: '/static/tab-bar/tab-me-inactive.svg',
  },
];

function getIcon(item: TabItem) {
  return item.key === props.active ? item.activeIcon : item.inactiveIcon;
}

function handleTabClick(item: TabItem) {
  if (item.key === props.active) {
    return;
  }

  if (item.key === 'data' || item.key === 'me') {
    showToast('建设中');
    return;
  }

  if (!item.url) {
    return;
  }

  nav.nav(item.url);
}
</script>

<template>
  <common-button-fixed-bottom bg-color="#fff" :z-index="20">
    <div class="common-tab-bar">
      <div class="tab-bar__content">
        <button
          v-for="item in tabs"
          :key="item.key"
          class="reset-btn tab-bar__item"
          :class="{ 'is-active': item.key === active }"
          @click.stop.prevent="handleTabClick(item)"
        >
          <image
            class="tab-bar__icon"
            mode="aspectFit"
            :src="getIcon(item)"
          />
          <span class="tab-bar__label">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </common-button-fixed-bottom>
</template>

<style lang="scss" scoped>
.common-tab-bar {
  min-height: 50px;
  padding-bottom: 10px;
  background: $white-color;
  border-top: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.tab-bar__content {
  display: flex;
  height: 50px;
}

.tab-bar__item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 50px;
  color: #999;
}

.tab-bar__item.is-active {
  color: #333;
}

.tab-bar__icon {
  width: 28px;
  height: 28px;
  margin-top: 5px;
}

.tab-bar__label {
  margin-top: 2px;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0;
  color: currentColor;
}

.is-active .tab-bar__label {
  font-weight: 500;
}
</style>
