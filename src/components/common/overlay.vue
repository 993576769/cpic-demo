<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  duration?: number;
  show: boolean;
  zIndex?: number;
  customStyle?: CSSProperties;
}

interface Emits {
  (event: 'overlayClick'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    show: false,
    zIndex: 100,
    customStyle: () => ({}),
  },
);

const emits = defineEmits<Emits>();

const overlayStyle = computed(() => {
  return {
    'zIndex': props.zIndex,
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'background-color': 'rgba(0, 0, 0, .7)',
    ...props.customStyle,
  } as CSSProperties;
});

function onOverlayClick() {
  emits('overlayClick');
}
</script>

<template>
  <common-transition
    :show="show"
    :duration="duration"
    :custom-style="overlayStyle"
    @touchmove.stop
    @click="onOverlayClick"
  />
</template>

<style lang="scss" scoped>
.bean-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 70%);
}
</style>
