<script setup lang="ts">
import type { ToolItem } from './types';
import PanelShell from './PanelShell.vue';

defineProps<{
  tools: ToolItem[];
}>();

const emit = defineEmits<{
  open: [url?: string];
}>();
</script>

<template>
  <PanelShell title="快捷工具">
    <div class="tool-grid">
      <button
        v-for="tool in tools"
        :key="tool.title"
        class="reset-btn tool-card"
        @click="emit('open', tool.url)"
      >
        <text class="tool-card__title">
          {{ tool.title }}
        </text>
        <text class="tool-card__desc">
          {{ tool.desc }}
        </text>
      </button>
    </div>
  </PanelShell>
</template>

<style lang="scss" scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.tool-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 87px;
  padding: 14px 18px;
  background: #f7f8fa;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
}

.tool-card__title {
  font-size: 12px;
  font-weight: 600;
  line-height: 100%;
  color: #333;
}

.tool-card__desc {
  margin-top: 6px;
  font-size: 10px;
  line-height: 16px;
  color: #666;
}
</style>
