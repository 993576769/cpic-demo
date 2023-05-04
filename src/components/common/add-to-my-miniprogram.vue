<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<Props>(),
  {
    text: '点击添加「我的小程序」，下次访问更便捷',
    duration: 6000,
    customNavbar: false,
  },
);
const { VITE_APP_ENV } = import.meta.env;
const STORAGE_KEY = `${VITE_APP_ENV}_add_to_my_miniprogram`;

interface Props {
  text?: string;
  duration?: number;
  customNavbar: boolean;
}

const show = ref(false);
function handleClose() {
  show.value = false;
}

const menu = ref({
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
});

onMounted(() => {
  if (!uni.getStorageSync(STORAGE_KEY)) {
    const res = uni.getMenuButtonBoundingClientRect();
    menu.value = res;
    show.value = true;
    uni.setStorage({ key: STORAGE_KEY, data: '1' });
    setTimeout(() => {
      handleClose();
    }, props.duration);
  }
});
</script>

<template>
  <div
    v-if="show"
    class="common-add-to-my-miniprogram"
    :style="{ right: `calc(100vw - ${menu.right}px)`, top: `${customNavbar ? menu.top + menu.height + 20 : 10}px` }"
    @click.stop="handleClose"
  >
    <div class="content">
      <div class="triangle" :style="{ right: `${menu.width / 2 + menu.width / 4 - 15}px` }"></div>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-add-to-my-miniprogram {
  position: fixed;
  z-index: 9999;
  top: 10px;
  height: 34px;
  padding: 0 10px;
  border-radius: 6px;
  color: #fff;
  background: $primary-color;

  .content {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .triangle {
    position: absolute;
    top: -16px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom: 8px solid $primary-color;
    transform: translateX(4px);
  }
}
</style>
