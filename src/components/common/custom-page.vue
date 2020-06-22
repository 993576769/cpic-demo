<template>
  <div class="common-custom-page">
    <template v-for="row in components">
      <!-- 图片 -->
      <div
        class="custom-image"
        v-if="row.name === 'custom-image'"
        :key="row.key"
      >
        <image
          class="image"
          v-for="(item, index) in row.data.data"
          :key="index"
          mode="widthFix"
          :src="item.src"
          @click="handleNav(item.link)"
        />
      </div>

      <!-- 视频 -->
      <div
        v-if="row.name === 'custom-video'"
        :key="row.key"
        class="custom-video"
        :style="[getStyle(row.data.config)]"
      >
        <video
          class="video"
          v-for="(item, index) in row.data.data"
          :key="index" :src="item.src"
          :poster="item.poster"
          :controls="row.data.config.controls"
          :autoplay="row.data.config.autoplay"
          :loop="row.data.config.loop"
          :muted="row.data.config.muted"
          :object-fit="row.data.config.objectFit"
        />
      </div>

      <!-- 轮播图 -->
      <swiper
        v-if="row.name === 'custom-swiper'"
        :key="row.key"
        class="custom-swiper"
        :indicator-dots="row.data.config.indicatorDots"
        :indicator-color="row.data.config.indicatorColor"
        :indicator-active-color="row.data.config.indicatorActiveColor"
        :autoplay="row.data.config.autoplay"
        :interval="row.data.config.interval"
        :duration="row.data.config.duration"
        :circular="row.data.config.circular"
        :style="[getStyle(row.data.config)]"
      >
        <swiper-item
          class="swiper-item"
          v-for="item in row.data.data"
          :key="item.key">
          <img
            class="image" mode="aspectFill"
            v-if="item.src" :src="item.src"
            @click="handleNav(item.link)"
          />
        </swiper-item>
      </swiper>

      <!-- 横向滚动 -->
      <scroll-view
        scroll-x
        v-if="row.name === 'custom-scroll-x'"
        :key="row.key"
        class="custom-scroll-x"
      >
        <img
          class="item"
          :style="[getStyle(row.data.config)]"
          v-for="(item, index) in row.data.data"
          :key="index"
          :src="item.src"
          @click="handleNav(item.link)"
        />
      </scroll-view>

      <!-- 客服 -->
      <div class="custom-contact-service" v-if="row.name === 'custom-contact-service'" :key="row.key">
        <button
          v-for="item in row.data.data"
          :key="item.key"
          class="item reset-btn" open-type="contact"
        >
          <image
            v-if="item.src"
            :src="item.src"
            mode="widthFix"
            class="image"
          />
        </button>
      </div>

      <!-- 占位块 -->
      <div
        v-if="row.name === 'custom-block'"
        :key="row.key"
        :style="[getStyle(row.data.config)]"
        class="custom-block"
      />

      <!-- 文本 -->
      <div
        v-if="row.name === 'custom-text'"
        :key="row.key"
        class="custom-text"
        :style="[getStyle(row.data.config)]"
      >
        <text v-for="item in row.data.data" :key="item.text">{{ item.text }}</text>
      </div>

      <!-- 商品列表 -->
      <div
        v-if="row.name === 'custom-product-list'"
        :key="row.key"
        class="custom-product-list"
      >
        <div>TODO 商品列表</div>
        <!-- TODO 这里的渲染每个项目可能都不太一样，各项目自己实现以下 -->
      </div>

      <!-- 通知栏--->
      <div
        v-if="row.name === 'custom-notice-bar'"
        :key="row.key"
        class="custom-notice-bar"
      >
        <!-- TODO -->
      </div>
    </template>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { nav } from '@/utils';

  @Component
  export default class CustomPage extends Vue {
    @Prop({ type: Array, default: () => [] }) components

    getStyle(config) {
      const pxProps = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'width', 'height', 'fontSize', 'lineHeight'];
      const cssProps = pxProps.concat(['backgroundColor', 'boxSizing', 'color', 'fontWeight', 'textAlign']);

      return _.mapValues(
        _.pick(config, cssProps),
        (v, key) => {
          return pxProps.includes(key) ? v + 'px' : v;
        }
      );
    }

    handleNav(link) {
      nav(link);
    }
  }
</script>

<style lang="scss">
  .common-custom-page {
    .custom-image {
      display: flex;
      align-items: flex-start;

      .image {
        flex: 1;
        vertical-align: top;
      }
    }

    .custom-video {
      height: 225px;

      .video {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .custom-swiper {
      .image {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }

    .custom-scroll-x {
      white-space: nowrap;
    }

    .custom-contact-service {
      display: flex;
      align-items: flex-start;

      .item {
        flex: 1;

        .image {
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
</style>
