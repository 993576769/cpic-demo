<script lang="ts" setup generic="T extends Base">
import type { Base } from '@/models/base';
import type { defineCollectionStore } from '@/stores/helper/collection-store';
import type { defineSimpleStore } from '@/stores/helper/simple-store';
import { computed } from 'vue';

type CollectionStore = ReturnType<ReturnType<typeof defineCollectionStore<string, T, object>>>;
type SimpleStore = ReturnType<ReturnType<typeof defineSimpleStore<string, T, object>>>;

interface Props {
  store: CollectionStore | SimpleStore;
  errorText?: string;
  emptyText?: string;
  emptyImage?: string;
  loadingMoreText?: string;
  noMoreText?: string;
  staticText?: string;
}

interface Emits {
  (event: 'retry'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    errorText: '加载失败，点击重试!',
    emptyText: '暂无数据',
    loadingMoreText: '加载中...',
    noMoreText: '没有更多了 ~',
    staticText: '上滑加载更多',
  },
);

const emits = defineEmits<Emits>();

const loadMoreStatus = computed(() => {
  if ((props.store as CollectionStore).fetchMoreData) {
    if ((props.store as CollectionStore).isEmpty) { return 'empty'; }
    if ((props.store as CollectionStore).isComplete) { return 'noMore'; }
    if (props.store.isFetching) { return 'loading'; }
    if (props.store.isRejected) { return 'error'; }
    return 'more';
  } else {
    if (props.store.isFetching) { return 'loading'; }
    if (props.store.isRejected) { return 'error'; }
    return '';
  }
});
</script>

<template>
  <!-- 加载状态显示组件 -->
  <div>
    <!-- 为空状态，显示没有空数据 -->
    <div v-if="loadMoreStatus === 'empty'" class="status-wrapper empty">
      <common-empty-view v-if="!$slots.empty && emptyText" :text="emptyText" :image="emptyImage" />
      <slot name="empty"></slot>
    </div>

    <!-- 默认状态，提示用户可以滚动加载 -->
    <div v-if="loadMoreStatus === 'more'" class="status-wrapper more">
      <div v-if="!$slots.staticMore && staticText" class="text">
        {{ staticText }}
      </div>
      <slot name="staticMore"></slot>
    </div>

    <!-- 加载中状态，显示正在加载 -->
    <div v-if="loadMoreStatus === 'loading'" class="status-wrapper loading">
      <div v-if="!$slots.loadingMore && loadingMoreText" class="text">
        <common-loading :text="loadingMoreText" />
      </div>
      <slot name="loadingMore"></slot>
    </div>

    <!-- 全部加载完成状态，显示没有更多数据了 -->
    <div v-if="loadMoreStatus === 'noMore'" class="status-wrapper no-more">
      <div v-if="!$slots.noMore && noMoreText" class="text">
        {{ noMoreText }}
      </div>
      <slot name="noMore"></slot>
    </div>

    <!-- 加载出错时状态 -->
    <div v-if="loadMoreStatus === 'error'" class="status-wrapper error">
      <div v-if="!$slots.error && errorText" class="text" @click="emits('retry')">
        {{ errorText }}
      </div>
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.status-wrapper {
  .text {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>
