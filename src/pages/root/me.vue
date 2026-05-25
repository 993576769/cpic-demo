<script setup lang="ts">
import { showToast } from '@/utils/toast';

const menuItems = [
  ['我的客户', '32 位重点维护对象'],
  ['常用素材', '12 条已收藏'],
  ['群发记录', '本月 8 次触达'],
  ['团队排行', '当前第 3 名'],
  ['设置', '账号与通知'],
];
</script>

<template>
  <common-demo-page title="我" tab-bar="me" :show-back="false">
    <view class="profile-card">
      <div class="avatar">
        欧
      </div>
      <div>
        <text class="profile-card__name">
          Ouyang
        </text>
        <text class="profile-card__role">
          保险销售顾问 · 太平洋保险
        </text>
      </div>
    </view>

    <div class="stats-grid">
      <view>
        <text>128k</text>
        <span>本月保费</span>
      </view>
      <view>
        <text>84%</text>
        <span>内容打开</span>
      </view>
      <view>
        <text>21</text>
        <span>新增咨询</span>
      </view>
    </div>

    <view class="menu-card">
      <button
        v-for="item in menuItems"
        :key="item[0]"
        class="reset-btn menu-row"
        @click="showToast('建设中')"
      >
        <div>
          <text>{{ item[0] }}</text>
          <span>{{ item[1] }}</span>
        </div>
        <em>›</em>
      </button>
    </view>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.profile-card,
.stats-grid,
.menu-card {
  border-radius: 8px;
  background: #fff;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 18px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #111;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
}

.profile-card__name,
.profile-card__role {
  display: block;
}

.profile-card__name {
  font-size: 20px;
  font-weight: 600;
}

.profile-card__role {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 12px 0;
  padding: 16px 0;
}

.stats-grid view {
  text-align: center;
}

.stats-grid text,
.stats-grid span {
  display: block;
}

.stats-grid text {
  font-size: 23px;
  font-weight: 600;
}

.stats-grid span {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.menu-card {
  padding: 0 16px;
}

.menu-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 68px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.menu-row:last-child {
  border-bottom: 0;
}

.menu-row text,
.menu-row span {
  display: block;
}

.menu-row text {
  font-size: 15px;
  font-weight: 600;
}

.menu-row span {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.menu-row em {
  align-self: center;
  font-style: normal;
  color: #999;
}
</style>
