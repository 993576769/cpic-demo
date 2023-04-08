<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const src = ref('');

onLoad((query) => {
  const { scene } = uni.getLaunchOptionsSync();
  src.value = query?.src ? decodeURIComponent(query.src) : `${import.meta.env.VITE_APP_API_ORIGIN}${scene}`;
});

// TODO
function handleMessage() {}

// TODO: 分享
</script>

<template>
  <web-view :src="src" @message="handleMessage" />
</template>
