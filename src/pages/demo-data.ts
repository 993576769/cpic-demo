export interface CustomerRow {
  id: string;
  name: string;
  avatar: string;
  company: string;
  lastContact: string;
  premium: string;
  badge?: string;
  badges?: string[];
  tags: string[];
}

export const customers: CustomerRow[] = [
  {
    id: 'jian-guo',
    name: '王建国',
    avatar: '王',
    company: '建国集团',
    lastContact: '最近：3天前',
    premium: '¥23万/年',
    badges: ['VIP', '今日拜访'],
    tags: ['二孩家庭', '风险意识'],
  },
  {
    id: 'li-ya-qin',
    name: '李雅琴',
    avatar: '李',
    company: '华美投资',
    lastContact: '最近：45天前',
    premium: '¥18万/年',
    badges: ['VIP', '流失预警'],
    tags: ['风险意识', '宝妈'],
  },
  {
    id: 'zhang-ming-yuan',
    name: '张明远',
    avatar: '张',
    company: '远明科技',
    lastContact: '最近：7天前',
    premium: '¥8万/年',
    badge: '今日生日',
    tags: ['二孩家庭', '高收入'],
  },
  {
    id: 'chen-xue-mei',
    name: '陈雪梅',
    avatar: '陈',
    company: '私人',
    lastContact: '最近：14天前',
    premium: '¥6万/年',
    tags: ['纪念日', '未婚'],
  },
  {
    id: 'lin-de-hua',
    name: '林德华',
    avatar: '林',
    company: '德华律师',
    lastContact: '最近：30天前',
    premium: '¥2万/年',
    tags: ['风险意识'],
  },
];

export const journeyCustomers = ['王建国', '李雅琴', '张明远', '陈雪梅', '林德华'];

export const journeyBatchCustomers = [
  { name: '王女士', avatar: '王', tag: '高净值' },
  { name: '李先生', avatar: '李', tag: '宝妈' },
  { name: '张女士', avatar: '张', tag: '续保' },
  { name: '陈先生', avatar: '陈' },
  { name: '刘女士', avatar: '刘', tag: '高净值' },
  { name: '赵先生', avatar: '赵' },
  { name: '周女士', avatar: '周', tag: '宝妈' },
  { name: '吴先生', avatar: '吴', tag: '续保' },
  { name: '郑女士', avatar: '郑' },
  { name: '孙先生', avatar: '孙', tag: '高净值' },
];

export const followupTasks = [
  {
    id: 'budget',
    title: '类似的客户每年可接受的保险预算大概是多少',
    desc: '根据相似客户画像的成交案例，得出大致的可接受……',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'versions',
    title: '不同预算方案版本',
    desc: '根据相似客户画像的成交案例，得出大致的可接受……',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'revisit',
    title: '客户拜访后回访',
    desc: '根据相似客户画像的成交案例，得出大致的可接受……',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'claim',
    title: '准备好理赔案例',
    desc: '根据相似客户画像的成交案例，得出大致的可接受……',
    deadline: '2026年7月12日 12:20 前',
  },
];

export interface OperationTask {
  id: string;
  title: string;
  type: string;
  color: string;
  deadline: string;
  progress: string;
}

export const operationTasks: OperationTask[] = [
  {
    id: 'birthday',
    title: '7月生日祝福发送',
    type: 'Birthday',
    color: '#ffff00',
    deadline: '截至时间：2025/01/11 18:00',
    progress: '进度（0/21）',
  },
  {
    id: 'father-day',
    title: '2026年父情节祝福',
    type: 'Father-s-Day',
    color: '#00a3ac',
    deadline: '截至时间：2025/01/11 18:00',
    progress: '进度（0/21）',
  },
];

export interface OperationCustomer {
  name: string;
  phone: string;
  owner: string;
  status: 'todo' | 'done';
}

export const operationCustomers: OperationCustomer[] = [
  {
    name: 'Roise LI',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'todo',
  },
  {
    name: 'LI hehe',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'todo',
  },
  {
    name: 'Jack Wang',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'todo',
  },
  {
    name: 'Chloe Tian',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'todo',
  },
  {
    name: 'Alice Wu',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Ryan Chen',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Mia Zhao',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Eric Sun',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Nina Guo',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Kevin Lin',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Dora Xu',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Leo Ma',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Yuki Han',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Mark Luo',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Grace He',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Tony Bai',
    phone: '+81-8978900',
    owner: 'Judy Zhang',
    status: 'done',
  },
];

export const inviteCustomers = ['于贝儿', 'Cloudy', 'Cloudy', 'Cloudy'];
