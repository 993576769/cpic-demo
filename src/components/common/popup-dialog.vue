<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  title: string;
  content: string;
  closeOnClickOverlay: boolean;
  showCancel: boolean;
  showConfirm: boolean;
  confirmText: string;
  cancelText: string;
  showSuccessIcon?: boolean;
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
  (event: 'cancel'): void;
  (event: 'confirm'): void;
  (event: 'close'): void;
}

withDefaults(
  defineProps<Props>(),
  {
    modelValue: false,
    title: '',
    content: '',
    closeOnClickOverlay: true,
    showCancel: true,
    showConfirm: true,
    confirmText: '确认',
    cancelText: '取消',
  },
);

const emits = defineEmits<Emits>();

function onClose() {
  emits('update:modelValue', false);
  emits('close');
}
</script>

<template>
  <div class="popup-dialog-wrapper">
    <common-popup
      :custom-style="{ borderRadius: '15px', minWidth: '320px', maxWidth: '330px' }"
      :model-value="modelValue"
      :close-on-click-overlay="closeOnClickOverlay"
      @update:model-value="emits('update:modelValue', $event)"
      @update:close-on-click-overlay="emits('update:modelValue', $event)"
    >
      <div class="box-content">
        <div class="close" @click="onClose">
          <img class="icon" src="@/static/icon-close-black.png" />
        </div>
        <div v-if="title" class="title">
          {{ title }}
        </div>
        <div class="content">
          <slot>
            <img v-if="showSuccessIcon" src="@/static/icon-success.png" class="icon-success" />
            <block v-if="content">
              {{ content }}
            </block>
          </slot>
        </div>
        <div class="footer">
          <slot name="footer">
            <block v-if="showCancel">
              <div class="base-btn" @click="emits('cancel')">
                {{ cancelText }}
              </div>
            </block>
            <block v-if="showConfirm">
              <div class="base-btn primary" @click="emits('confirm')">
                {{ confirmText }}
              </div>
            </block>
          </slot>
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
.popup-dialog-wrapper {
  .box-content {
    padding: 25px 22px 22px;
    border-radius: 20px;

    .close {
      position: absolute;
      top: 2px;
      right: 0;
      padding: 15px;

      .icon {
        width: 12px;
        height: 12px;
      }
    }

    .title {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
      font-weight: bold;
      font-size: 18px;
    }

    .icon-success {
      width: 60px;
      height: 60px;
      margin-bottom: 14px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: auto;
      padding: 0 14px 20px;
      font-size: 15px;
      line-height: 30px;
      text-align: center;
      white-space: pre-wrap;
      color: #030000;
    }

    .footer {
      display: flex;
      justify-content: center;

      .base-btn {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        max-width: 135px;
        height: 45px;
        padding: 0 10px;
        border: 1px solid #000;
        border-radius: 22.5px;
        font-weight: bold;
        font-size: 16px;

        &:not(:last-child) {
          margin-right: 5px;
        }
      }

      .primary {
        color: $white-color;
        background-color: $black-color;
      }
    }
  }
}
</style>
