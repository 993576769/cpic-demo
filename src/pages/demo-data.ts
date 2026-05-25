export interface CustomerRow {
  id: string;
  name: string;
  avatar: string;
  company: string;
  lastContact: string;
  premium: string;
  badge?: string;
  tags: string[];
}

export const customers: CustomerRow[] = [
  {
    id: 'wang',
    name: '王女士',
    avatar: '王',
    company: '互联网产品经理',
    lastContact: '最近联系 2小时前',
    premium: '¥12.8万/年',
    badge: '今日拜访',
    tags: ['宝妈', '二孩家庭', '风险意识高'],
  },
  {
    id: 'jian-guo',
    name: '王建国',
    avatar: '王',
    company: '制造业企业主',
    lastContact: '最近联系 昨天',
    premium: '¥8.6万/年',
    badge: 'VIP',
    tags: ['高收入', '有房有车', '企业主'],
  },
  {
    id: 'li-ya-qin',
    name: '李雅琴',
    avatar: '李',
    company: '三线家庭',
    lastContact: '最近联系 3天前',
    premium: '¥5.2万/年',
    tags: ['纪念日', '风险意识', '二孩家庭'],
  },
  {
    id: 'zhang-ming-yuan',
    name: '张明远',
    avatar: '张',
    company: '公务员',
    lastContact: '最近联系 7天前',
    premium: '¥3.8万/年',
    badge: '流失预警',
    tags: ['稳健型', '未婚', '沉睡客户'],
  },
  {
    id: 'chen-xue-mei',
    name: '陈雪梅',
    avatar: '陈',
    company: '自由职业',
    lastContact: '最近联系 今天',
    premium: '¥6.6万/年',
    badge: '今日生日',
    tags: ['宝妈', '高热客户', '生日'],
  },
];

export const journeyCustomers = ['王建国', '李雅琴', '张明远', '陈雪梅', '林德华'];

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
    phone: '+81-8978901',
    owner: 'Judy Zhang',
    status: 'done',
  },
  {
    name: 'Ryan Chen',
    phone: '+81-8978902',
    owner: 'Judy Zhang',
    status: 'done',
  },
];

export const inviteCustomers = ['于贝儿', 'Cloudy', 'Cloudy', 'Cloudy'];
