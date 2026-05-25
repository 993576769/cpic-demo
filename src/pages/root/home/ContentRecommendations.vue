<script setup lang="ts">
import type { TopicCard } from './types';

defineProps<{
  enterpriseTopics: string[];
  topics: TopicCard[];
}>();

const emit = defineEmits<{
  open: [url?: string];
  fallback: [];
}>();
</script>

<template>
  <div class="content-recommendations">
    <div class="content-boost">
      <div>
        <text class="content-boost__title">
          这周你已经创造了2篇，继续加油！
        </text>
        <text class="content-boost__desc">
          11月创作激励榜已发布，去看看
        </text>
      </div>
      <button class="reset-btn outline-pill" @click="emit('fallback')">
        <text>排行榜</text>
      </button>
    </div>

    <view class="topic-section enterprise-section">
      <text class="topic-section__title">
        11月选题下发（企业选题）
      </text>
      <div class="enterprise-topic">
        <div v-for="topic in enterpriseTopics" :key="topic" class="enterprise-topic__item">
          <text class="enterprise-topic__prefix">
            #
          </text>
          <text>{{ topic }}</text>
        </div>
      </div>
      <div class="topic-reward">
        <text>发布符合企业主题的内容，可领取激励！</text>
        <button class="reset-btn outline-pill" @click="emit('fallback')">
          <text>去领取</text>
        </button>
      </div>
    </view>

    <view class="topic-section hot-section">
      <text class="topic-section__title">
        热点选题推荐
      </text>
      <view v-for="topic in topics" :key="topic.index" class="topic-card">
        <div class="topic-card__title">
          <text class="topic-card__badge">
            选题 {{ topic.index }}
          </text>
          <text class="topic-card__heading">
            {{ topic.title }}
          </text>
        </div>
        <div class="topic-card__row">
          <text class="topic-card__label">
            推荐原因
          </text>
          <text class="topic-card__value">
            {{ topic.reason }}
          </text>
        </div>
        <div class="topic-card__row">
          <text class="topic-card__label">
            推荐平台
          </text>
          <text class="topic-card__value">
            {{ topic.platform }}
          </text>
        </div>
        <div class="topic-card__row">
          <text class="topic-card__label">
            推荐形式
          </text>
          <text class="topic-card__value">
            {{ topic.format }}
          </text>
        </div>
        <button class="reset-btn topic-card__action" @click="emit('open', '/material/moments/publish')">
          <text>去创作</text>
          <image
            class="topic-card__arrow"
            mode="aspectFit"
            src="/static/home/icon-chevron-right.svg"
          />
        </button>
      </view>
      <button class="reset-btn topic-center" @click="emit('fallback')">
        <text>选题中心</text>
      </button>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.content-recommendations {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 0;
}

.content-boost {
  position: relative;
  min-height: 73px;
  padding: 5px 78px 4px 16px;
  background: #f9fafb;
  border-radius: 2px;
  box-sizing: border-box;
}

.content-boost div {
  display: flex;
  flex-direction: column;
}

.content-boost__title,
.content-boost__desc {
  font-weight: 400;
  color: #000;
}

.content-boost__title {
  font-size: 13px;
  line-height: 32px;
}

.content-boost__desc {
  font-size: 12px;
  line-height: 32px;
}

.content-boost .outline-pill {
  position: absolute;
  right: 17px;
  bottom: 11px;
}

.outline-pill {
  min-width: 46px;
  height: 19px;
  padding: 0 7px;
  border: 1px solid #000;
  border-radius: 999px;
  background: $white-color;
  box-sizing: border-box;
  font-size: 10px;
  line-height: 15px;
  color: #333;
}

.topic-section__title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  line-height: 21px;
  color: #101828;
}

.enterprise-section .topic-section__title,
.hot-section .topic-section__title {
  margin-bottom: 7px;
}

.enterprise-topic {
  height: 122px;
  padding: 18px 17px;
  background: #f9fafb;
  border-radius: 2px;
  box-sizing: border-box;
}

.enterprise-topic__item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 29px;
  font-size: 12px;
  line-height: 19.5px;
  color: #1e2939;
}

.enterprise-topic__prefix {
  flex: 0 0 auto;
  width: 14px;
  font-size: 17px;
  line-height: 14px;
  text-align: center;
  color: #99a1af;
}

.topic-reward {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  padding: 0 14px;
  margin-top: 7px;
  background: #f9fafb;
  border-radius: 4px;
  box-sizing: border-box;
}

.topic-card {
  position: relative;
  min-height: 152px;
  padding: 11px 14px 14px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: $white-color;
  box-sizing: border-box;
}

.topic-card__title {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  margin-bottom: 14px;
}

.topic-card__badge {
  flex: 0 0 auto;
  width: 47px;
  height: 24px;
  border-radius: 6px;
  background: #2b2b2b;
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: $white-color;
}

.topic-card__heading {
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 600;
  line-height: 19.6px;
  color: #1a1a2e;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topic-card__row {
  display: flex;
  gap: 6px;
  margin-top: 7px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.topic-card__label {
  flex: 0 0 48px;
  color: #9b9bad;
}

.topic-card__value {
  flex: 1;
  max-width: 258px;
  color: #444;
}

.topic-card__row:nth-of-type(n + 3) .topic-card__value {
  max-width: 168px;
}

.topic-card__action {
  position: absolute;
  right: 14px;
  bottom: 17px;
  width: 73px;
  height: 28px;
  gap: 2px;
  padding: 0 8px 0 10px;
  border: 1px solid #666;
  border-radius: 8px;
  background: $white-color;
  box-sizing: border-box;
  font-size: 12px;
  color: #666;
}

.topic-card__arrow {
  width: 12px;
  height: 12px;
}

.topic-center {
  display: flex;
  width: 94px;
  height: 34px;
  margin: 16px auto 0;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: $white-color;
  font-size: 12px;
  color: #6b7280;
}
</style>
