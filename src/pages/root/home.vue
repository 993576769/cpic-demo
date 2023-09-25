<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('Hello');

function handleBtnClick() {
  title.value = import.meta.env.VITE_APP_API_ORIGIN as string;
}
</script>

<template>
  <div class="page">
    <common-example />

    <button class="reset-btn btn" @click="handleBtnClick">
      <img class="logo" mode="apsectFit" src="@/static/imgs/logo.png" />
      {{ title }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .btn {
    $width: 375px;

    width: $width;
    background: $primary-color;

    .logo {
      width: 100px;
      height: 100px;
    }
  }
</style>
