<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue';

// 建议使用v-if控制组件隐藏，避免onMounted执行run时获取不到元素高度
interface Props {
  bgColor?: string;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: '#f9f9f9',
  zIndex: 100,
});
const contentHeight = ref(0);
const style = computed<any>(() => ({
  height: `${contentHeight.value}px`,
  boxSizing: 'content-box',
}));
const footerStyle = computed<any>(() => ({
  ...style.value,
  background: props.bgColor,
  zIndex: props.zIndex,
}));
const instance = getCurrentInstance();

function run() {
  const query = uni.createSelectorQuery().in(instance);
  query.select('.content').boundingClientRect((data: any) => {
    contentHeight.value = data.height;
  }).exec();
}

onMounted(async () => {
  await nextTick();
  run();
});
</script>

<template>
  <div class="button-fixed-bottom" :style="[style]">
    <div class="fixed-footer" :style="[footerStyle]">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.button-fixed-bottom {
  &, .fixed-footer {
    @include padding-bottom-safe-area;
  }

  .fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
