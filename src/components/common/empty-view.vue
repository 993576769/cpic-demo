<script lang="ts" setup>
import EmptyImage from '@/static/empty/data.png';

interface Props {
  text?: string;
  image?: string;
}
withDefaults(
  defineProps<Props>(),
  {
    text: '暂无数据',
    image: EmptyImage,
  },
);
</script>

<template>
  <div class="empty-view item-center">
    <image class="empty-img" :src="image" mode="widthFix" />
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss">
  .empty-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20vh;
    padding-bottom: 20vh;
    color: #999;

    .empty-img {
      width: 70px;
      height: 70px;
      margin-bottom: 15px;
    }
  }
</style>
