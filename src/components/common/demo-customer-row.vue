<script setup lang="ts">
import type { CustomerRow } from '@/pages/demo-data';

defineProps<{
  customer: CustomerRow;
}>();
</script>

<template>
  <div class="customer-row">
    <div class="customer-row__avatar">
      {{ customer.avatar }}
    </div>
    <div class="customer-row__main">
      <div class="customer-row__headline">
        <text class="customer-row__name">
          {{ customer.name }}
        </text>
        <text v-if="customer.badge" class="customer-row__badge">
          {{ customer.badge }}
        </text>
      </div>
      <text class="customer-row__meta">
        {{ customer.company }} · {{ customer.lastContact }}
      </text>
      <div class="customer-row__tags">
        <text v-for="tag in customer.tags" :key="tag">
          {{ tag }}
        </text>
      </div>
    </div>
    <div class="customer-row__right">
      <text>{{ customer.premium }}</text>
      <text>›</text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 96px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.customer-row:last-child {
  border-bottom: 0;
}

.customer-row__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #111;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.customer-row__main {
  flex: 1;
  min-width: 0;
}

.customer-row__headline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-row__name {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: #111;
}

.customer-row__badge {
  padding: 2px 6px;
  border-radius: 9px;
  background: #111;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
}

.customer-row__meta {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.customer-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 7px;
}

.customer-row__tags text {
  padding: 2px 7px;
  border-radius: 10px;
  background: #f3f4f6;
  font-size: 10px;
  line-height: 15px;
  color: #4a5565;
}

.customer-row__right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 12px;
  color: #666;
}
</style>
