import type {
  ActivityCard,
  CustomerCard,
  RecommendTab,
  TodoItem,
  TodoTab,
  ToolItem,
  TopicCard,
} from './types';

export const todoTabs: TodoTab[] = [
  { key: 'all', label: '全部' },
  { key: 'communication', label: '今日沟通' },
  { key: 'visit', label: '拜访列表' },
  { key: 'research', label: '课题研究' },
  { key: 'mass', label: '群发任务' },
];

export const recommendTabs: RecommendTab[] = [
  { key: 'customers', label: '重点客户' },
  { key: 'content', label: '发点什么' },
  { key: 'activities', label: '活动报名' },
];

export const initialTodoItems: TodoItem[] = [
  {
    id: 'moments',
    tab: 'mass',
    title: '朋友圈发布',
    meta: '建议12:00前完成',
    desc: '今日朋友圈素材已下发',
    done: true,
    url: '/material/moments/publish',
  },
  {
    id: 'rights',
    tab: 'communication',
    title: '权益提醒',
    meta: '',
    desc: '有12位客户本月有即将到期权益',
    action: '前往发送',
    done: false,
    url: '/material/moments/publish',
  },
  {
    id: 'visit',
    tab: 'visit',
    title: '客户拜访',
    meta: '拜访时间13:00',
    desc: '王先生，四川北路898号',
    action: '拜访材料',
    done: false,
    url: '/customers/wang/visit-record',
  },
  {
    id: 'chat',
    tab: 'communication',
    title: '待沟通',
    meta: '建议今日完成沟通',
    desc: '上次聊天询问了儿童险种',
    action: '去聊天',
    done: false,
    url: '/customers/wang/followup',
  },
  {
    id: 'mass',
    tab: 'mass',
    title: '群发任务',
    meta: '建议12:00前完成',
    desc: '新客破冰群发任务',
    done: true,
  },
];

export const customerCards: CustomerCard[] = [
  {
    id: 'birthday-wang-1',
    customerId: 'wang',
    name: '王女士',
    level: '高热高价客户',
    tags: ['宝妈', '二孩家庭', '风险意识高'],
    date: '4月12日，39岁生日',
  },
  {
    id: 'birthday-wang-2',
    customerId: 'wang',
    name: '王女士',
    level: '高热高价客户',
    tags: ['宝妈', '二孩家庭', '风险意识高'],
    date: '4月12日，39岁生日',
  },
];

export const enterpriseTopics = [
  '儿童重疾险到底选消费型还是返还型？',
  '保险怎么选：一份保障方案配置全攻略',
  '保险怎么选：一份保障方案配置全攻略',
];

export const topicCards: TopicCard[] = [
  {
    index: 1,
    title: '《两个孩子家庭，重疾险到底怎么买？》',
    reason: '最近有3个二孩客户咨询；当前平台热度高；你的客户画像匹配度高',
    platform: '小红书、朋友圈',
    format: '图文',
  },
  {
    index: 2,
    title: '《两个孩子家庭，重疾险到底怎么买？》',
    reason: '最近有3个二孩客户咨询；当前平台热度高；你的客户画像匹配度高',
    platform: '抖音、视频号',
    format: '口播短视频',
  },
];

export const activityCards: ActivityCard[] = [
  {
    id: 'baking',
    title: '虹口区亲子烘焙活动',
    scene: '亲子场景',
    deadline: '2026/01/11 18:00',
    quota: '0/2',
    icon: 'friends',
  },
  {
    id: 'women-startup-1',
    title: '女性创业分享会',
    scene: '女性、宝妈场景',
    deadline: '2026/01/11 18:00',
    quota: '1/2',
    icon: 'event',
  },
  {
    id: 'women-startup-2',
    title: '女性创业分享会',
    scene: '女性、宝妈场景',
    deadline: '2026/01/11 18:00',
    quota: '1/2',
    icon: 'event',
  },
];

export const tools: ToolItem[] = [
  {
    title: '拜访记录分析',
    desc: '根据线下对话信息进行商家分析，帮你快速察觉商机',
    url: '/customers/wang/visit-record',
  },
  {
    title: '老保单解读',
    desc: '帮你快速get老保单信息',
  },
  {
    title: '产品查询',
    desc: '快速查询保险产品',
  },
  {
    title: '新产品培训',
    desc: '点击进行新产品对话训练',
  },
];
