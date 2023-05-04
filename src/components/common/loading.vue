<script lang="ts" setup>
interface Props {
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: '加载中...',
});
</script>

<template>
  <div class="common-loading">
    <div class="spinner"></div>
    <div v-if="props.text?.trim()" class="text">
      {{ props.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
$spinner-color: #000;
$spinner-size: 30px;

.common-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .spinner {
    width: $spinner-size;
    height: $spinner-size;
    border: solid 0.15em rgba($spinner-color, 0.2);
    border-top-color: $spinner-color;
    border-radius: 50%;
    animation: loading-spin 1s linear infinite;
  }

  .text {
    margin-top: 20px;
    color: #000;
  }

  @keyframes loading-spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
