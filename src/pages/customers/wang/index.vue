<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { ref } from 'vue';

const expanded = ref(false);
const familyMembers = [
  ['王女士', '本人'],
  ['先生', '公务员'],
  ['大儿子', '6岁·小学'],
  ['小女儿', '3岁·幼儿园'],
];
const profileTags = [
  ['家庭标签', ['宝妈', '二孩家庭', '已婚', '夫妻均有社保']],
  ['子女标签', ['6岁男孩·小学', '3岁女孩·幼儿园']],
  ['高净值标签', ['年收30-50万', '有房有车', '算法工程师']],
  ['健康标签', ['健康状况良好', '有社保', '稳健型风险偏好']],
];
const heatRows = [
  ['最近聊天频率', '近7天5次', 88],
  ['内容点击情况', '点击率高', 84],
  ['活动参与情况', '参与2场活动', 72],
  ['保单状态', '6份活跃保单', 76],
  ['回复行为', '平均回复 < 2小时', 90],
  ['客户活跃时间', '工作日晚间活跃', 68],
  ['历史成交情况', '年保费12,800元', 80],
] as const;
</script>

<template>
  <common-demo-page class="customer-detail-page" title="顾客档案">
    <view class="detail-content">
      <view class="profile-card">
        <div>
          <div class="profile-card__title">
            <text class="profile-card__name">
              王女士
            </text>
            <text class="profile-card__level">
              高价值客户
            </text>
          </div>
          <div class="profile-card__tags">
            <text>宝妈</text>
            <text>二孩家庭</text>
            <text>风险意识高</text>
          </div>
          <text class="profile-card__info">
            手机：180 **** 6666  ⧉
          </text>
          <text class="profile-card__info">
            生日：1994-08-08
          </text>
        </div>
        <div class="profile-card__actions">
          <button class="reset-btn" @click="showToast('已唤起电话')">
            <image mode="aspectFit" src="/static/customer/icon-phone-figma.svg" />
          </button>
          <button class="reset-btn" @click="nav.nav('/customers/wang/followup')">
            <image mode="aspectFit" src="/static/customer/icon-message-figma.svg" />
          </button>
        </div>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          AI 客户热度模型
        </text>
        <div class="score-row">
          <div class="score-row__value">
            <text>82</text>
            <span>综合评分</span>
          </div>
          <div>
            <div class="score-row__title">
              <image mode="aspectFit" src="/static/customer/icon-heat-figma.svg" />
              <span>高热客户</span>
            </div>
            <text class="score-row__desc">
              客户近期聊天频繁，历史成交优质，保单活跃，处于高意向状态，建议优先跟进。
            </text>
          </div>
        </div>
        <div class="heat-list">
          <div
            v-for="row in (expanded ? heatRows : heatRows.slice(0, 3))"
            :key="row[0]"
            class="heat-list__row"
          >
            <div class="heat-list__label">
              <text>{{ row[0] }}</text>
              <span>{{ row[1] }}</span>
            </div>
            <div class="heat-list__track">
              <div :style="{ width: `${row[2]}%` }"></div>
            </div>
          </div>
        </div>
        <button class="reset-btn ghost-button" @click="expanded = !expanded">
          <text>{{ expanded ? '收起全部维度' : '查看全部维度' }}</text>
          <image
            class="ghost-button__icon"
            mode="aspectFit"
            src="/static/customer/icon-chevron-down.svg"
            :class="{ 'is-expanded': expanded }"
          />
        </button>
      </view>

      <view class="insight-card">
        <text class="insight-card__title">
          AI 推荐切入点
        </text>
        <text class="insight-card__desc">
          孩子即将上小学，可切入教育金 + 重疾保障组合方案。
        </text>
        <button class="reset-btn primary-button primary-button--light" @click="nav.nav('/customers/wang/followup')">
          <image mode="aspectFit" src="/static/customer/icon-calendar-figma.svg" />
          <text>生成下一步</text>
          <image class="primary-button__chevron" mode="aspectFit" src="/static/customer/icon-chevron-right-figma.svg" />
        </button>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            家庭结构
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/customers/wang/followup')">
            编辑
          </button>
        </div>
        <div class="family-grid">
          <div v-for="member in familyMembers" :key="member[0]">
            <span>{{ member[0].slice(0, 1) }}</span>
            <text class="family-grid__name">
              {{ member[0] }}
            </text>
            <text>{{ member[1] }}</text>
          </div>
        </div>
        <div class="family-tags">
          <text>二孩家庭</text>
          <i></i>
          <text>夫妻均有社保</text>
          <i></i>
          <text>有房有车</text>
        </div>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            客户画像
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/customers/wang/followup')">
            编辑
          </button>
        </div>
        <div class="info-grid">
          <div><text>年收入</text><span>30-50万</span></div>
          <div><text>职业</text><span>互联网产品经理</span></div>
          <div><text>健康状况</text><span>良好</span></div>
          <div><text>风险偏好</text><span>稳健型</span></div>
          <div><text>消费水平</text><span>中高</span></div>
          <div><text>保险意识</text><span>较强</span></div>
        </div>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            客户标签
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/customers/wang/followup')">
            编辑
          </button>
        </div>
        <div class="tag-groups">
          <div v-for="group in profileTags" :key="group[0]" class="tag-group">
            <text class="tag-group__title">
              • {{ group[0] }}
            </text>
            <div class="tag-group__chips">
              <text v-for="tag in group[1]" :key="tag">
                {{ tag }}
              </text>
            </div>
          </div>
        </div>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            当前保单/保单缺口
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/material/content-task/education')">
            查看详情
          </button>
        </div>
        <div class="policy-summary">
          <div>
            <span>已保障</span>
            <text>6份保单</text>
            <span>年保费</span>
            <text>12,800 元</text>
          </div>
          <div class="policy-gap">
            <text>缺口<br />3项</text>
          </div>
          <ul>
            <li>重大疾病保障不足</li>
            <li>高端医疗不足</li>
            <li>教育金缺口</li>
          </ul>
        </div>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          最近聊天摘要（5月20日）
        </text>
        <div class="chat-summary">
          <text>王女士：最近重疾和孩子买了教育金，我也想了解下。</text>
          <text>王女士：可以，想更清楚不同保障组合的区别？</text>
          <text>王女士：两方面都需要，有点预算有限。</text>
          <text>王女士：明白，后续再详细聊方案和保额试算儿下...</text>
        </div>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            跟进任务
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/customers/wang/followup')">
            编辑
          </button>
        </div>
        <div class="follow-list">
          <button class="reset-btn follow-item" @click="nav.nav('/customers/wang/followup')">
            <span></span>
            <text>方案沟通（教育金+重疾）</text>
          </button>
          <button class="reset-btn follow-item" @click="nav.nav('/customers/wang/followup')">
            <span></span>
            <div>
              <text>需求深挖，了解家庭情况和预算</text>
              <small>2026年11月12日 提醒我</small>
            </div>
          </button>
        </div>
      </view>

      <view class="content-card">
        <div class="card-title-row">
          <text class="content-card__title">
            活动记录
          </text>
          <button class="reset-btn edit-link" @click="nav.nav('/activity/records')">
            编辑
          </button>
        </div>
        <div class="activity-list">
          <div>
            <text>上海创业大会</text>
            <span>2026年11月12日 已报名</span>
          </div>
          <div>
            <text>长白山雪季滑雪训练营活动</text>
            <span>2026年11月12日 已报名</span>
          </div>
        </div>
      </view>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.detail-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.customer-detail-page :deep(.demo-page__body--padded) {
  padding: 0 12px 24px;
  background: #f5f5f5;
}

.profile-card,
.content-card,
.insight-card {
  padding: 16px;
  background: $white-color;
  border-radius: 14px;
  box-sizing: border-box;
}

.profile-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0 -12px;
  padding: 14px 20px 14px;
  border-radius: 0;
}

.profile-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-card__name {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #101828;
}

.profile-card__level {
  padding: 3px 8px;
  border-radius: 12px;
  background: #101828;
  font-size: 11px;
  line-height: 16px;
  color: $white-color;
}

.profile-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 0;
}

.profile-card__tags text {
  padding: 2px 9px;
  border: 1px solid #d1d5dc;
  border-radius: 12px;
  font-size: 12px;
  color: #4a5565;
}

.profile-card__info,
.score-row__desc {
  display: block;
  margin: 7px 0 0;
  font-size: 13px;
  line-height: 19px;
  color: #666;
}

.profile-card__actions {
  display: flex;
  gap: 10px;
  padding-top: 4px;
}

.profile-card__actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #edf0f5;
  border-radius: 50%;
  background: #fff;
}

.profile-card__actions image {
  width: 16px;
  height: 16px;
}

.content-card__title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: #101828;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.edit-link {
  flex-shrink: 0;
  font-size: 12px;
  color: #6a7282;
}

.score-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
}

.score-row__value {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 0 0 76px;
  width: 76px;
  height: 76px;
  border: 7px solid #f2f2f7;
  border-radius: 50%;
  box-sizing: border-box;
  color: #101828;
}

.score-row__value text {
  font-size: 22px;
  font-weight: 600;
  line-height: 26px;
}

.score-row__value span {
  margin-top: 1px;
  font-size: 9px;
  line-height: 12px;
  color: #99a1af;
}

.score-row__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: #101828;
}

.score-row__title image {
  width: 14px;
  height: 14px;
}

.heat-list {
  margin-top: 18px;
}

.heat-list__row {
  margin-top: 11px;
}

.heat-list__label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
  color: #888;
}

.heat-list__label span {
  color: #666;
}

.heat-list__track {
  height: 5px;
  margin-top: 5px;
  border-radius: 6px;
  overflow: hidden;
  background: #f2f2f7;
}

.heat-list__track div {
  height: 100%;
  border-radius: 6px;
  background: #999;
}

.ghost-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 36px;
  margin-top: 14px;
  border-radius: 10px;
  background: #f7f7f7;
  font-size: 12px;
  color: #888;
}

.ghost-button__icon {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.ghost-button__icon.is-expanded {
  transform: rotate(180deg);
}

.insight-card {
  padding: 14px 16px 12px;
  background: #0d1423;
  color: #fff;
}

.insight-card__title,
.insight-card__desc {
  display: block;
}

.insight-card__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
}

.insight-card__desc {
  margin-top: 8px;
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.72);
}

.primary-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 31px;
  margin-top: 12px;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0;
  background: transparent;
  font-size: 12px;
  color: $white-color;
  text-align: left;
}

.primary-button--light {
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
}

.primary-button image {
  width: 12px;
  height: 12px;
  margin-right: 6px;
}

.primary-button__chevron {
  width: 4px !important;
  height: 7px !important;
  margin-left: auto;
  margin-right: 0 !important;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.family-grid div {
  text-align: center;
}

.family-grid span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f3f4f6;
  font-weight: 600;
  color: transparent;
}

.family-grid text {
  display: block;
  margin-top: 3px;
  font-size: 11px;
  line-height: 16px;
  color: #6a7282;
}

.family-grid__name {
  margin-top: 8px !important;
  font-weight: 600;
  color: #333 !important;
}

.family-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #eeeeee;
  font-size: 12px;
  color: #6a7282;
}

.family-tags i {
  width: 1px;
  height: 12px;
  background: #dddddd;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 12px;
  margin-top: 16px;
}

.info-grid div {
  padding: 0 0 12px;
  border-radius: 0;
  background: transparent;
}

.info-grid text,
.info-grid span,
.chat-line,
.task-line {
  display: block;
}

.info-grid text {
  font-size: 12px;
  line-height: 18px;
  color: #99a1af;
}

.info-grid span {
  margin-top: 3px;
  font-size: 12px;
  line-height: 18px;
  color: #101828;
}

.tag-groups {
  margin-top: 14px;
}

.tag-group {
  margin-top: 12px;
}

.tag-group__title {
  display: block;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.tag-group__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag-group__chips text {
  padding: 4px 10px;
  border-radius: 12px;
  background: #f0f0f0;
  font-size: 12px;
  color: #7a7a7a;
}

.policy-summary {
  display: grid;
  grid-template-columns: 86px 82px 1fr;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
}

.policy-summary span,
.policy-summary text,
.policy-summary li {
  display: block;
}

.policy-summary span {
  margin-bottom: 5px;
  font-size: 12px;
  color: #8a8a8a;
}

.policy-summary text {
  margin-bottom: 14px;
  font-size: 17px;
  color: #333;
}

.policy-gap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 82px;
  border: 12px solid #e5e7eb;
  border-radius: 50%;
  box-sizing: border-box;
  text-align: center;
}

.policy-gap text {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

.policy-summary ul {
  padding-left: 16px;
  margin: 0;
  font-size: 12px;
  line-height: 22px;
  color: #101828;
}

.chat-summary {
  margin-top: 12px;
}

.chat-summary text {
  display: block;
  margin-top: 7px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}

.follow-list {
  margin-top: 14px;
}

.follow-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 0;
  margin-top: 13px;
  text-align: left;
}

.follow-item div {
  flex: 1;
  min-width: 0;
}

.follow-item span {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border: 1px solid #d1d5dc;
  border-radius: 50%;
}

.follow-item text,
.follow-item small {
  display: block;
}

.follow-item text {
  font-size: 14px;
  line-height: 20px;
}

.follow-item small {
  margin-top: 4px;
  font-size: 12px;
  color: #99a1af;
}

.activity-list {
  margin-top: 14px;
}

.activity-list div {
  padding: 12px;
  margin-top: 8px;
  border-radius: 4px;
  background: #f7f7f7;
}

.activity-list text,
.activity-list span {
  display: block;
}

.activity-list text {
  font-size: 13px;
  color: #666;
}

.activity-list span {
  margin-top: 4px;
  font-size: 11px;
  color: #aaa;
}
</style>
