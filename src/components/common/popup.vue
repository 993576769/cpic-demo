<script lang="ts" setup>
import { type CSSProperties, computed } from 'vue';
import { isString } from 'lodash-es';

interface Props {
  zIndex?: number;
  overlay?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  closeOnClickOverlay?: boolean;
  customStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  round?: boolean | String;
  duration?: number;
  modelValue: boolean;
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
  (event: 'close'): void;
  (event: 'afterLeave'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    zIndex: 100,
    overlay: true,
    position: 'center',
    closeOnClickOverlay: true,
    customStyle: () => ({}),
    overlayStyle: () => ({}),
    round: false,
    duration: 300,
    modelValue: false,
  },
);

const emits = defineEmits<Emits>();

const popupOverlayStyle = computed(() => {
  return {
    zIndex: props.zIndex - 1,
    ...props.overlayStyle,
  };
});

const popupStyle = computed(() => {
  const positionStyles = {
    center: {
      top: '50%',
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
    },
    top: {
      top: 0,
      left: 0,
      width: '100%',
    },
    bottom: {
      bottom: 0,
      left: 0,
      width: '100%',
    },
    left: {
      height: '100%',
      top: 0,
      left: 0,
    },
    right: {
      height: '100%',
      top: 0,
      right: 0,
    },
  };

  return {
    zIndex: props.zIndex,
    borderRadius: props.round ? (isString(props.round) ? props.round : '32rpx') : 0,
    position: 'fixed',
    background: '#fff',
    ...positionStyles[props.position],
    ...props.customStyle,
  } as CSSProperties;
});

const animationName = computed(() => {
  const animationMap = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-left',
    right: 'slide-right',
    center: 'fade',
  };
  return animationMap[props.position] as any;
});

function onClickOverlay() {
  if (props.closeOnClickOverlay) {
    emits('update:modelValue', false);
    emits('close');
  }
}
</script>

<template>
  <div class="bean-popup">
    <common-overlay
      :show="overlay && modelValue"
      :duration="duration"
      :custom-style="popupOverlayStyle"
      @overlay-click="onClickOverlay"
    />

    <common-transition
      :show="modelValue"
      :custom-style="popupStyle"
      :name="animationName"
      :custom-class="`popup ${position}`"
      :duration="duration"
      @after-leave="emits('afterLeave')"
    >
      <!-- 若弹窗里面有scroll-view且高度挺长的情况，安卓滚动会触发弹窗穿透，可以自行监听弹窗对底层页面用css处理或者使用<page-meta />标签 -->
      <!-- https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html -->
      <slot></slot>
    </common-transition>
  </div>
</template>
