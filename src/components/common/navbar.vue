<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue';

interface Props {
  title?: string; // 标题
  color?: string; // 颜色
  backgroundColor?: string; // 背景色
  fixed?: boolean; // 是否固定在顶部
  placeholder?: boolean; // 固定在顶部时是否开启占位
  statusBarPlaceholder?: boolean; // 是否留出状态栏高度
  border?: boolean; // 是否显示下边框
  zIndex?: number;
  showBackButton?: boolean;
  backIcon?: string; // 返回图标
}

interface Emits {
  (event: 'ready'): void;
  (event: 'height', height: number): void;
  (event: 'back'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    title: '',
    color: '#141414',
    backgroundColor: '#fff',
    fixed: false,
    placeholder: true,
    statusBarPlaceholder: true,
    border: true,
    zIndex: 10001,
    showBackButton: false,
    backIcon: '/static/common/icon-nav-back.svg',
  },
);

const emits = defineEmits<Emits>();

const iconSize = 22;
const statusBarHeight = ref(20);
const platform = ref('ios');
const menuRect = ref({
  width: 87,
  height: 32,
  right: 10,
  top: 0,
});

function getMenuBtnRect(statusBarHeight: number, screenWidth: number) {
  const menuRectInfo = uni.getMenuButtonBoundingClientRect();
  menuRect.value = {
    ...menuRectInfo,
    top: menuRectInfo.top > statusBarHeight ? menuRectInfo.top - statusBarHeight : menuRectInfo.top,
    right: menuRectInfo.right < 20 ? menuRectInfo.right : screenWidth - menuRectInfo.right,
  };
}

async function onLoad() {
  const info = await uni.getSystemInfo();
  statusBarHeight.value = info.statusBarHeight!;
  platform.value = info.platform;
  // #ifdef MP-WEIXIN
  getMenuBtnRect(statusBarHeight.value, info.screenWidth);
  // #endif
  await nextTick();
  emits('ready');
}

onMounted(onLoad);

const statusBarPlaceholderHeight = computed(() => props.statusBarPlaceholder ? statusBarHeight.value : 0);

const height = computed(() => {
  const menuBtnDefaultVerticalPadding = platform.value.toLowerCase() === 'ios' ? 6 : 8;
  const height = menuRect.value.height + (
    menuRect.value.top ? (menuRect.value.top * 2) + 3 : menuBtnDefaultVerticalPadding * 2
  );
  // #ifdef MP-WEIXIN
  emits('height', height + statusBarPlaceholderHeight.value);
  // #endif
  return height;
});
const titleBoxStyle = computed(() => {
  const { width, right } = menuRect.value;
  if (props.title) {
    return {
      paddingLeft: `${props.showBackButton ? (width - iconSize) : (width + right * 2)}px`,
      paddingRight: `${width + right * 2}px`,
      lineHeight: `${height.value}px`,
    };
  }
  return {
    paddingLeft: `${props.showBackButton ? 0 : right * 2}px`,
    paddingRight: `${width + right * 2}px`,
    display: 'flex',
    alignItems: 'center',
  };
});
const navbarStyle = computed(() => {
  return {
    zIndex: props.zIndex,
    paddingTop: `${statusBarPlaceholderHeight.value}px`,
    height: `${height.value + statusBarPlaceholderHeight.value}px`,
    backgroundColor: props.backgroundColor,
    borderBottom: props.border ? '1px solid #F0F0F0' : undefined,
  };
});
</script>

<template>
  <div class="bean-navbar">
    <!-- #ifdef MP-WEIXIN -->
    <div v-if="fixed && placeholder" :style="{ height: `${height + statusBarPlaceholderHeight}px` }"></div>
    <div class="navbar" :class="{ fixed }" :style="[navbarStyle]">
      <div
        v-if="showBackButton"
        class="btn-back"
        :style="{ padding: `${menuRect.right}px` }"
        @click="emits('back')"
      >
        <img
          :src="backIcon"
          :style="{ width: `${iconSize}px`, height: `${iconSize}px` }"
        />
      </div>
      <div class="box-title" :style="[titleBoxStyle]">
        <div v-if="title" class="title text-overflow" :style="{ color }">
          {{ title }}
        </div>
        <slot v-else></slot>
      </div>
    </div>
    <!-- #endif -->

    <!-- #ifdef MP-ALIPAY -->
    <div class="navbar" :style="[{ backgroundColor }, border ? { borderBottom: `${1}px solid #F0F0F0` } : {}]">
      <slot></slot>
    </div>
    <!-- #endif -->
  </div>
</template>

<style lang="scss">
.bean-navbar {
  .navbar {
    display: flex;
    box-sizing: border-box;
    width: 100%;

    .btn-back {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding: 0 15PX;
    }

    .box-title {
      position: relative;
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;

      .title {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-weight: bold;
        font-size: 16PX;
        text-align: center;
      }
    }

    &.fixed {
      position: fixed;
      top: 0;
    }
  }
}
</style>
