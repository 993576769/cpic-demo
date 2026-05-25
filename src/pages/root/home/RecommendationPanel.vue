<script setup lang="ts">
import type { ActivityCard, CustomerCard, RecommendTab, RecommendTabKey, TopicCard } from './types';
import ActivityRecommendations from './ActivityRecommendations.vue';
import ContentRecommendations from './ContentRecommendations.vue';
import CustomerRecommendations from './CustomerRecommendations.vue';
import PanelShell from './PanelShell.vue';
import SegmentControl from './SegmentControl.vue';

defineProps<{
  tabs: RecommendTab[];
  activeTab: RecommendTabKey;
  customers: CustomerCard[];
  enterpriseTopics: string[];
  topics: TopicCard[];
  activities: ActivityCard[];
}>();

const emit = defineEmits<{
  changeTab: [value: RecommendTabKey];
  open: [url?: string];
  fallback: [];
}>();
</script>

<template>
  <PanelShell title="为你推荐 ✨">
    <SegmentControl
      :tabs="tabs"
      :active="activeTab"
      @change="emit('changeTab', $event)"
    />

    <CustomerRecommendations
      v-if="activeTab === 'customers'"
      :customers="customers"
      @open="emit('open', $event)"
    />
    <ContentRecommendations
      v-else-if="activeTab === 'content'"
      :enterprise-topics="enterpriseTopics"
      :topics="topics"
      @open="emit('open', $event)"
      @fallback="emit('fallback')"
    />
    <ActivityRecommendations
      v-else
      :activities="activities"
      @open="emit('open', $event)"
    />
  </PanelShell>
</template>
