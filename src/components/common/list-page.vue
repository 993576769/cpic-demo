<template>
  <div class="common-list-page">
    <scroll-view
      class="list-scroll-view"
      scroll-x
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
      <div class="list-wrapper">
        <slot/>
      </div>

      <!-- 为空状态，显示没有空数据 -->
      <div class="status-wrapper empty-wrapper" v-if="store.loadMoreStatus === 'empty'">
        <div class="text" v-if="!$slots.empty">{{ emptyText }}</div>
        <slot name="empty" />
      </div>

      <!-- 默认状态，提示用户可以滚动加载 -->
      <div class="status-wrapper" v-if="store.loadMoreStatus === 'more'">
        <div class="text" v-if="!$slots.empty">{{ staticText }}</div>
        <slot name="staticMore" />
      </div>

      <!-- 加载中状态，显示正在加载 -->
      <div class="status-wrapper" v-if="store.loadMoreStatus === 'loading'">
        <div class="text" v-if="!$slots.loadMore">{{ loadingMoreText }}</div>
        <slot name="loadingMore" />
      </div>

      <!-- 全部加载完成状态，显示没有更多数据了 -->
      <div class="status-wrapper" v-if="store.loadMoreStatus === 'noMore'">
        <div class="text" v-if="!$slots.noMore">{{ noMoreText }}</div>
        <slot name="noMore" />
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PropReference } from '@/plugins/prop-reference';
  import { Collection } from '@/stores';

  @Component
  export default class ListPage extends Vue {
    @PropReference({ type: Collection }) store                        // Collection 实例
    @Prop({ type: String, default: '暂无数据' }) emptyText             // 为空时的文案
    @Prop({ type: String, default: '加载中...' }) loadingMoreText     // 加载中的文案
    @Prop({ type: String, default: '没有更多了 ~' }) noMoreText        // 没有更多数据时的文案
    @Prop({ type: String, default: '上滑加载更多' }) staticText        // 默认静止时的文案
    @Prop({ type: Boolean, default: false }) refresherEnabled        // 开启自定义下拉刷新
    @Prop({ type: Number, default: 45 }) refresherThreshold          // 设置自定义下拉刷新阈值
    @Prop({ type: String, default: 'black' }) refresherDefaultStyle  // 设置自定义下拉刷新默认样式，支持设置 black | white | none， none 表示不使用默认样式
    @Prop({ type: String, default: '#FFF' }) refresherBackground     // 设置自定义下拉刷新区域背景颜色
    @Prop({ type: Number, default: 50 }) lowerThreshold              // 距离底部多少时触发滚动加载更多

    isTriggered = false

    handleRefresherPulling() {
      this.isTriggered = true;
    }

    async handleRefresherRefresh() {
      try {
        await this.store.fetchData();
      } finally {
        this.isTriggered = false;
      }
    }

    handleScrollToLower() {
      this.store.fetchMoreData();
    }
  }
</script>

<style lang="scss">
  .common-list-page {
    height: 100%;
    position: relative;

    .list-scroll-view {
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .status-wrapper {
      &.empty-wrapper {
        .text {
          padding: 50px 10px;
        }
      }

      .text {
        color: #999;
        text-align: center;
        padding: 10px;
      }
    }
  }
</style>
