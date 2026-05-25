export type TodoTabKey = 'all' | 'communication' | 'visit' | 'research' | 'mass';
export type RecommendTabKey = 'customers' | 'content' | 'activities';

export interface TodoTab {
  key: TodoTabKey;
  label: string;
}

export interface RecommendTab {
  key: RecommendTabKey;
  label: string;
}

export interface TodoItem {
  id: string;
  tab: TodoTabKey;
  title: string;
  meta: string;
  desc: string;
  action?: string;
  done: boolean;
  url?: string;
}

export interface CustomerCard {
  id: string;
  customerId: string;
  name: string;
  level: string;
  tags: string[];
  date: string;
}

export interface TopicCard {
  index: number;
  title: string;
  reason: string;
  platform: string;
  format: string;
}

export interface ActivityCard {
  id: string;
  title: string;
  scene: string;
  deadline: string;
  quota: string;
  icon: 'friends' | 'event';
}

export interface ToolItem {
  title: string;
  desc: string;
  url?: string;
}
