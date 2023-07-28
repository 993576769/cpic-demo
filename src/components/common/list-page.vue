<script lang="ts" setup>
import { ref } from 'vue';
import type { defineCollectionStore } from '@/stores/helper/collection-store';

interface Props {
  store: ReturnType<ReturnType<typeof defineCollectionStore>>;
  errorText?: string | boolean;
  emptyText?: string | boolean;
  emptyImage?: string;
  loadingMoreText?: string | boolean;
  noMoreText?: string | boolean;
  staticText?: string | boolean;
  refresherEnabled?: boolean;
  refresherThreshold?: number;
  refresherDefaultStyle?: 'black' | 'white' | 'none';
  refresherBackground?: string;
  /** 自定义刷新功能执行的方法 */
  customRefreshFn?: () => Promise<unknown>;
  lowerThreshold?: number;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    errorText: '加载失败，点击重试!',
    emptyText: '暂无数据',
    loadingMoreText: '加载中...',
    noMoreText: '没有更多了 ~',
    staticText: '上滑加载更多',
    refresherEnabled: true,
    refresherThreshold: 45,
    refresherDefaultStyle: 'black',
    refresherBackground: '#fff',
    lowerThreshold: 50,
  },
);

const isTriggered = ref(false);

function handleRefresherPulling() {
  isTriggered.value = true;
}

async function handleRefresherRefresh() {
  try {
    if (props.customRefreshFn) {
      await props.customRefreshFn();
    } else {
      await props.store.fetchData();
    }
  } finally {
    isTriggered.value = false;
  }
}

function handleScrollToLower() {
  props.store.fetchMoreData();
}
</script>

<template>
  <div class="common-list-page">
    <scroll-view
      class="list-scroll-view"
      scroll-y
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="isTriggered"
      :refresher-threshold="refresherThreshold"
      :refresher-default-style="refresherDefaultStyle"
      :refresher-background="refresherBackground"
      :lower-threshold="lowerThreshold"
      @scrolltolower="handleScrollToLower"
      @refresherpulling="handleRefresherPulling"
      @refresherrefresh="handleRefresherRefresh"
    >
      <!-- 数据列表显示 -->
      <slot></slot>

      <common-loading-status
        :store="store"
        :error-text="errorText"
        :empty-text="emptyText"
        :empty-image="emptyImage"
        :loading-more-text="loadingMoreText"
        :no-more-text="noMoreText"
        :static-text="staticText"
        @retry="handleScrollToLower"
      >
        <template v-if="$slots.empty">
          <slot name="empty"></slot>
        </template>
        <template v-if="$slots.staticMore">
          <slot name="staticMore"></slot>
        </template>
        <template v-if="$slots.loadingMore">
          <slot name="loadingMore"></slot>
        </template>
        <template v-if="$slots.noMore">
          <slot name="noMore"></slot>
        </template>
        <template v-if="$slots.error">
          <slot name="error"></slot>
        </template>
      </common-loading-status>
    </scroll-view>
  </div>
</template>

<style lang="scss" scoped>
  .common-list-page {
    position: relative;
    height: 100%;

    .list-scroll-view {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .text {
      padding: 10px;
      text-align: center;
      color: #999;
    }

    .status-wrapper {
      &.empty-wrapper {
        .text {
          padding: 50px 10px;
        }
      }
    }
  }
</style>
