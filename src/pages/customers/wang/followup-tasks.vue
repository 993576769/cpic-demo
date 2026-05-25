<script setup lang="ts">
import { followupTasks } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { computed, ref } from 'vue';

const tabs = ['问题研究', '沟通联系', '材料准备', '方案准备'];
const activeTab = ref('问题研究');
const selectedIds = ref<string[]>([]);

const allSelected = computed(() => selectedIds.value.length === followupTasks.length);

function toggleTask(id: string) {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter(item => item !== id)
    : [...selectedIds.value, id];
}

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : followupTasks.map(task => task.id);
}
</script>

<template>
  <common-demo-page title="下一步事项">
    <scroll-view scroll-x class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="reset-btn tab-pill"
        :class="{ 'is-active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </scroll-view>

    <view
      v-for="task in followupTasks"
      :key="task.id"
      class="task-card"
    >
      <button
        class="reset-btn checkbox"
        :class="{ 'is-checked': selectedIds.includes(task.id) }"
        @click="toggleTask(task.id)"
      >
        ✓
      </button>
      <div class="task-card__main">
        <text class="task-card__title">
          {{ task.title }}
        </text>
        <text class="task-card__desc">
          {{ task.desc }}
        </text>
        <div class="task-card__footer">
          <text>{{ task.deadline }}</text>
          <button class="reset-btn edit-button" @click="showToast('建设中')">
            编辑
          </button>
        </div>
      </div>
    </view>

    <text class="hint">
      这些 to do 会出现在“今日事项”中
    </text>

    <div class="bottom-actions padding-bottom-safe-area">
      <button class="reset-btn select-button" @click="toggleAll">
        {{ allSelected ? '取消全选' : '全选' }}
      </button>
      <button class="reset-btn add-button" @click="nav.nav('/customers/wang/todo-list')">
        添加到待办事项
      </button>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  margin-bottom: 12px;
  white-space: nowrap;
}

.tab-pill {
  height: 36px;
  padding: 0 14px;
  margin-right: 8px;
  border-radius: 18px;
  background: #fff;
  font-size: 13px;
}

.tab-pill.is-active {
  background: #111;
  color: #fff;
}

.task-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  margin-bottom: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.checkbox {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  border: 1px solid #111;
  border-radius: 4px;
  color: transparent;
}

.checkbox.is-checked {
  background: #111;
  color: #fff;
}

.task-card__main {
  flex: 1;
  min-width: 0;
}

.task-card__title,
.task-card__desc,
.hint {
  display: block;
}

.task-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}

.task-card__desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.task-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12px;
  color: #333;
}

.edit-button {
  height: 24px;
  padding: 0 10px;
  border: 1px solid #111;
  border-radius: 12px;
  background: #fff;
}

.hint {
  margin: 10px 0 90px;
  font-size: 13px;
  color: #333;
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 10px;
  padding: 10px;
  background: #fff;
}

.select-button,
.add-button {
  height: 48px;
  border-radius: 14px;
  font-size: 15px;
}

.select-button {
  border: 1px solid #e5e7eb;
  background: #fff;
}

.add-button {
  background: #111;
  color: #fff;
}
</style>
