<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    meta?: string;
    size?: 'default' | 'compact' | 'plain';
  }>(),
  {
    subtitle: '',
    meta: '',
    size: 'default',
  },
);
</script>

<template>
  <view class="page-heading" :class="`page-heading--${size}`">
    <text class="page-heading__title">
      {{ title }}
    </text>
    <text v-if="subtitle" class="page-heading__subtitle">
      {{ subtitle }}
    </text>
    <text v-if="meta" class="page-heading__meta">
      {{ meta }}
    </text>
  </view>
</template>

<style lang="scss" scoped>
.page-heading {
  background: #fff;
  box-sizing: border-box;
}

.page-heading--default {
  height: 94px;
  padding: 23px 20px 0;
}

.page-heading--compact {
  height: 133px;
  padding: 29px 21px 0;
}

.page-heading--plain {
  height: 48px;
  padding: 16px 14px 0;
}

.page-heading__title,
.page-heading__subtitle,
.page-heading__meta {
  display: block;
}

.page-heading__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333;
}

.page-heading--plain .page-heading__title {
  font-size: 16px;
  line-height: 24px;
  color: #0a0a0a;
}

.page-heading__subtitle,
.page-heading__meta {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #999;
}

.page-heading__subtitle {
  margin-top: 8px;
}

.page-heading--compact .page-heading__subtitle {
  margin-top: 5px;
}

.page-heading__meta {
  margin-top: 17px;
}
</style>
