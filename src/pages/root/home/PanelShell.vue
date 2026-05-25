<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <view class="panel">
    <div class="panel__header">
      <text class="panel__title">
        {{ title }}
      </text>
    </div>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.panel {
  padding: 14px 10px 16px;
  background: $white-color;
  border-radius: 4px;
  box-sizing: border-box;
}

.panel__header {
  padding-bottom: 13px;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.panel__title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #101828;
}
</style>
