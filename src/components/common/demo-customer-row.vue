<script setup lang="ts">
import type { CustomerRow } from '@/pages/demo-data';

defineProps<{
  customer: CustomerRow;
}>();

function getBadgeClass(badge: string) {
  if (badge === 'VIP') {
    return 'is-vip';
  }

  if (badge.includes('预警')) {
    return 'is-warning';
  }

  return 'is-dark';
}

function getBadges(customer: CustomerRow) {
  return customer.badges ?? (customer.badge ? [customer.badge] : []);
}
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
        <text
          v-for="badge in getBadges(customer)"
          :key="badge"
          class="customer-row__badge"
          :class="getBadgeClass(badge)"
        >
          {{ badge }}
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
      <image
        class="customer-row__arrow"
        mode="aspectFit"
        src="/static/customer/icon-chevron-right.svg"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 86px;
  padding: 12px 14px;
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
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f7f7f7;
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
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
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #1a1a1a;
}

.customer-row__badge {
  padding: 2px 6px;
  border-radius: 9px;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
}

.customer-row__badge.is-dark {
  background: #111;
}

.customer-row__badge.is-vip {
  background: #fbf5eb;
  color: #b8924a;
}

.customer-row__badge.is-warning {
  background: #111;
}

.customer-row__meta {
  display: block;
  margin-top: 3px;
  font-size: 10px;
  line-height: 16px;
  color: #aaa;
}

.customer-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
}

.customer-row__tags text {
  padding: 2px 7px;
  border-radius: 7px;
  background: #f7f7f7;
  font-size: 10px;
  line-height: 14px;
  color: #888;
}

.customer-row__right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 10px;
  line-height: 16px;
  color: #000;
}

.customer-row__arrow {
  width: 14px;
  height: 14px;
}
</style>
