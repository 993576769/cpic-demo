<script setup lang="ts">
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';
import { ref } from 'vue';

const expanded = ref(false);
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
  <common-demo-page title="顾客档案">
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
            手机：180 **** 6666
          </text>
          <text class="profile-card__info">
            生日：1994-08-08
          </text>
        </div>
        <div class="profile-card__actions">
          <button class="reset-btn" @click="showToast('建设中')">
            <text>☎</text>
          </button>
          <button class="reset-btn" @click="showToast('建设中')">
            <text>↗</text>
          </button>
        </div>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          AI 客户热度模型
        </text>
        <div class="score-row">
          <text class="score-row__value">
            82
          </text>
          <div>
            <text class="score-row__title">
              🔥 高热客户
            </text>
            <text class="score-row__desc">
              近期咨询儿童险种，适合继续推进家庭保障方案。
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
          <text>{{ expanded ? '收起 ^' : '查看全部维度 v' }}</text>
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
          <text>生成下一步</text>
        </button>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          家庭结构
        </text>
        <div class="family-grid">
          <div v-for="member in ['王女士本人', '先生 公务员', '大儿子 6岁·小学', '小女儿 3岁·幼儿园']" :key="member">
            <span>{{ member.slice(0, 1) }}</span>
            <text>{{ member }}</text>
          </div>
        </div>
        <div class="profile-card__tags">
          <text>二孩家庭</text>
          <text>夫妻均有社保</text>
          <text>有房有车</text>
        </div>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          客户画像
        </text>
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
        <text class="content-card__title">
          当前保单/保单缺口
        </text>
        <div class="policy-grid">
          <div>
            <text>6份保单</text>
            <span>已保障</span>
          </div>
          <div>
            <text>12,800元</text>
            <span>年保费</span>
          </div>
          <div>
            <text>3项</text>
            <span>重大疾病 / 高端医疗 / 教育金缺口</span>
          </div>
        </div>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          最近聊天摘要（5月20日）
        </text>
        <text class="chat-line">
          王女士：最近孩子刚上小学，想了解儿童重疾。
        </text>
        <text class="chat-line">
          我：可以从教育金和重疾组合做一份方案。
        </text>
      </view>

      <view class="content-card">
        <text class="content-card__title">
          跟进任务
        </text>
        <text class="task-line">
          ○ 方案沟通（教育金+重疾）
        </text>
        <text class="task-line">
          ○ 需求深挖，了解家庭情况和预算
        </text>
        <text class="task-line">
          2026年11月12日 提醒我
        </text>
      </view>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.detail-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-card,
.content-card,
.insight-card {
  padding: 18px;
  background: $white-color;
  border-radius: 8px;
  box-sizing: border-box;
}

.profile-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.profile-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-card__name {
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
}

.profile-card__level {
  padding: 4px 8px;
  border-radius: 12px;
  background: #101828;
  font-size: 11px;
  color: $white-color;
}

.profile-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
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
  line-height: 20px;
  color: #666;
}

.profile-card__actions {
  display: flex;
  gap: 8px;
}

.profile-card__actions button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 17px;
}

.content-card__title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
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
  width: 76px;
  height: 76px;
  border: 8px solid #101828;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 24px;
}

.score-row__title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}

.heat-list {
  margin-top: 18px;
}

.heat-list__row {
  margin-top: 12px;
}

.heat-list__label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
}

.heat-list__label span {
  color: #666;
}

.heat-list__track {
  height: 6px;
  margin-top: 7px;
  border-radius: 6px;
  overflow: hidden;
  background: #f0f0f0;
}

.heat-list__track div {
  height: 100%;
  border-radius: 6px;
  background: #111;
}

.ghost-button {
  width: 100%;
  height: 38px;
  margin-top: 12px;
  border-radius: 10px;
  background: #f7f7f7;
  font-size: 13px;
}

.insight-card {
  background: #111;
  color: #fff;
}

.insight-card__title,
.insight-card__desc {
  display: block;
}

.insight-card__title {
  font-size: 16px;
  font-weight: 600;
}

.insight-card__desc {
  margin-top: 12px;
  font-size: 15px;
  line-height: 23px;
}

.primary-button {
  width: 100%;
  height: 44px;
  margin-top: 22px;
  border-radius: 12px;
  background: #000;
  font-size: 14px;
  color: $white-color;
}

.primary-button--light {
  background: #fff;
  color: #111;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
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
}

.family-grid text {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  line-height: 16px;
}

.info-grid,
.policy-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.info-grid div,
.policy-grid div {
  padding: 12px;
  border-radius: 8px;
  background: #f7f7f7;
}

.info-grid text,
.info-grid span,
.policy-grid text,
.policy-grid span,
.chat-line,
.task-line {
  display: block;
}

.info-grid text,
.policy-grid text {
  font-size: 12px;
  color: #666;
}

.info-grid span,
.policy-grid span {
  margin-top: 5px;
  font-size: 13px;
  line-height: 19px;
}

.chat-line,
.task-line {
  margin-top: 10px;
  font-size: 13px;
  line-height: 20px;
  color: #666;
}
</style>
