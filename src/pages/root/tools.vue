<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const tools = [
  { title: '素材库', icon: '□', span: 1, url: '/material' },
  { title: '待办事项 AI生成', icon: '✓', span: 1, url: '/customers/wang/visit-record' },
  { title: '发布朋友圈', icon: '◎', span: 2, url: '/material/moments/publish' },
  { title: '用户旅程管理', icon: '↻', span: 1, url: '/journey' },
  { title: '运营任务', icon: '●', span: 1, url: '/operation' },
  { title: '订单查询', icon: '#', span: 1 },
  { title: '离职分配', icon: '→', span: 1 },
  { title: '活动邀请', desc: '新活动会即将开始', icon: '◇', span: 2, url: '/activity' },
];

function openTool(url?: string) {
  if (url === undefined) {
    showToast('建设中');
    return;
  }

  nav.nav(url);
}
</script>

<template>
  <common-demo-page title="工具箱" tab-bar="tools" :show-back="false">
    <div class="tool-grid">
      <button
        v-for="tool in tools"
        :key="tool.title"
        class="reset-btn tool-card"
        :class="{ 'tool-card--wide': tool.span === 2 }"
        @click="openTool(tool.url)"
      >
        <span class="tool-card__icon">{{ tool.icon }}</span>
        <span class="tool-card__main">
          <text class="tool-card__title">{{ tool.title }}</text>
          <text v-if="tool.desc" class="tool-card__desc">{{ tool.desc }}</text>
        </span>
      </button>
    </div>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
}

.tool-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  min-height: 74px;
  padding: 16px 14px;
  border-radius: 8px;
  background: #fff;
  text-align: left;
}

.tool-card--wide {
  grid-column: span 2;
}

.tool-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f3f4f6;
  font-size: 20px;
  color: #111;
}

.tool-card__main,
.tool-card__title,
.tool-card__desc {
  display: block;
}

.tool-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: #333;
}

.tool-card__desc {
  margin-top: 3px;
  font-size: 12px;
  line-height: 17px;
  color: #ed6c00;
}
</style>
