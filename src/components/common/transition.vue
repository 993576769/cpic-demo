<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';

interface Props {
  name?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  show: boolean;
  duration?: number | { enter: number; leve: number };
  customStyle?: CSSProperties;
  customClass?: string;
}

interface Emits {
  (event: 'beforeEnter'): void;
  (event: 'beforeLeave'): void;
  (event: 'afterEnter'): void;
  (event: 'afterLeave'): void;
  (event: 'enter'): void;
  (event: 'leave'): void;
  (event: 'click'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    name: 'fade',
    show: false,
    duration: 300,
    customStyle: () => ({}),
    customClass: '',
  },
);

const emits = defineEmits<Emits>();

const currentDuration = ref(300);
const display = ref(false);
const classes = ref<string>([
  'enter-class',
  'enter-active-class',
  'enter-to-class',
  'leave-class',
  'leave-active-class',
  'leave-to-class',
].join(' '));
const styles = computed(() => {
  return {
    transitionDuration: `${currentDuration.value || 0}ms`,
    display: display.value ? 'block' : 'none',
    ...props.customStyle,
  } as CSSProperties;
});

const classNames = computed(() => {
  return `${classes.value} ${props.customClass}`;
});

let status: 'enter' | 'leave' | undefined;

function checkStatus(s: typeof status) {
  if (s !== status) {
    // 如果不一致，需要报错中断本次运行
    throw new Error(`[Warn]: incongruent status: ${status}`);
  }
}

const inited = ref(false);
let transitionEnded = false;
async function enter() {
  const { duration, name } = props;
  const classNames = getClassNames(name);
  status = 'enter';
  emits('beforeEnter'); // 进入前触发事件

  await nextTick();
  checkStatus('enter');
  emits('enter'); // 进入中触发事件
  inited.value = true;
  display.value = true;
  classes.value = classNames.enter;
  currentDuration.value = isObj(duration) ? (duration as any).enter : duration;

  await nextTick();
  checkStatus('enter');
  transitionEnded = false;
  classes.value = classNames['enter-to'];
}

async function leave() {
  if (!display.value) {
    return;
  }

  const { duration, name } = props;
  const classNames = getClassNames(name);

  status = 'leave';
  emits('beforeLeave'); // 离开前触发事件

  await nextTick();
  checkStatus('leave');
  emits('leave'); // 离开中触发事件
  classes.value = classNames.leave;
  currentDuration.value = isObj(duration) ? (duration as any).leave : duration;

  await nextTick();
  checkStatus('leave');
  transitionEnded = false;
  setTimeout(() => onTransitionEnd(), currentDuration.value);
  classes.value = classNames['leave-to'];
}

function onTransitionEnd() {
  if (transitionEnded) {
    return;
  }

  transitionEnded = true;
  if (status === 'enter') {
    emits('afterEnter');
  } else if (status === 'leave') {
    emits('afterLeave');
  }
  if (!props.show && display) {
    display.value = false;
  }
}

function getClassNames(name: Props['name']) {
  return {
    'enter': `bean-${name}-enter bean-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `bean-${name}-enter-to bean-${name}-enter-active enter-to-class enter-active-class`,
    'leave': `bean-${name}-leave bean-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `bean-${name}-leave-to bean-${name}-leave-active leave-to-class leave-active-class`,
  };
}

function isObj(target: any) {
  return typeof target === 'object' && target !== null;
}

watch(
  () => props.show,
  async (value, old = false) => {
    if (value === old) {
      return;
    }
    try {
      await (value ? enter() : leave());
    } catch (e: any) {
      if (/incongruent status/.test(e.message)) {
        console.warn(e.message);
      } else {
        throw e;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <view
    v-if="inited"
    class="bean-transition"
    :class="classNames"
    :style="styles"
    catchtouchmove
    @transitionend="onTransitionEnd"
    @click="emits('click')"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.bean-transition {
  transition-timing-function: ease;
}

.bean-fade-enter-active,
.bean-fade-leave-active {
  transition-property: opacity;
}

.bean-fade-enter,
.bean-fade-leave-to {
  opacity: 0;
}

.bean-fade-up-enter-active,
.bean-fade-up-leave-active,
.bean-fade-down-enter-active,
.bean-fade-down-leave-active,
.bean-fade-left-enter-active,
.bean-fade-left-leave-active,
.bean-fade-right-enter-active,
.bean-fade-right-leave-active {
  transition-property: opacity, transform;
}

.bean-fade-up-enter,
.bean-fade-up-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.bean-fade-down-enter,
.bean-fade-down-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.bean-fade-left-enter,
.bean-fade-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.bean-fade-right-enter,
.bean-fade-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.bean-slide-up-enter-active,
.bean-slide-up-leave-active,
.bean-slide-down-enter-active,
.bean-slide-down-leave-active,
.bean-slide-left-enter-active,
.bean-slide-left-leave-active,
.bean-slide-right-enter-active,
.bean-slide-right-leave-active {
  transition-property: transform;
}

.bean-slide-up-enter,
.bean-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}

.bean-slide-down-enter,
.bean-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}

.bean-slide-left-enter,
.bean-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.bean-slide-right-enter,
.bean-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
