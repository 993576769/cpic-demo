<script lang="ts" setup>
import { computed, ref } from 'vue';
import { AxiosError, isAxiosError } from 'axios';
import { authStore } from '@/stores/auth';
import { nav } from '@/utils/nav';
import { t } from '@/i18n';

interface Props {
  onFetch: Function;
  usedCustomNav?: boolean;
  auth?: boolean;
  /** 是否需要返回按钮 */
  showBack?: boolean;
}
const props = withDefaults(
  defineProps<Props>(),
  {
    usedCustomNav: false,
    auth: true,
    showBack: true,
  },
);

const loading = ref(false);
const errMsg = ref<AxiosError['message'] | Error['message'] | undefined>();
const errStatus = ref<AxiosError['status'] | undefined>();
const errCode = ref<number | undefined>();

async function handleLoad() {
  loading.value = true;
  errMsg.value = undefined;
  errStatus.value = undefined;
  errCode.value = undefined;

  try {
    if (props.auth) {
      await authStore.tryFetchData();
    }

    await Promise.all([
      props.onFetch(),
    ]);
  } catch (err) {
    if (isAxiosError(err)) {
      // 断网
      if (err.code === AxiosError.ERR_NETWORK) {
        errMsg.value = t('error.offline');
        return;
      }

      // 超时
      if (err.code === AxiosError.ETIMEDOUT) {
        errMsg.value = t('error.timeout');
        return;
      }

      const errStatus = err.response?.status;
      errCode.value = err.response?.data.code;
      if (errStatus === 401) {
        errMsg.value = err.response?.data.error_message;
        return;
      }

      if (errStatus === 404) {
        errMsg.value = t('error.404');
        return;
      }

      if (typeof errStatus === 'number' && errStatus >= 500) {
        errMsg.value = t('error.server', { status: errStatus });
        return;
      }

      const msgText = err.response?.data.error_message || err.response?.data.error || err.message;
      errMsg.value = msgText;
    } else if (err instanceof Error) {
      errMsg.value = err.message;
    }
  } finally {
    loading.value = false;
  }
}
handleLoad();

const positionTop = computed(() => {
  const { bottom } = uni.getMenuButtonBoundingClientRect();
  return props.usedCustomNav ? `${bottom + 7}px` : '0px';
});
</script>

<template>
  <div
    v-if="loading"
    class="common-loading-screen loading"
    :class="{ fixed: !$slots.default }"
    :style="$slots.default ? {} : { paddingTop: `calc(${positionTop} + 20px)` }"
  >
    <common-loading />
  </div>
  <div
    v-else-if="errMsg || errStatus || errCode"
    class="common-loading-screen error"
    :class="{ fixed: !$slots.default }"
    :style="$slots.default ? {} : { paddingTop: `calc(${positionTop} + 50px)` }"
  >
    <img class="icon" mode="aspectFit" src="/static/icon-warning.png" />

    <span class="message">{{ errMsg }}</span>

    <div class="action-btns">
      <button v-if="props.showBack" class="btn-block back" @click="nav.navigateBack">
        {{ $t('global.back') }}
      </button>
    </div>
  </div>
  <slot v-else></slot>
</template>

<style scoped lang="scss">
.common-loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  background: #fff;

  &.fixed {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100%;
  }

  .icon {
    width: 60px;
    height: 60px;
  }

  .message {
    margin: 21px 10px 0;
    font-size: 14px;
    color: #f94544;
  }

  .action-btns {
    display: flex;
    align-items: center;
    margin-top: 48.5px;

    .btn-block {
      width: 135px;

      &:not(:last-child) {
        margin-right: 5px;
      }

      &.reload {
        border: 1px solid #000;
        color: #000;
        background: transparent;
      }
    }
  }
}
</style>
