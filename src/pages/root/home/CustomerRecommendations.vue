<script setup lang="ts">
import type { CustomerCard } from './types';

defineProps<{
  customers: CustomerCard[];
}>();

const emit = defineEmits<{
  open: [url?: string];
}>();
</script>

<template>
  <div class="customer-recommendations">
    <view v-for="customer in customers" :key="customer.id" class="birthday-card">
      <image
        class="birthday-card__decoration"
        mode="aspectFit"
        src="/static/home/birthday-decoration-56586a.png"
      />

      <div class="birthday-card__top">
        <text class="birthday-card__name">
          {{ customer.name }}
        </text>
        <view class="birthday-card__divider" />
        <text class="customer-level">
          {{ customer.level }}
        </text>
      </div>

      <div class="customer-tags">
        <text v-for="tag in customer.tags" :key="tag">
          {{ tag }}
        </text>
      </div>

      <div class="birthday-card__footer">
        <text class="birthday-card__date">
          {{ customer.date }}
        </text>
        <button class="reset-btn primary-pill" @click="emit('open', `/customers/${customer.customerId}`)">
          <text>定制贺卡</text>
        </button>
      </div>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.customer-recommendations {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 8px;
}

.birthday-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14.57px;
  min-height: 164px;
  padding: 21.85px;
  overflow: hidden;
  background: $white-color;
  border-radius: 14.57px;
  box-shadow: 0 3.64px 9.11px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.birthday-card__decoration {
  position: absolute;
  top: -40px;
  right: -24px;
  width: 175.75px;
  height: 175.75px;
  opacity: 0.3;
}

.birthday-card__top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 10.93px;
}

.birthday-card__name {
  flex: 0 0 auto;
  font-size: 14.57px;
  font-weight: 600;
  line-height: 21.85px;
  color: #0b1c30;
}

.birthday-card__divider {
  flex: 0 0 auto;
  width: 1px;
  height: 14.57px;
  background: #c6c6cc;
}

.customer-level {
  flex: 0 0 auto;
  width: 70.12px;
  height: 20.03px;
  border-radius: 999px;
  background: #101828;
  font-size: 9.11px;
  line-height: 20.03px;
  text-align: center;
  color: $white-color;
}

.customer-tags {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 7.28px;
}

.customer-tags text {
  height: 20.49px;
  padding: 0 8.2px;
  border: 0.91px solid #99a1af;
  border-radius: 999px;
  box-sizing: border-box;
  font-size: 10.02px;
  line-height: 20.49px;
  color: #4a5565;
}

.birthday-card__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  align-self: stretch;
  padding-top: 14.57px;
}

.birthday-card__date {
  font-size: 12px;
  font-weight: 600;
  line-height: 21.85px;
  color: #000;
}

.primary-pill {
  width: 92px;
  height: 34px;
  border-radius: 10px;
  background: #000;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: $white-color;
}
</style>
