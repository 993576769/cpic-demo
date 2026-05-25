<script setup lang="ts">
import type { TodoItem, TodoTab, TodoTabKey } from './types';
import PanelShell from './PanelShell.vue';
import SegmentControl from './SegmentControl.vue';

defineProps<{
  tabs: TodoTab[];
  activeTab: TodoTabKey;
  items: TodoItem[];
}>();

const emit = defineEmits<{
  changeTab: [value: TodoTabKey];
  toggle: [id: string];
  open: [url?: string];
}>();
</script>

<template>
  <PanelShell title="今日事项">
    <SegmentControl
      :tabs="tabs"
      :active="activeTab"
      scrollable
      @change="emit('changeTab', $event)"
    />

    <div class="todo-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="todo-card"
        :class="{ 'is-done': item.done }"
      >
        <button
          class="reset-btn todo-card__check"
          :class="{ 'is-checked': item.done }"
          @click="emit('toggle', item.id)"
        >
          <text v-if="item.done">
            ✓
          </text>
        </button>

        <div class="todo-card__body">
          <div class="todo-card__topline">
            <text class="todo-card__title">
              {{ item.title }}
            </text>
            <view v-if="item.meta" class="todo-card__divider" />
            <text v-if="item.meta" class="todo-card__meta">
              {{ item.meta }}
            </text>
          </div>
          <text class="todo-card__desc">
            {{ item.desc }}
          </text>
        </div>

        <button
          v-if="item.action"
          class="reset-btn todo-card__action"
          @click="emit('open', item.url)"
        >
          <text>{{ item.action }}</text>
        </button>
      </div>
    </div>
  </PanelShell>
</template>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-card {
  display: flex;
  align-items: center;
  min-height: 62px;
  padding: 11px 12px;
  background: #f7f8fa;
  border-radius: 14px;
  box-sizing: border-box;
}

.todo-card.is-done {
  opacity: 0.5;
}

.todo-card__check {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  margin-right: 13px;
  border: 1.5px solid #111;
  border-radius: 50%;
  background: $white-color;
  box-sizing: border-box;
  font-size: 11px;
  line-height: 17px;
  color: $white-color;
}

.todo-card__check.is-checked {
  background: #000;
}

.todo-card__body {
  flex: 1;
  min-width: 0;
}

.todo-card__topline {
  display: flex;
  align-items: center;
  min-width: 0;
}

.todo-card__title {
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #101828;
}

.todo-card__divider {
  flex: 0 0 auto;
  width: 1px;
  height: 16px;
  margin: 0 12px;
  background: #d1d5dc;
}

.todo-card__meta,
.todo-card__desc {
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #99a1af;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-card__desc {
  margin-top: 1px;
  color: #4a5565;
}

.todo-card.is-done .todo-card__desc,
.todo-card.is-done .todo-card__title {
  color: #666;
}

.todo-card__action {
  flex: 0 0 auto;
  width: 71px;
  height: 26px;
  margin-left: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: $white-color;
  box-sizing: border-box;
  font-size: 10px;
  line-height: 12px;
  color: #4a5565;
}
</style>
