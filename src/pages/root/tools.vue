<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

type ToolKey =
  | 'material'
  | 'todo'
  | 'moments'
  | 'journey'
  | 'operation'
  | 'order'
  | 'resign'
  | 'activity';

interface ToolItem {
  key: ToolKey;
  title: string;
  desc?: string;
  icon: string;
  size: 'large' | 'wide' | 'small';
  url?: string;
}

const tools: ToolItem[] = [
  {
    key: 'material',
    title: '素材库',
    icon: '/static/tools/icon-material.svg',
    size: 'large',
    url: '/material',
  },
  {
    key: 'todo',
    title: '待办事项\nAI生成',
    icon: '/static/tools/icon-todo.svg',
    size: 'large',
    url: '/todo-ai',
  },
  {
    key: 'moments',
    title: '发布朋友圈',
    icon: '/static/tools/icon-moments.svg',
    size: 'wide',
    url: '/material/moments/publish',
  },
  {
    key: 'journey',
    title: '用户旅程管理',
    icon: '/static/tools/icon-journey.svg',
    size: 'small',
    url: '/journey',
  },
  {
    key: 'operation',
    title: '运营任务',
    icon: '/static/tools/icon-operation.svg',
    size: 'small',
    url: '/operation',
  },
  {
    key: 'order',
    title: '订单查询',
    icon: '/static/tools/icon-order.svg',
    size: 'small',
  },
  {
    key: 'resign',
    title: '离职分配',
    icon: '/static/tools/icon-resign.svg',
    size: 'small',
  },
  {
    key: 'activity',
    title: '活动邀请',
    desc: '新活动会即将开始',
    icon: '/static/tools/icon-activity.svg',
    size: 'wide',
    url: '/activity',
  },
];

function openTool(tool: ToolItem) {
  if (tool.url === undefined) {
    showToast('建设中');
    return;
  }

  nav.nav(tool.url);
}
</script>

<template>
  <common-demo-page
    title="工具箱"
    tab-bar="tools"
    :show-back="false"
    :padded="false"
  >
    <view class="tool-layout">
      <button
        v-for="tool in tools"
        :key="tool.key"
        class="reset-btn tool-card"
        :class="[`tool-card--${tool.size}`, `tool-card--${tool.key}`]"
        @click="openTool(tool)"
      >
        <image
          class="tool-card__icon"
          mode="aspectFit"
          :src="tool.icon"
        />
        <view class="tool-card__copy">
          <text class="tool-card__title">
            {{ tool.title }}
          </text>
          <text v-if="tool.desc" class="tool-card__desc">
            {{ tool.desc }}
          </text>
        </view>
      </button>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.tool-layout {
  display: grid;
  grid-template-columns: repeat(2, 167px);
  justify-content: center;
  gap: 11px;
  padding: 15px 15px 0;
  box-sizing: border-box;
}

.tool-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 0;
  background: #fff;
  text-align: left;
  overflow: hidden;
}

.tool-card--large {
  align-items: flex-start;
  height: 130px;
  padding: 45px 10px 0;
}

.tool-card--wide {
  grid-column: span 2;
  height: 74px;
  padding: 0 10px;
}

.tool-card--small {
  height: 74px;
  padding: 0 10px;
}

.tool-card__icon {
  flex: 0 0 48px;
  width: 40px;
  height: 40px;
  margin-right: 0;
}

.tool-card--order .tool-card__icon {
  width: 27px;
  height: 27px;
}

.tool-card--resign .tool-card__icon {
  width: 22px;
  height: 22px;
}

.tool-card__copy,
.tool-card__title,
.tool-card__desc {
  display: block;
}

.tool-card__copy {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: 0;
  text-align: left;
}

.tool-card__title {
  white-space: pre-line;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #333;
}

.tool-card--todo .tool-card__title,
.tool-card--journey .tool-card__title,
.tool-card--operation .tool-card__title {
  font-size: 15px;
  line-height: 21px;
  font-weight: 600;
}

.tool-card--material .tool-card__copy {
  padding-top: 10px;
}

.tool-card__desc {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  color: #ed6c00;
}
</style>
