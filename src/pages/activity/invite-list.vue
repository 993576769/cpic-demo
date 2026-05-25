<script setup lang="ts">
import { inviteCustomers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

async function sendAll() {
  await showToast('已下发到企微，请到企业微信完成群发');
  nav.nav('/activity');
}
</script>

<template>
  <common-demo-page title="邀约名单">
    <div class="header-row">
      <div>
        <text class="header-row__title">
          邀约列表
        </text>
        <text class="header-row__desc">
          为您筛选出适合邀请的4位用户
        </text>
      </div>
      <button class="reset-btn edit-button" @click="showToast('建设中')">
        修改列表
      </button>
    </div>

    <view class="member-card">
      <div v-for="(name, index) in inviteCustomers" :key="`${name}-${index}`" class="member-row">
        <span>{{ name.slice(0, 1) }}</span>
        <div>
          <text>{{ name }}</text>
          <em>1899090989{{ index }}</em>
        </div>
        <button class="reset-btn send-button" @click="showToast('建设中')">
          去发送
        </button>
      </div>
    </view>

    <button class="reset-btn fixed-primary padding-bottom-safe-area" @click="sendAll">
      批量发送邀请函
    </button>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}

.header-row__title,
.header-row__desc {
  display: block;
}

.header-row__title {
  font-size: 20px;
  font-weight: 600;
}

.header-row__desc {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.edit-button {
  align-self: center;
  flex: 0 0 82px;
  height: 34px;
  border: 1px solid #e5e7eb;
  border-radius: 17px;
  background: #fff;
  font-size: 13px;
}

.member-card {
  padding: 0 16px;
  margin-bottom: 82px;
  border-radius: 8px;
  background: #fff;
}

.member-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 72px;
  border-bottom: 1px solid #f0f0f0;
}

.member-row:last-child {
  border-bottom: 0;
}

.member-row span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #111;
  color: #fff;
}

.member-row div {
  flex: 1;
}

.member-row text,
.member-row em {
  display: block;
}

.member-row text {
  font-size: 15px;
  font-weight: 600;
}

.member-row em {
  margin-top: 5px;
  font-style: normal;
  font-size: 12px;
  color: #666;
}

.send-button {
  width: 68px;
  height: 32px;
  border-radius: 16px;
  background: #111;
  font-size: 12px;
  color: #fff;
}

.fixed-primary {
  position: fixed;
  right: 10px;
  bottom: 12px;
  left: 10px;
  height: 48px;
  border-radius: 14px;
  background: #111;
  font-size: 15px;
  color: #fff;
}
</style>
