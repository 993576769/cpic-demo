<script setup lang="ts">
import type { RecommendTabKey, TodoItem, TodoTabKey } from './home/types';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { computed, ref } from 'vue';
import {
  activityCards,
  customerCards,
  enterpriseTopics,
  initialTodoItems,
  recommendTabs,
  todoTabs,
  tools,
  topicCards,
} from './home/data';
import RecommendationPanel from './home/RecommendationPanel.vue';
import TodayPanel from './home/TodayPanel.vue';
import ToolsPanel from './home/ToolsPanel.vue';

const todoItems = ref<TodoItem[]>(initialTodoItems.map(item => ({ ...item })));
const activeTodoTab = ref<TodoTabKey>('all');
const activeRecommendTab = ref<RecommendTabKey>('customers');

const visibleTodoItems = computed(() => {
  if (activeTodoTab.value === 'all') {
    return todoItems.value;
  }

  return todoItems.value.filter(item => item.tab === activeTodoTab.value);
});

function toggleTodo(id: string) {
  const target = todoItems.value.find(item => item.id === id);
  if (target === undefined) {
    return;
  }

  target.done = !target.done;
}

function openUrl(url?: string) {
  if (url === undefined) {
    showToast('建设中');
    return;
  }

  nav.nav(url);
}
</script>

<template>
  <div class="home-page">
    <view class="home-page__content">
      <TodayPanel
        :tabs="todoTabs"
        :active-tab="activeTodoTab"
        :items="visibleTodoItems"
        @change-tab="activeTodoTab = $event"
        @toggle="toggleTodo"
        @open="openUrl"
      />

      <RecommendationPanel
        :tabs="recommendTabs"
        :active-tab="activeRecommendTab"
        :customers="customerCards"
        :enterprise-topics="enterpriseTopics"
        :topics="topicCards"
        :activities="activityCards"
        @change-tab="activeRecommendTab = $event"
        @open="openUrl"
        @fallback="showToast('建设中')"
      />

      <ToolsPanel :tools="tools" @open="openUrl" />
    </view>

    <common-tab-bar active="home" />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  padding: 12px 0 84px;
  background: #f5f5f7;
  box-sizing: border-box;
  color: #101828;
}

.home-page__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
