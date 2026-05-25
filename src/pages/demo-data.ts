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
    desc: '根据相似客户画像的成交案例，得出大致的可接受预算范围。',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'versions',
    title: '不同预算方案版本',
    desc: '准备基础版、均衡版和高配版，方便客户按预算做选择。',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'revisit',
    title: '客户拜访后回访',
    desc: '围绕教育金和重疾组合方案，确认家庭预算和决策人意见。',
    deadline: '2026年7月12日 12:20 前',
  },
  {
    id: 'claim',
    title: '准备好理赔案例',
    desc: '选择同龄孩子重疾理赔案例，重点解释免责与理赔材料。',
    deadline: '2026年7月12日 12:20 前',
  },
];

export const operationCustomers = ['Roise LI', 'LI hehe', 'Jack Wang', 'Chloe Tian'];

export const inviteCustomers = ['于贝儿', 'Cloudy', 'Cloudy', 'Cloudy'];
