<script setup lang="ts">
import { inviteCustomers } from '@/pages/demo-data';
import { nav } from '@/utils/nav';
import { showToast } from '@/utils/toast';

const avatars = [
  'static/activity/avatar-yu.png',
  'static/activity/avatar-cloudy.png',
  'static/activity/avatar-cloudy.png',
  'static/activity/avatar-cloudy.png',
];

function editList() {
  nav.nav('/activity');
}

async function sendInvite() {
  await showToast('已下发到企微，请到企业微信完成群发');
  nav.nav('/activity/records');
}
</script>

<template>
  <common-demo-page title="邀约名单" class="invite-page" :padded="false">
    <div class="header-row">
      <div>
        <text class="header-row__title">
          邀约列表
        </text>
        <text class="header-row__desc">
          为您筛选出适合邀请的4位用户
        </text>
      </div>
      <button class="reset-btn edit-button" @click="editList">
        修改列表
      </button>
    </div>

    <view class="member-card">
      <div v-for="(name, index) in inviteCustomers" :key="`${name}-${index}`" class="member-row">
        <img class="member-row__avatar" :src="avatars[index]" alt="" />
        <div>
          <text>{{ name }}</text>
          <em>186 **** 0111</em>
        </div>
        <button class="reset-btn send-button" @click="sendInvite">
          去发送
        </button>
      </div>
    </view>

    <common-button-fixed-bottom bg-color="transparent">
      <button class="reset-btn fixed-primary" @click="sendInvite">
        批量发送邀请函
      </button>
    </common-button-fixed-bottom>
  </common-demo-page>
</template>

<style lang="scss" scoped>
.invite-page {
  background: #f5f5f5;
}

.header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-height: 114px;
  padding: 34px 19px 24px 20px;
  background: #fff;
  box-sizing: border-box;
}

.header-row__title,
.header-row__desc {
  display: block;
}

.header-row__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333;
}

.header-row__desc {
  margin-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
}

.edit-button {
  align-self: flex-start;
  flex: 0 0 75px;
  height: 26px;
  margin-top: 2px;
  border: 1px solid #333;
  border-radius: 19px;
  background: #fff;
  font-size: 11px;
  font-weight: 600;
  color: #333;
}

.member-card {
  width: 345px;
  min-height: 376px;
  padding: 14px 16px 0;
  margin: 13px 15px 88px;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
}

.member-card::before {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #333;
  content: '会员列表';
}

.member-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 76px;
  border-bottom: 1px solid #f0f0f0;
}

.member-row:last-child {
  border-bottom: 0;
}

.member-row__avatar {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
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
  font-weight: 500;
  line-height: 21px;
  color: #333;
}

.member-row em {
  margin-top: 4px;
  font-style: normal;
  font-size: 12px;
  line-height: 17px;
  color: #666;
}

.send-button {
  width: 60px;
  height: 28px;
  border-radius: 14px;
  background: #333;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}

.fixed-primary {
  width: calc(100% - 30px);
  height: 48px;
  margin: 0 15px 34px;
  border-radius: 24px;
  background: #000;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}
</style>
