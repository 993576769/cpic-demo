<script setup lang="ts" generic="T extends string">
defineProps<{
  tabs: Array<{
    key: T;
    label: string;
  }>;
  active: T;
  scrollable?: boolean;
}>();

const emit = defineEmits<{
  change: [value: T];
}>();
</script>

<template>
  <div class="segment" :class="{ 'is-scrollable': scrollable }">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="reset-btn segment__button"
      :class="{ 'is-active': active === tab.key }"
      @click="emit('change', tab.key)"
    >
      <text class="segment__label">
        {{ tab.label }}
      </text>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.segment {
  display: flex;
  gap: 2px;
  width: 100%;
  padding: 4px;
  margin-bottom: 10px;
  background: #f3f4f6;
  border-radius: 14px;
  box-sizing: border-box;
}

.segment.is-scrollable {
  overflow-x: auto;
}

.segment__button {
  flex: 1 1 0;
  min-width: 0;
  height: 28px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 12px;
  line-height: 16px;
  color: #666;
  text-align: center;
  white-space: nowrap;
}

.segment__label {
  display: block;
  width: 100%;
  overflow: hidden;
  font-size: inherit;
  line-height: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
}

.is-scrollable .segment__button {
  flex: 1 0 0;
  min-width: 48px;
  padding: 0 6px;
}

.segment__button.is-active {
  color: $white-color;
  background: #101828;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}
</style>
