<script setup lang="ts">
import { followupTasks } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { computed, ref } from 'vue';

const tabs = ['问题研究', '沟通联系', '材料准备', '方案准备'];
const activeTab = ref(tabs[0]);
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
  <view class="todo-ai-task-page">
    <common-demo-page
      title="下一步事项"
      :padded="false"
    >
      <view class="todo-ai-tabs" role="tablist" aria-label="待办类型">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="reset-btn todo-ai-tabs__item"
          :class="{ 'is-active': activeTab === tab }"
          role="tab"
          :aria-selected="activeTab === tab"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </view>

      <view class="todo-task-list">
        <view
          v-for="task in followupTasks"
          :key="task.id"
          class="todo-task-card"
        >
          <button
            class="reset-btn todo-task-card__checkbox"
            :class="{ 'is-checked': selectedIds.includes(task.id) }"
            @click="toggleTask(task.id)"
          >
            <view class="todo-task-card__checkmark" />
          </button>

          <view class="todo-task-card__main">
            <text class="todo-task-card__title">
              {{ task.title }}
            </text>
            <text class="todo-task-card__desc">
              {{ task.desc }}
            </text>
            <view class="todo-task-card__footer">
              <text class="todo-task-card__deadline">
                {{ task.deadline }}
              </text>
              <button class="reset-btn todo-task-card__edit" @click="nav.nav('/customers/wang/followup')">
                编辑
              </button>
            </view>
          </view>
        </view>

        <text class="todo-task-hint">
          这些to do会出现在”今日事项“中
        </text>
      </view>

      <common-button-fixed-bottom bg-color="#fff">
        <view class="todo-bottom-actions">
          <button class="reset-btn select-button" @click="toggleAll">
            {{ allSelected ? '取消全选' : '全选' }}
          </button>
          <button class="reset-btn add-button" @click="nav.nav('/customers/wang/todo-list')">
            添加到待办事项
          </button>
        </view>
      </common-button-fixed-bottom>
    </common-demo-page>
  </view>
</template>

<style lang="scss" scoped>
.todo-ai-task-page {
  min-height: 100vh;
  background: #fff;
}

.todo-ai-task-page :deep(.demo-page),
.todo-ai-task-page :deep(.demo-page__body) {
  min-height: 100vh;
  background: #fff;
}

.todo-ai-task-page :deep(.page-heading--plain) {
  padding-right: 17px;
  padding-left: 17px;
}

.todo-ai-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 326px;
  height: 36px;
  padding: 4px;
  margin: 10px 0 17px 19px;
  border-radius: 14px;
  background: #f3f4f6;
  box-sizing: border-box;
}

.todo-ai-tabs__item {
  height: 28px;
  border-radius: 10px;
  background: transparent;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #6a7282;
}

.todo-ai-tabs__item.is-active {
  background: #101828;
  color: #fff;
}

.todo-task-list {
  padding: 0 19px 170px;
  box-sizing: border-box;
}

.todo-task-card {
  display: flex;
  width: 335px;
  height: 92px;
  padding: 14px 21px 12px 12px;
  margin: 0 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}

.todo-task-card__checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 13px;
  width: 13px;
  height: 13px;
  margin: 2px 7px 0 0;
  border: 1px solid #000;
  border-radius: 2px;
  background: #fff;
  box-sizing: border-box;
}

.todo-task-card__checkbox.is-checked {
  background: #101828;
}

.todo-task-card__checkmark {
  display: none;
  width: 13px;
  height: 13px;
  background-image: url("/static/journey/icon-checkbox-check.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px 13px;
}

.todo-task-card__checkbox.is-checked .todo-task-card__checkmark {
  display: block;
}

.todo-task-card__main {
  flex: 1;
  min-width: 0;
}

.todo-task-card__title,
.todo-task-card__desc,
.todo-task-card__deadline,
.todo-task-hint {
  display: block;
}

.todo-task-card__title {
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}

.todo-task-card__desc {
  overflow: hidden;
  width: 264px;
  margin-top: 2px;
  margin-left: 1px;
  font-size: 11px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.todo-task-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
}

.todo-task-card__deadline {
  min-width: 0;
  overflow: hidden;
  margin-left: 1px;
  font-size: 10px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}

.todo-task-card__edit {
  flex: 0 0 46px;
  width: 46px;
  height: 19px;
  margin-left: 8px;
  border: 1px solid #000;
  border-radius: 100px;
  background: #fff;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  color: #333;
}

.todo-task-hint {
  margin-top: 19px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #000;
}

.todo-bottom-actions {
  display: grid;
  grid-template-columns: 85px 1fr;
  gap: 11px;
  padding: 17px 15px;
  background: #fff;
  box-sizing: border-box;
}

.select-button,
.add-button {
  height: 48px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.select-button {
  border: 1px solid #1c1c1e;
  background: #fff;
  color: #000;
}

.add-button {
  border: 1px solid #1c1c1e;
  background: #1c1c1e;
  color: #fff;
}
</style>
