import assert from 'node:assert/strict';
import fs from 'node:fs';

const pagesJson = JSON.parse(fs.readFileSync(new URL('../src/pages.json', import.meta.url), 'utf8'));
const registeredPages = new Set([
  ...pagesJson.pages.map(page => page.path),
  ...pagesJson.subPackages.flatMap(pack => pack.pages.map(page => `${pack.root}/${page.path}`)),
]);
const tabPagePaths = new Set(pagesJson.tabBar.list.map(item => item.pagePath));
const demoPage = fs.readFileSync(new URL('../src/components/common/demo-page.vue', import.meta.url), 'utf8');
const navUtil = fs.readFileSync(new URL('../src/utils/nav.ts', import.meta.url), 'utf8');
const tabBar = fs.readFileSync(new URL('../src/components/common/tab-bar.vue', import.meta.url), 'utf8');
const globalStyles = fs.readFileSync(new URL('../src/styles/global.scss', import.meta.url), 'utf8');
const mixins = fs.readFileSync(new URL('../src/styles/mixins.scss', import.meta.url), 'utf8');
const fixedBottomButton = fs.readFileSync(
  new URL('../src/components/common/button-fixed-bottom.vue', import.meta.url),
  'utf8',
);
const dataPage = fs.readFileSync(new URL('../src/pages/root/data.vue', import.meta.url), 'utf8');
const mePage = fs.readFileSync(new URL('../src/pages/root/me.vue', import.meta.url), 'utf8');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertUsesFixedBottom(source, className, message) {
  assert.match(
    source,
    new RegExp(`<common-button-fixed-bottom[^>]*>[^]*class="[^"]*${escapeRegExp(className)}[^"]*"[^]*</common-button-fixed-bottom>`),
    message,
  );
}

function assertBottomContainerPadding(source, className, message) {
  assert.match(
    source,
    new RegExp(`\\.${escapeRegExp(className)}\\s*\\{[^}]*padding-bottom:\\s*10px;`),
    message,
  );
}

function assertBottomButtonsUseFixedBottom(pages) {
  for (const { source, name, classNames } of pages) {
    for (const className of classNames) {
      assertUsesFixedBottom(
        source,
        className,
        `${name} bottom button group "${className}" should use common-button-fixed-bottom`,
      );
      assert.doesNotMatch(
        source,
        new RegExp(`${escapeRegExp(className)} padding-bottom-safe-area`),
        `${name} bottom button group "${className}" should delegate safe-area padding to common-button-fixed-bottom`,
      );
      assertBottomContainerPadding(
        source,
        className,
        `${name} bottom button group "${className}" should define 10px bottom padding on its container`,
      );
    }
  }
}

function getToolBlock(source, key) {
  const match = source.match(new RegExp(`\\{\\n\\s+key:\\s*'${escapeRegExp(key)}',[\\s\\S]*?\\n\\s+\\},`));
  assert.ok(match, `Missing ${key} tool block`);
  return match[0];
}

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

assert.match(demoPage, /demo-page__back-icon/, 'Demo page back button should use an SVG icon');
assert.match(demoPage, /showTitle\?: boolean/, 'Demo page should allow pages to hide the nav title');
assert.match(demoPage, /v-if="showBack \|\| showTitle"/, 'Demo page nav should not reserve height when both back and title are hidden');
assert.doesNotMatch(
  demoPage,
  /\.demo-page__nav\s*\{[^}]*padding(?:-top)?\s*:/,
  'Demo page nav should not include top padding',
);

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
assert.match(toolsPage, /:show-title="false"/, 'Tools page should hide the shared page header');
assert.match(toolsPage, /url:\s*'\/todo-ai'/, 'Todo AI tool should open the dedicated todo AI flow');
assert.doesNotMatch(getToolBlock(toolsPage, 'order'), /url:/, 'Order query should stay unimplemented per PRD');
assert.doesNotMatch(getToolBlock(toolsPage, 'resign'), /url:/, 'Resign assignment should stay unimplemented per PRD');
assert.doesNotMatch(toolsPage, /toolbox-status|toolbox-capsule/, 'Tools page should not implement a custom system status bar');

assert.match(navUtil, /'\/todo-ai':\s*'\/pages\/customers\/wang\/visit-record'/, 'Todo AI alias should route to the upload page');
assert.doesNotMatch(navUtil, /'\/order'|pages\/tools\/order/, 'Order query route should not be registered per PRD');
assert.doesNotMatch(navUtil, /'\/resign'|pages\/tools\/resign/, 'Resign assignment route should not be registered per PRD');
assert.equal(fs.existsSync(new URL('../src/pages/tools/order.vue', import.meta.url)), false, 'Order query page should not exist per PRD');
assert.equal(fs.existsSync(new URL('../src/pages/tools/resign.vue', import.meta.url)), false, 'Resign assignment page should not exist per PRD');
assert.match(tabBar, /item\.key === 'data' \|\| item\.key === 'me'/, 'Data and Me tabs should remain unimplemented per PRD');
assert.match(tabBar, /showToast\('建设中'\)/, 'Data and Me tabs should toast construction state per PRD');
assertUsesFixedBottom(tabBar, 'common-tab-bar', 'Common tab bar should use common button fixed bottom');
assert.doesNotMatch(tabBar, /common-tab-bar padding-bottom-safe-area/, 'Common tab bar should delegate safe-area padding to common-button-fixed-bottom');
assert.doesNotMatch(tabBar, /\.common-tab-bar\s*\{[^}]*position:\s*fixed/, 'Common tab bar should delegate fixed positioning to common-button-fixed-bottom');
assertBottomContainerPadding(tabBar, 'common-tab-bar', 'Common tab bar should define 10px bottom padding on its container');
assert.match(globalStyles, /uni-tabbar\s*\{[^}]*display:\s*none;/, 'Native H5 tabbar should be hidden so PRD placeholder tabs do not navigate');
assert.match(
  mixins,
  /@mixin padding-bottom-safe-area\(\$padding:\s*0rpx\)/,
  'Safe-area bottom padding mixin should not default to a fixed 10px',
);
assert.match(
  mixins,
  /var\(--safe-area-inset-bottom\)/,
  'Safe-area bottom padding mixin should read the safe-area variable without a fixed fallback',
);
assert.doesNotMatch(mixins, /10px/, 'Safe-area bottom padding mixin should not contain a fixed 10px fallback');
assert.match(
  fixedBottomButton,
  /@include padding-bottom-safe-area;/,
  'common-button-fixed-bottom should apply shared safe-area padding',
);
assert.match(dataPage, /建设中/, 'Data page should stay a construction placeholder per PRD');
assert.match(mePage, /建设中/, 'Me page should stay a construction placeholder per PRD');
assert.doesNotMatch(dataPage, /本月经营概览|转化漏斗|客户分布/, 'Data page should not implement analytics per PRD');
assert.doesNotMatch(mePage, /保险销售顾问|我的客户|常用素材|团队排行/, 'Me page should not implement profile features per PRD');

const customersPage = fs.readFileSync(new URL('../src/pages/root/customers.vue', import.meta.url), 'utf8');
assert.match(customersPage, /<common-demo-page[^>]*:show-title="false"/, 'Customers page should hide the shared page header');

const visitRecordPage = fs.readFileSync(new URL('../src/pages/customers/wang/visit-record.vue', import.meta.url), 'utf8');
const requiredVisitRecordTokens = [
  'visit-record-page',
  '<common-page-heading',
  'upload-panel',
  'upload-option',
  'analysis-result-card',
  '与王女士的对话（5月20日）',
  '分析结果',
  '生成跟进方案',
];
const missingVisitRecordTokens = requiredVisitRecordTokens.filter(token => !visitRecordPage.includes(token));

assert.deepEqual(
  missingVisitRecordTokens,
  [],
  `Missing visit record page tokens: ${missingVisitRecordTokens.join(', ')}`,
);
assert.match(visitRecordPage, /<common-demo-page[^>]*:show-title="false"/, 'Visit record page should use custom heading');
assert.doesNotMatch(visitRecordPage, /📷|📄|🎙|✨|👤|🎯|⚠️|✅/, 'Visit record page should use styled icons instead of emoji glyphs');
assertUsesFixedBottom(visitRecordPage, 'upload-panel', 'Upload panel should use common button fixed bottom');
assertUsesFixedBottom(visitRecordPage, 'analysis-bottom', 'Analysis bottom bar should use common button fixed bottom');
assert.doesNotMatch(visitRecordPage, /(?:upload-panel|analysis-bottom) padding-bottom-safe-area/, 'Visit record fixed bottom panels should delegate safe-area padding to common-button-fixed-bottom');

const followupTasksPage = fs.readFileSync(new URL('../src/pages/customers/wang/followup-tasks.vue', import.meta.url), 'utf8');
const requiredTodoTaskTokens = [
  'todo-ai-task-page',
  '<common-page-heading',
  'todo-ai-tabs',
  'role="tablist"',
  'todo-task-card',
  'todo-task-card__checkbox',
  '添加到待办事项',
  '这些to do会出现在”今日事项“中',
];
const missingTodoTaskTokens = requiredTodoTaskTokens.filter(token => !followupTasksPage.includes(token));

assert.deepEqual(
  missingTodoTaskTokens,
  [],
  `Missing todo task page tokens: ${missingTodoTaskTokens.join(', ')}`,
);
assert.match(followupTasksPage, /<common-demo-page[^>]*:show-title="false"/, 'Todo task page should use custom heading');
assert.match(followupTasksPage, /<common-demo-page[^>]*:show-back="false"/, 'Todo task page should hide the demo nav chrome for Figma parity');
assert.match(followupTasksPage, /\.todo-ai-tabs\s*\{[^}]*margin:\s*10px 0 17px 19px;/, 'Todo task tabs should match the Figma position and vertical spacing');
assert.match(followupTasksPage, /\.todo-task-card\s*\{[^}]*height:\s*92px;/, 'Todo task cards should match the Figma fixed card height');
assert.match(followupTasksPage, /\.todo-task-card\s*\{[^}]*padding:\s*14px 21px 12px 12px;/, 'Todo task cards should match the Figma inner spacing');
assert.match(followupTasksPage, /\.todo-task-card\s*\{[^}]*margin:\s*0 0 10px;/, 'Todo task cards should align to the Figma left edge');
assert.match(followupTasksPage, /\.todo-task-card__footer\s*\{[^}]*margin-top:\s*7px;/, 'Todo task card footer should align with the Figma deadline row');
assert.match(followupTasksPage, /\.todo-bottom-actions\s*\{[^}]*grid-template-columns:\s*85px 1fr;[^}]*gap:\s*11px;/, 'Todo task bottom action widths should match the Figma button group');
assertUsesFixedBottom(followupTasksPage, 'todo-bottom-actions', 'Todo task bottom actions should use common button fixed bottom');
assert.doesNotMatch(followupTasksPage, /todo-bottom-actions padding-bottom-safe-area/, 'Todo task bottom actions should delegate safe-area padding to common-button-fixed-bottom');

const todoListPage = fs.readFileSync(new URL('../src/pages/customers/wang/todo-list.vue', import.meta.url), 'utf8');
const requiredTodoListTokens = [
  'todo-list-page',
  'todo-heading',
  '待办事项列表',
  '目标客户 王女士',
  'todo-section__header',
  '待办任务列表',
  '4 条建议',
  'todo-card--featured',
  '加入待办项',
];
const missingTodoListTokens = requiredTodoListTokens.filter(token => !todoListPage.includes(token));

assert.deepEqual(
  missingTodoListTokens,
  [],
  `Missing todo list page tokens: ${missingTodoListTokens.join(', ')}`,
);
assert.match(todoListPage, /<common-demo-page[^>]*:show-title="false"/, 'Todo list page should use custom page heading');
assert.match(todoListPage, /<common-demo-page[^>]*:show-back="false"/, 'Todo list page should hide demo nav chrome for Figma parity');
assert.match(todoListPage, /\.todo-heading\s*\{[^}]*height:\s*182px;[^}]*padding:\s*104px 16px 0;/, 'Todo list heading should match the Figma title block');
assert.match(todoListPage, /\.todo-section\s*\{[^}]*padding:\s*15px 14px 122px;/, 'Todo list content spacing should match the Figma section layout');
assert.match(todoListPage, /\.todo-card--featured\s*\{[^}]*min-height:\s*171px;/, 'Todo list featured card should match the Figma height');
assert.match(todoListPage, /\.todo-card\s*\{[^}]*width:\s*345px;[^}]*min-height:\s*118px;/, 'Todo list task cards should match the Figma card width and base height');
assert.match(todoListPage, /\.bottom-actions\s*\{[^}]*grid-template-columns:\s*114px 224px;[^}]*gap:\s*7px;/, 'Todo list bottom actions should match the Figma button widths');
assertUsesFixedBottom(todoListPage, 'bottom-actions', 'Todo list bottom actions should use common button fixed bottom');
assert.doesNotMatch(todoListPage, /bottom-actions padding-bottom-safe-area/, 'Todo list bottom actions should delegate safe-area padding to common-button-fixed-bottom');

const followupPage = fs.readFileSync(new URL('../src/pages/customers/wang/followup.vue', import.meta.url), 'utf8');
assertUsesFixedBottom(followupPage, 'fixed-primary', 'Followup fixed action should use common button fixed bottom');
assert.doesNotMatch(followupPage, /fixed-primary padding-bottom-safe-area/, 'Followup fixed action should delegate safe-area padding to common-button-fixed-bottom');

const operationPage = fs.readFileSync(new URL('../src/pages/operation/index.vue', import.meta.url), 'utf8');
const pageHeading = fs.readFileSync(new URL('../src/components/common/page-heading.vue', import.meta.url), 'utf8');
const requiredPageHeadingTokens = [
  'page-heading',
  'page-heading__title',
  'page-heading__subtitle',
  'page-heading__meta',
];
const missingPageHeadingTokens = requiredPageHeadingTokens.filter(token => !pageHeading.includes(token));

assert.deepEqual(missingPageHeadingTokens, [], `Missing page heading tokens: ${missingPageHeadingTokens.join(', ')}`);

const requiredOperationTokens = [
  'operation-page',
  '<common-page-heading',
  'operation-task-card',
  'operation-task-card__indicator',
  'operation-task-card__deadline',
  'operation-task-card__progress',
  '去完成',
];
const missingOperationTokens = requiredOperationTokens.filter(token => !operationPage.includes(token));

assert.deepEqual(missingOperationTokens, [], `Missing operation page tokens: ${missingOperationTokens.join(', ')}`);
assert.match(operationPage, /<common-demo-page/, 'Operation page should use the shared demo page shell');
assert.match(operationPage, /:show-title="false"/, 'Operation page should hide the demo page nav title');
assert.doesNotMatch(operationPage, /StatusBar|status-bar|capsule/, 'Operation page should not implement a custom system status bar');

const operationDetailPage = fs.readFileSync(new URL('../src/pages/operation/detail.vue', import.meta.url), 'utf8');
const requiredOperationDetailTokens = [
  'operation-detail-page',
  '<common-page-heading',
  'operation-detail-tabs',
  'role="tablist"',
  'operation-customer-row',
  'operation-customer-row__phone',
  'batch-send-button',
  '批量发送',
];
const missingOperationDetailTokens = requiredOperationDetailTokens.filter(token => !operationDetailPage.includes(token));

assert.deepEqual(
  missingOperationDetailTokens,
  [],
  `Missing operation detail page tokens: ${missingOperationDetailTokens.join(', ')}`,
);
assert.match(operationDetailPage, /<common-demo-page/, 'Operation detail page should use the shared demo page shell');
assert.match(operationDetailPage, /:show-title="false"/, 'Operation detail page should hide the demo page nav title');
assert.doesNotMatch(operationDetailPage, /StatusBar|status-bar|capsule/, 'Operation detail page should not implement a custom system status bar');
assertUsesFixedBottom(operationDetailPage, 'batch-send-wrap', 'Operation detail bottom action should use common button fixed bottom');
assert.doesNotMatch(operationDetailPage, /batch-send-wrap padding-bottom-safe-area/, 'Operation detail bottom action should delegate safe-area padding to common-button-fixed-bottom');

const materialHomePage = fs.readFileSync(new URL('../src/pages/material/index.vue', import.meta.url), 'utf8');
const requiredMaterialHomeTokens = [
  'material-home-page',
  'material-section--content',
  'content-card',
  'need-card',
  'rank-grid',
  'rank-card--list',
];
const missingMaterialHomeTokens = requiredMaterialHomeTokens.filter(token => !materialHomePage.includes(token));

assert.deepEqual(
  missingMaterialHomeTokens,
  [],
  `Missing material home page tokens: ${missingMaterialHomeTokens.join(', ')}`,
);
assert.match(materialHomePage, /<common-demo-page/, 'Material home page should use the shared demo page shell');
assert.doesNotMatch(materialHomePage, /StatusBar|status-bar|capsule/, 'Material home page should not implement a custom system status bar');

const momentsPublishPage = fs.readFileSync(
  new URL('../src/pages/material/moments/publish.vue', import.meta.url),
  'utf8',
);
const requiredPublishTokens = [
  'moments-publish-page',
  '<common-page-heading',
  'title="发布朋友圈"',
  'publish-card--products',
  'product-row__copy',
  'media-grid__item--add',
  'publish-card--copy',
  '去素材库选择',
  'bottom-actions',
];
const missingPublishTokens = requiredPublishTokens.filter(token => !momentsPublishPage.includes(token));

assert.deepEqual(missingPublishTokens, [], `Missing publish page tokens: ${missingPublishTokens.join(', ')}`);
assert.match(momentsPublishPage, /<common-demo-page[^>]*:show-title="false"/, 'Publish page should hide the demo page nav title');
assert.doesNotMatch(
  momentsPublishPage,
  /<common-demo-page[^>]*title="发布朋友圈"/,
  'Publish page should not use the demo page nav title',
);
assert.doesNotMatch(momentsPublishPage, /标签定向/, 'Publish page should not include tag targeting');
assert.doesNotMatch(momentsPublishPage, /publish-heading|demo-page__title-box/, 'Publish page should use the shared page heading');
assertUsesFixedBottom(momentsPublishPage, 'bottom-actions', 'Moments publish bottom actions should use common button fixed bottom');
assert.doesNotMatch(momentsPublishPage, /bottom-actions padding-bottom-safe-area/, 'Moments publish bottom actions should delegate safe-area padding to common-button-fixed-bottom');

const journeyPage = fs.readFileSync(new URL('../src/pages/journey/index.vue', import.meta.url), 'utf8');
assertUsesFixedBottom(journeyPage, 'fixed-primary', 'Journey fixed action should use common button fixed bottom');
assertUsesFixedBottom(journeyPage, 'sheet-primary', 'Journey sheet bottom action should use common button fixed bottom');
assert.doesNotMatch(journeyPage, /fixed-primary padding-bottom-safe-area/, 'Journey fixed action should delegate safe-area padding to common-button-fixed-bottom');
assert.doesNotMatch(journeyPage, /sheet-primary padding-bottom-safe-area/, 'Journey sheet bottom action should delegate safe-area padding to common-button-fixed-bottom');

const activityPage = fs.readFileSync(new URL('../src/pages/activity/index.vue', import.meta.url), 'utf8');
assertUsesFixedBottom(activityPage, 'fixed-primary', 'Activity fixed action should use common button fixed bottom');
assert.doesNotMatch(activityPage, /fixed-primary padding-bottom-safe-area/, 'Activity fixed action should delegate safe-area padding to common-button-fixed-bottom');

const inviteListPage = fs.readFileSync(new URL('../src/pages/activity/invite-list.vue', import.meta.url), 'utf8');
assertUsesFixedBottom(inviteListPage, 'fixed-primary', 'Invite list fixed action should use common button fixed bottom');
assert.doesNotMatch(inviteListPage, /fixed-primary padding-bottom-safe-area/, 'Invite list fixed action should delegate safe-area padding to common-button-fixed-bottom');

const momentsMaterialPage = fs.readFileSync(
  new URL('../src/pages/material/moments/index.vue', import.meta.url),
  'utf8',
);
const requiredMomentsMaterialTokens = [
  'moments-material-page',
  'material-search',
  'material-main-tabs',
  'role="tablist"',
  'role="tab"',
  ':aria-selected',
  'material-sub-tabs',
  'material-card__meta',
  '使用这条',
];
const missingMomentsMaterialTokens = requiredMomentsMaterialTokens.filter(token => !momentsMaterialPage.includes(token));

assert.deepEqual(
  missingMomentsMaterialTokens,
  [],
  `Missing moments material page tokens: ${missingMomentsMaterialTokens.join(', ')}`,
);
assert.match(momentsMaterialPage, /<common-demo-page/, 'Moments material page should use the shared demo page shell');
assert.doesNotMatch(momentsMaterialPage, /StatusBar|status-bar|capsule/, 'Moments material page should not implement a custom system status bar');
assert.match(
  momentsMaterialPage,
  /\.material-main-tabs__item\.is-active::after\s*\{[^}]*display\s*:\s*block/,
  'Moments material page active tab indicator should remain visible after button reset styles',
);
assert.match(
  momentsMaterialPage,
  /\.material-main-tabs\s*\{[^}]*justify-content\s*:\s*center/,
  'Moments material tabs should be centered as a group',
);
assert.match(
  momentsMaterialPage,
  /\.material-main-tabs__item\s*\{[^}]*width\s*:\s*78px/,
  'Moments material tab items should match the Figma tab spacing',
);
assert.match(
  momentsMaterialPage,
  /\.material-main-tabs__item\.is-active::after\s*\{[^}]*top\s*:\s*40px[^}]*width\s*:\s*30px[^}]*left\s*:\s*50%[^}]*transform\s*:\s*translateX\(-50%\)/,
  'Moments material active indicator should sit under the tab text',
);

assertBottomButtonsUseFixedBottom([
  {
    name: 'Visit record',
    source: visitRecordPage,
    classNames: ['upload-panel', 'analysis-bottom'],
  },
  {
    name: 'Followup',
    source: followupPage,
    classNames: ['fixed-primary'],
  },
  {
    name: 'Todo task',
    source: followupTasksPage,
    classNames: ['todo-bottom-actions'],
  },
  {
    name: 'Todo list',
    source: todoListPage,
    classNames: ['bottom-actions'],
  },
  {
    name: 'Journey',
    source: journeyPage,
    classNames: ['fixed-primary', 'sheet-primary'],
  },
  {
    name: 'Operation detail',
    source: operationDetailPage,
    classNames: ['batch-send-wrap'],
  },
  {
    name: 'Moments publish',
    source: momentsPublishPage,
    classNames: ['bottom-actions'],
  },
  {
    name: 'Activity detail',
    source: activityPage,
    classNames: ['fixed-primary'],
  },
  {
    name: 'Invite list',
    source: inviteListPage,
    classNames: ['fixed-primary'],
  },
]);
