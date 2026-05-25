import assert from 'node:assert/strict';
import fs from 'node:fs';

const pagesJson = JSON.parse(fs.readFileSync(new URL('../src/pages.json', import.meta.url), 'utf8'));
const registeredPages = new Set([
  ...pagesJson.pages.map(page => page.path),
  ...pagesJson.subPackages.flatMap(pack => pack.pages.map(page => `${pack.root}/${page.path}`)),
]);
const tabPagePaths = new Set(pagesJson.tabBar.list.map(item => item.pagePath));

const requiredPages = [
  'pages/root/home',
  'pages/root/tools',
  'pages/root/customers',
  'pages/root/data',
  'pages/root/me',
  'pages/customers/wang/index',
  'pages/customers/wang/visit-record',
  'pages/customers/wang/followup',
  'pages/customers/wang/followup-tasks',
  'pages/customers/wang/todo-list',
  'pages/journey/index',
  'pages/operation/index',
  'pages/operation/detail',
  'pages/material/index',
  'pages/material/content',
  'pages/material/moments/index',
  'pages/material/moments/publish',
  'pages/material/content-task',
  'pages/activity/index',
  'pages/activity/invite-list',
  'pages/activity/records',
];

const missingPages = requiredPages.filter(page => !registeredPages.has(page));

assert.deepEqual(missingPages, [], `Missing pages: ${missingPages.join(', ')}`);

assert.deepEqual(
  [...tabPagePaths].sort(),
  [
    'pages/root/customers',
    'pages/root/data',
    'pages/root/home',
    'pages/root/me',
    'pages/root/tools',
  ].sort(),
  'Tab bar pages are not registered as expected',
);

const toolsPage = fs.readFileSync(new URL('../src/pages/root/tools.vue', import.meta.url), 'utf8');
const requiredToolLabels = [
  '素材库',
  '待办事项\\nAI生成',
  '发布朋友圈',
  '用户旅程管理',
  '运营任务',
  '订单查询',
  '离职分配',
  '活动邀请',
];

const missingToolLabels = requiredToolLabels.filter(label => !toolsPage.includes(label));

assert.deepEqual(missingToolLabels, [], `Missing tool labels: ${missingToolLabels.join(', ')}`);
assert.match(toolsPage, /<common-demo-page/, 'Tools page should use the shared demo page shell');
assert.match(toolsPage, /title="工具箱"/, 'Tools page should keep the shared page title');
assert.doesNotMatch(toolsPage, /toolbox-status|toolbox-capsule/, 'Tools page should not implement a custom system status bar');
