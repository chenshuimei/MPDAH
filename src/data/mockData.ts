import { ChatMessage, ConversationSession, MetricData } from '@/types';

/* ────────── Quick Prompts (expanded to 12, covering cross-platform) ────────── */

export const quickPrompts = [
  // 综合分析
  { icon: '🔗', label: '综合数据诊断', prompt: '综合分析ARMS性能数据和We分析运营数据，给出今日小程序整体健康度评估' },
  { icon: '📊', label: '小程序活跃概况', prompt: '查看今日小程序活跃概况，包括累计用户、日访问人数、打开次数和页面数' },
  // We分析
  { icon: '👥', label: '新用户引流分析', prompt: '分析新用户引流来源Top10，哪些渠道效果最好？' },
  { icon: '🔄', label: '留存与流失分析', prompt: '查看留存指标概况和流失回流数据，活跃日留存和新增日留存分别是多少？' },
  { icon: '📱', label: '访问平台与来源', prompt: '分析访问平台分布和访问来源Top10，线下扫码占比多少？' },
  { icon: '📄', label: '页面访问热度', prompt: '查看页面访问Top10和页面跳出率分析' },
  // ARMS性能
  { icon: '⚡', label: '页面性能趋势', prompt: '分析最近7天的页面加载速度趋势，包括FCP和LCP指标' },
  { icon: '🐛', label: 'JS错误排查', prompt: '查看最近24小时的JS错误Top10，分析错误原因和影响范围' },
  { icon: '📡', label: 'API接口监控', prompt: '分析今天API接口的调用成功率和响应时间分布' },
  // 高级综合
  { icon: '📈', label: '异动分析诊断', prompt: '今日数据是否有异动？结合ARMS性能和We分析流量数据进行异动归因' },
  { icon: '🎯', label: '转化漏斗分析', prompt: '分析从访问到下单的转化漏斗，找出流失最严重的环节' },
  { icon: '🏥', label: '性能-留存关联', prompt: '分析页面加载性能与用户留存率的关联性，性能波动是否影响了留存？' },
];

/* ────────── Overview Metrics (based on real We分析 data) ────────── */

export const overviewMetrics: MetricData[] = [
  { label: '累计用户', value: '126.59万', change: 0.52, unit: '' },
  { label: '日访问人数', value: '1.85万', change: 2.20, unit: '' },
  { label: '日打开次数', value: '3.78万', change: -0.41, unit: '' },
  { label: '日访问页面', value: '33.01万', change: 6.14, unit: '' },
  { label: 'FCP', value: '1.20', change: -5.2, unit: 's' },
  { label: 'JS错误率', value: '0.12', change: -18.5, unit: '%' },
];

/* ────────── Data Arrays ────────── */

export const visitTrendData = [
  { date: '04-08', uv: 15845, pv: 280000, newUsers: 5920, opens: 32100 },
  { date: '04-09', uv: 16791, pv: 295000, newUsers: 6400, opens: 34500 },
  { date: '04-10', uv: 18032, pv: 310000, newUsers: 6616, opens: 37800 },
  { date: '04-11', uv: 17500, pv: 298000, newUsers: 6100, opens: 35200 },
  { date: '04-12', uv: 15204, pv: 265000, newUsers: 5500, opens: 31800 },
  { date: '04-13', uv: 18079, pv: 320000, newUsers: 6800, opens: 38200 },
  { date: '04-14', uv: 18500, pv: 330100, newUsers: 6616, opens: 37800 },
];

export const performanceData = [
  { date: '04-08', fcp: 1.35, lcp: 2.1, ttfb: 0.32, cls: 0.05 },
  { date: '04-09', fcp: 1.28, lcp: 2.0, ttfb: 0.30, cls: 0.04 },
  { date: '04-10', fcp: 1.42, lcp: 2.3, ttfb: 0.35, cls: 0.06 },
  { date: '04-11', fcp: 1.22, lcp: 1.9, ttfb: 0.28, cls: 0.04 },
  { date: '04-12', fcp: 1.18, lcp: 1.85, ttfb: 0.26, cls: 0.03 },
  { date: '04-13', fcp: 1.25, lcp: 1.95, ttfb: 0.29, cls: 0.04 },
  { date: '04-14', fcp: 1.20, lcp: 1.88, ttfb: 0.27, cls: 0.03 },
];

export const retentionData = [
  { date: '04-08', day1: 18.49, day3: 16.08, day7: 15.82 },
  { date: '04-09', day1: 19.15, day3: 14.90, day7: 15.60 },
  { date: '04-10', day1: 19.15, day3: 16.23, day7: 16.02 },
  { date: '04-11', day1: 17.94, day3: 16.80, day7: 0 },
  { date: '04-12', day1: 18.83, day3: 17.46, day7: 0 },
  { date: '04-13', day1: 18.82, day3: 0, day7: 0 },
  { date: '04-14', day1: 0, day3: 0, day7: 0 },
];

export const retentionTableData = [
  ['周一 2026/04/13', '18,079', '18.82%', '', '', '', '', '', '', ''],
  ['周日 2026/04/12', '15,204', '18.83%', '17.46%', '', '', '', '', '', ''],
  ['周六 2026/04/11', '17,500', '17.94%', '16.97%', '16.80%', '', '', '', '', ''],
  ['周五 2026/04/10', '18,032', '19.15%', '15.87%', '16.23%', '16.02%', '', '', '', ''],
  ['周四 2026/04/09', '16,791', '19.15%', '17.05%', '14.90%', '15.96%', '15.60%', '', '', ''],
  ['周三 2026/04/08', '15,845', '18.49%', '17.03%', '16.08%', '13.98%', '15.67%', '15.82%', '', ''],
];

export const newUserSourceData = [
  { name: '线下扫码', value: 6321, pct: 95.54 },
  { name: '长按识别', value: 146, pct: 2.20 },
  { name: '手机端搜索', value: 112, pct: 1.69 },
  { name: '相册选取', value: 11, pct: 0.16 },
  { name: '任务栏', value: 11, pct: 0.16 },
  { name: '单聊分享', value: 3, pct: 0.04 },
  { name: '群聊分享', value: 3, pct: 0.04 },
  { name: '小程序跳转', value: 3, pct: 0.04 },
];

export const visitSourceData = [
  { name: '线下扫码', visitors: 11200, pct: 60.37 },
  { name: '任务栏', visitors: 7395, pct: 40.02 },
  { name: '小程序跳转', visitors: 1198, pct: 6.48 },
  { name: '手机端搜索', visitors: 573, pct: 3.10 },
  { name: '长按识别', visitors: 512, pct: 2.77 },
  { name: '发现·小...', visitors: 317, pct: 1.71 },
  { name: '相册选取', visitors: 97, pct: 0.52 },
  { name: '小程序消息', visitors: 77, pct: 0.41 },
];

export const platformData = [
  { name: 'Android', value: 42, fill: 'hsl(160, 84%, 39%)' },
  { name: 'iPhone', value: 48, fill: 'hsl(199, 89%, 48%)' },
  { name: 'Android Pad', value: 4, fill: 'hsl(38, 92%, 50%)' },
  { name: 'iPad', value: 3, fill: 'hsl(270, 76%, 60%)' },
  { name: '未知', value: 3, fill: 'hsl(215, 15%, 45%)' },
];

export const pageVisitData = [
  { page: '小程序授权页', visitors: 10800, pct: 58.33 },
  { page: '主页', visitors: 9525, pct: 51.54 },
  { page: '扫描结果页', visitors: 7958, pct: 43.06 },
  { page: '扫码明细页', visitors: 4717, pct: 25.52 },
  { page: '一元换购落地页', visitors: 4338, pct: 23.47 },
  { page: '扫箱码落地页', visitors: 4217, pct: 22.82 },
  { page: '兑付记录页', visitors: 2289, pct: 12.38 },
  { page: '注册页', visitors: 2146, pct: 11.61 },
  { page: '个人中心页', visitors: 2110, pct: 11.41 },
  { page: '门店中心页', visitors: 1170, pct: 6.33 },
];

export const apiMonitorData = [
  { name: '/api/user/auth', calls: 45200, successRate: 99.9, avgTime: 85, p99: 320 },
  { name: '/api/scan/result', calls: 38100, successRate: 99.7, avgTime: 156, p99: 580 },
  { name: '/api/order/create', calls: 12400, successRate: 99.5, avgTime: 234, p99: 890 },
  { name: '/api/product/exchange', calls: 8900, successRate: 99.8, avgTime: 192, p99: 650 },
  { name: '/api/store/nearby', calls: 6500, successRate: 99.2, avgTime: 312, p99: 1200 },
  { name: '/api/payment/init', calls: 4200, successRate: 99.6, avgTime: 445, p99: 1500 },
];

export const jsErrorData = [
  { type: 'TypeError', message: "Cannot read properties of undefined (reading 'map')", count: 234, page: '/pages/scan/result' },
  { type: 'NetworkError', message: 'request:fail timeout', count: 412, page: '(全局)' },
  { type: 'ReferenceError', message: 'wx.getLocation is not a function', count: 128, page: '/pages/store/center' },
  { type: 'SyntaxError', message: 'Unexpected token <', count: 89, page: '/pages/order/detail' },
  { type: 'RangeError', message: 'Maximum call stack size exceeded', count: 56, page: '/pages/exchange/list' },
];

/* ────────── Conversations ────────── */

export const mockConversations: ConversationSession[] = [
  { id: '1', title: '综合健康度诊断报告', timestamp: new Date('2026-04-15T10:30:00'), messageCount: 8, dataSource: 'all' },
  { id: '2', title: '页面性能与留存关联', timestamp: new Date('2026-04-15T09:15:00'), messageCount: 6, dataSource: 'all' },
  { id: '3', title: '新用户引流渠道分析', timestamp: new Date('2026-04-14T16:20:00'), messageCount: 5, dataSource: 'wedata' },
  { id: '4', title: 'API超时问题排查', timestamp: new Date('2026-04-14T11:45:00'), messageCount: 10, dataSource: 'arms' },
  { id: '5', title: '转化漏斗优化建议', timestamp: new Date('2026-04-13T14:30:00'), messageCount: 7, dataSource: 'all' },
  { id: '6', title: '流失用户回流策略', timestamp: new Date('2026-04-13T10:00:00'), messageCount: 4, dataSource: 'wedata' },
];

/* ────────── Response Generator ────────── */

export function generateMockResponse(userPrompt: string): ChatMessage {
  const p = userPrompt.toLowerCase();

  // ──── 1. 综合诊断（跨平台） ────
  if (p.includes('综合') || p.includes('健康') || p.includes('诊断') || p.includes('整体')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '我已综合ARMS性能监控和We分析运营数据，为您生成今日小程序整体健康度评估。\n\n当前综合健康评分：87/100（良好）。流量侧表现优秀，日访问用户1.85万（较平日增长29.4%），但ARMS检测到/api/store/nearby接口P99达1200ms，可能影响门店页体验和该页面的跳出率。',
      metrics: [
        { label: '健康评分', value: '87', unit: '/100', change: 3.2 },
        { label: '日访问人数', value: '1.85万', change: 29.4 },
        { label: '页面FCP', value: '1.20', unit: 's', change: -5.2 },
        { label: 'API成功率', value: '99.65', unit: '%', change: -0.15 },
      ],
      charts: [
        {
          type: 'area', title: '流量 × 性能趋势对比（综合视图）',
          data: visitTrendData.map((v, i) => ({ ...v, fcp: performanceData[i]?.fcp ?? 0 })),
          xKey: 'date',
          yKeys: [
            { key: 'uv', color: 'hsl(199, 89%, 48%)', name: '日UV' },
            { key: 'newUsers', color: 'hsl(160, 84%, 39%)', name: '新增用户' },
          ],
        },
        {
          type: 'line', title: 'FCP性能趋势（ARMS）',
          data: performanceData,
          xKey: 'date',
          yKeys: [
            { key: 'fcp', color: 'hsl(38, 92%, 50%)', name: 'FCP (s)' },
            { key: 'lcp', color: 'hsl(0, 84%, 60%)', name: 'LCP (s)' },
          ],
        },
      ],
      insights: [
        { type: 'positive', title: '流量增长强劲', detail: '日访问用户较平日增加4,194人（+29.4%），增长来源主要为线下扫码（60.37%），运营活动效果显著。' },
        { type: 'positive', title: 'FCP持续优化', detail: 'FCP从04-10的1.42s优化至1.20s，连续3天保持良好评级，页面渲染体验改善。' },
        { type: 'warning', title: '门店接口响应慢', detail: '/api/store/nearby P99达1200ms，超出500ms阈值，可能导致门店中心页跳出率升高。' },
        { type: 'warning', title: '网络错误集中', detail: 'NetworkError占JS错误的44.8%（412次），主要发生在弱网环境下的全局请求超时。' },
      ],
      solutions: [
        { priority: 'high', action: '优化门店查询接口', detail: '对/api/store/nearby增加Redis缓存和距离计算预处理，目标P99降至500ms以内', owner: '后端团队' },
        { priority: 'high', action: '增加网络请求容错', detail: '全局wx.request增加自动重试机制（最多2次），添加离线缓存兜底方案', owner: '前端团队' },
        { priority: 'medium', action: '监控留存与性能关联', detail: '建立FCP>2s页面的用户留存追踪看板，验证性能对留存的影响系数', owner: '数据团队' },
        { priority: 'low', action: '优化授权页转化', detail: '授权页UV占58.33%但注册页仅11.61%，建议A/B测试简化授权流程', owner: '产品团队' },
      ],
    };
  }

  // ──── 2. 小程序活跃概况 ────
  if (p.includes('活跃') || (p.includes('概况') && (p.includes('访问') || p.includes('小程序')))) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '根据We分析平台数据（04/14），小程序活跃概况如下：\n\n累计用户达到126.59万人（较昨日+0.52%，7日前+3.58%）。日访问人数1.85万（较昨日+2.20%，7日前+14.60%），日打开次数3.78万（较昨日-0.41%），日访问页面数33.01万（较昨日+6.14%，7日前+19.04%）。\n\n新增用户6,616人（较昨日+3.35%），新用户当日打开次数1.00万。添加至"我的小程序"总人数1.01万，新添加43人。',
      metrics: [
        { label: '累计用户', value: '126.59万', change: 0.52 },
        { label: '日访问人数', value: '1.85万', change: 2.20 },
        { label: '日打开次数', value: '3.78万', change: -0.41 },
        { label: '日访问页面', value: '33.01万', change: 6.14 },
        { label: '新增用户', value: '6,616', change: 3.35 },
        { label: '新添加小程序', value: '43', change: -2.28 },
      ],
      chart: {
        type: 'area', title: '近7天核心访问指标趋势',
        data: visitTrendData, xKey: 'date',
        yKeys: [
          { key: 'uv', color: 'hsl(199, 89%, 48%)', name: '日访问人数' },
          { key: 'newUsers', color: 'hsl(160, 84%, 39%)', name: '新增用户' },
          { key: 'opens', color: 'hsl(38, 92%, 50%)', name: '打开次数' },
        ],
      },
      insights: [
        { type: 'positive', title: '用户增长持续', detail: '累计用户稳定增长，7日增幅3.58%，日新增用户维持在6,000+水平。' },
        { type: 'positive', title: '页面深度提升', detail: '日访问页面数增长6.14%，人均访问深度5.18页（较昨日+0.93%），用户参与度加深。' },
        { type: 'warning', title: '打开次数微降', detail: '日打开次数较昨日下降0.41%，需关注是否有推送疲劳或入口变化。' },
        { type: 'neutral', title: '添加小程序量偏低', detail: '新添加"我的小程序"仅43人（较昨日-2.28%），建议在关键路径增加引导。' },
      ],
      solutions: [
        { priority: 'medium', action: '优化推送策略', detail: '分析打开次数下降原因，对高活跃用户降低推送频率避免疲劳', owner: '运营团队' },
        { priority: 'medium', action: '增加收藏引导', detail: '在扫码结果页和兑换成功页添加"添加到我的小程序"引导弹窗', owner: '产品团队' },
      ],
    };
  }

  // ──── 3. 新用户引流分析 ────
  if (p.includes('引流') || p.includes('新用户') && p.includes('来源')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '新用户引流来源分析（04/14）：线下扫码以95.54%的绝对优势成为最主要的新用户获取渠道（6,321人），其次是长按识别（2.20%）和手机端搜索（1.69%）。线上渠道合计不足5%，表明当前增长高度依赖线下场景。',
      chart: {
        type: 'bar', title: '新用户引流来源 Top 8',
        data: newUserSourceData, xKey: 'name',
        yKeys: [{ key: 'value', color: 'hsl(199, 89%, 48%)', name: '新用户数' }],
      },
      table: {
        title: '引流来源明细',
        headers: ['渠道', '新用户数', '占比'],
        rows: newUserSourceData.map(d => [d.name, d.value.toLocaleString(), d.pct + '%']),
      },
      insights: [
        { type: 'warning', title: '渠道集中度过高', detail: '线下扫码占比95.54%，单一渠道依赖风险高，若线下场景受限将严重影响获客。' },
        { type: 'neutral', title: '搜索渠道潜力未释放', detail: '手机端搜索仅1.69%，微信搜一搜的品牌词和关键词优化空间大。' },
        { type: 'neutral', title: '社交裂变极弱', detail: '单聊分享+群聊分享合计仅6人，社交传播链路几乎不存在。' },
      ],
      solutions: [
        { priority: 'high', action: '建立社交裂变机制', detail: '在扫码结果页和兑换成功页增加"分享给好友"激励（如额外积分），激活社交传播', owner: '产品团队' },
        { priority: 'high', action: '优化微信搜索SEO', detail: '完善小程序品牌关键词、页面path配置和服务标签，提升搜一搜曝光', owner: '运营团队' },
        { priority: 'medium', action: '拓展线上引流', detail: '评估公众号关注引导、视频号短视频挂载小程序等线上获客渠道', owner: '市场团队' },
      ],
    };
  }

  // ──── 4. 留存与流失 ────
  if (p.includes('留存') || p.includes('流失') || p.includes('回流')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '留存指标概况（04/13）：活跃日留存18.82%（较昨日-0.02%，7日前+7.55%），新增日留存5.20%（较昨日+88.43%，7日前+101.09%）。流失用户67.42万人（+0.45%），回流用户940人（较昨日-3.99%）。\n\n新增日留存大幅跃升值得关注，说明新用户质量显著提高。但整体活跃日留存仍在19%以下，有提升空间。',
      metrics: [
        { label: '活跃日留存', value: '18.82', unit: '%', change: -0.02 },
        { label: '新增日留存', value: '5.20', unit: '%', change: 88.43 },
        { label: '流失用户', value: '67.42万', change: 0.45 },
        { label: '回流用户', value: '940', change: -3.99 },
      ],
      chart: {
        type: 'line', title: '留存率趋势（近7天）',
        data: retentionData.filter(d => d.day1 > 0), xKey: 'date',
        yKeys: [
          { key: 'day1', color: 'hsl(199, 89%, 48%)', name: '1天后留存' },
          { key: 'day3', color: 'hsl(160, 84%, 39%)', name: '3天后留存' },
          { key: 'day7', color: 'hsl(38, 92%, 50%)', name: '7天后留存' },
        ],
      },
      table: {
        title: '留存指标数据明细表格',
        headers: ['活跃周期', '活跃用户数', '1天后', '2天后', '3天后', '4天后', '5天后', '6天后', '7天后', '14天后'],
        rows: retentionTableData,
      },
      insights: [
        { type: 'positive', title: '新增留存大幅提升', detail: '新增日留存从2.76%跃升至5.20%（+88.43%），近期获取的新用户质量显著提高。' },
        { type: 'warning', title: '活跃留存偏低', detail: '活跃日留存18.82%，低于小程序行业基准25%，留存衰减曲线陡峭。' },
        { type: 'warning', title: '流失规模持续扩大', detail: '流失用户67.42万且持续增长（+0.45%），回流用户仅940人，回流率极低。' },
      ],
      solutions: [
        { priority: 'high', action: '建立用户生命周期管理', detail: '对7日未活跃用户触发模板消息召回，30日未活跃用户发放优惠券激活', owner: '运营团队' },
        { priority: 'high', action: '优化新用户首次体验', detail: '新增留存提升说明方向正确，继续优化首次扫码→注册→兑换的完整引导流程', owner: '产品团队' },
        { priority: 'medium', action: '建立回流机制', detail: '对流失用户通过公众号推送+短信触达，配合专属回归礼包提升回流率', owner: '运营团队' },
      ],
    };
  }

  // ──── 5. 访问平台与来源 ────
  if (p.includes('平台') || p.includes('来源') || p.includes('扫码')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '访问平台与来源分析（04/14）：\n\n平台分布方面，iPhone占48%，Android占42%，Android Pad占4%，iPad占3%。访问来源Top3：线下扫码1.12万人（60.37%）、任务栏7,395人（40.02%）、小程序跳转1,198人（6.48%）。\n\n线下扫码为绝对主力入口，任务栏（即"我的小程序"快捷入口）贡献了重要的回访流量。',
      charts: [
        {
          type: 'pie', title: '访问平台分布',
          data: platformData, xKey: 'name',
          yKeys: [{ key: 'value', color: '', name: '占比(%)' }],
        },
        {
          type: 'bar', title: '访问来源 Top 8',
          data: visitSourceData, xKey: 'name',
          yKeys: [{ key: 'visitors', color: 'hsl(199, 89%, 48%)', name: '访问人数' }],
        },
      ],
      insights: [
        { type: 'positive', title: '任务栏回访流量健康', detail: '任务栏贡献40.02%访问，说明用户有主动回访习惯，小程序在"我的小程序"中有较好留存。' },
        { type: 'neutral', title: 'iOS用户略占优势', detail: 'iPhone占48%、Android占42%，需确保两端体验一致性，尤其关注Android Pad适配。' },
        { type: 'warning', title: '发现页入口流量低', detail: '"发现·小程序"仅317人（1.71%），微信生态的自然流量发现机制利用不足。' },
      ],
      solutions: [
        { priority: 'medium', action: '提升发现页曝光', detail: '优化小程序服务标签和类目配置，争取微信"附近的小程序"推荐位', owner: '运营团队' },
        { priority: 'medium', action: 'Android Pad适配', detail: 'Android Pad用户占4%（约740人），需排查该设备的页面布局和交互兼容性', owner: '前端团队' },
      ],
    };
  }

  // ──── 6. 页面访问热度 ────
  if (p.includes('页面') && (p.includes('访问') || p.includes('热度') || p.includes('跳出'))) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '页面访问概况（04/14）：日访问页面数33.01万页，人均访问深度5.18页（较昨日+0.93%，7日前+11.73%），次均访问深度2.53页。页面跳出率28.99%（用户维度），较昨日下降1.32%。\n\n授权页以1.08万UV（58.33%）位居第一，其次是主页9,525（51.54%）和扫描结果页7,958（43.06%）。',
      metrics: [
        { label: '日访问页面', value: '33.01万', change: 6.14 },
        { label: '人均深度', value: '5.18', unit: '页', change: 0.93 },
        { label: '次均深度', value: '2.53', unit: '页', change: 3.58 },
        { label: '跳出率', value: '28.99', unit: '%', change: -1.32 },
      ],
      table: {
        title: '页面访问 Top 10',
        headers: ['页面', '访问人数', '占比'],
        rows: pageVisitData.map(d => [d.page, d.visitors.toLocaleString(), d.pct + '%']),
      },
      insights: [
        { type: 'positive', title: '访问深度持续提升', detail: '人均访问深度5.18页（7日前+11.73%，30日前+34.33%），用户参与度呈良好上升趋势。' },
        { type: 'warning', title: '授权页占比过高', detail: '授权页UV占58.33%，但注册页仅11.61%，意味着大量用户在授权环节未进入核心流程。' },
        { type: 'neutral', title: '门店页流量偏低', detail: '门店中心页仅1,170人（6.33%），作为线下联动的关键页面，曝光度需要提升。' },
      ],
      solutions: [
        { priority: 'high', action: '优化授权→注册转化', detail: '授权页→注册页存在46.72%的流失，建议简化授权流程或合并步骤减少跳转', owner: '产品团队' },
        { priority: 'medium', action: '提升门店页曝光', detail: '在主页和扫码结果页增加"附近门店"入口，引导用户浏览线下门店信息', owner: '产品团队' },
        { priority: 'low', action: '跳出率优化', detail: '28.99%的跳出率处于良好水平，继续监控即可。关注授权页的单页跳出比例。', owner: '数据团队' },
      ],
    };
  }

  // ──── 7. 性能趋势 ────
  if (p.includes('性能') || p.includes('加载') || p.includes('fcp') || p.includes('lcp')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '根据ARMS性能监控数据，近7天页面加载性能持续优化。当前FCP（首次内容绘制）为1.20s，LCP（最大内容绘制）为1.88s，均达到"良好"评级。TTFB平均0.27s，CLS为0.03，体验评分优秀。\n\n04-10的FCP升至1.42s需要关注，当天同步出现了CDN节点切换和一次部署发布。',
      metrics: [
        { label: 'FCP', value: '1.20', unit: 's', change: -5.2 },
        { label: 'LCP', value: '1.88', unit: 's', change: -3.8 },
        { label: 'TTFB', value: '0.27', unit: 's', change: -6.9 },
        { label: 'CLS', value: '0.03', change: -25.0 },
      ],
      chart: {
        type: 'line', title: '近7天核心性能指标（ARMS）',
        data: performanceData, xKey: 'date',
        yKeys: [
          { key: 'fcp', color: 'hsl(199, 89%, 48%)', name: 'FCP (s)' },
          { key: 'lcp', color: 'hsl(38, 92%, 50%)', name: 'LCP (s)' },
          { key: 'ttfb', color: 'hsl(160, 84%, 39%)', name: 'TTFB (s)' },
        ],
      },
      insights: [
        { type: 'positive', title: 'FCP稳步优化', detail: 'FCP从04-10的1.42s降至1.20s，连续3天在1.25s以内，达到Web Vitals良好标准。' },
        { type: 'warning', title: '04-10性能波动', detail: 'FCP突增至1.42s，LCP达2.3s，与CDN节点切换和当日版本发布时间吻合。' },
        { type: 'positive', title: 'CLS表现优秀', detail: 'CLS维持在0.03-0.06区间，远低于0.1的良好阈值，布局稳定性好。' },
      ],
      solutions: [
        { priority: 'medium', action: '建立发布性能卡点', detail: '在CI/CD流程中增加性能基线检测，FCP回归>1.3s时阻止发布', owner: '工程效能' },
        { priority: 'medium', action: '优化CDN切换策略', detail: '04-10的性能回归与CDN相关，建议配置多CDN回源和灰度切换机制', owner: '运维团队' },
        { priority: 'low', action: '关注LCP长尾', detail: 'LCP均值1.88s良好，但需关注P95/P99是否存在长尾超3s的情况', owner: '前端团队' },
      ],
    };
  }

  // ──── 8. JS错误 ────
  if (p.includes('错误') || p.includes('error') || p.includes('bug') || p.includes('异常')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: 'ARMS监控检测到近24小时共919次JS错误，错误率0.12%（较昨日下降18.5%）。NetworkError占比最高（412次/44.8%），主要为弱网环境下的请求超时。TypeError排第二（234次），集中在扫描结果页的数据渲染逻辑。',
      metrics: [
        { label: '总错误数', value: '919', change: -18.5 },
        { label: '错误率', value: '0.12', unit: '%', change: -18.5 },
        { label: '影响页面', value: '5', unit: '个' },
        { label: '影响用户', value: '687', change: -12.3 },
      ],
      table: {
        title: 'JS错误 Top 5',
        headers: ['类型', '错误信息', '次数', '影响页面'],
        rows: jsErrorData.map(e => [e.type, e.message, e.count.toString(), e.page]),
      },
      insights: [
        { type: 'warning', title: '网络错误占比高', detail: 'NetworkError 412次（44.8%），全局request:fail timeout集中在12:00-14:00高峰时段。' },
        { type: 'warning', title: '扫描结果页TypeError', detail: "234次'map'属性读取错误，原因是接口返回空数据时缺少防御性编程。" },
        { type: 'positive', title: '错误率持续下降', detail: '错误率从0.15%降至0.12%（-18.5%），前次修复的ReferenceError已生效。' },
      ],
      solutions: [
        { priority: 'high', action: '修复扫描结果页TypeError', detail: "在/pages/scan/result页面对API返回数据增加空值校验：data?.list?.map() ?? []", owner: '前端团队' },
        { priority: 'high', action: '增强网络请求容错', detail: '全局封装wx.request，增加超时重试（3s超时，最多重试2次）和离线缓存策略', owner: '前端团队' },
        { priority: 'medium', action: '修复门店定位问题', detail: 'wx.getLocation在部分机型不可用，增加兼容判断和降级方案（IP定位兜底）', owner: '前端团队' },
      ],
    };
  }

  // ──── 9. API接口监控 ────
  if (p.includes('api') || p.includes('接口') || p.includes('请求')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: 'ARMS接口监控显示，今日共有115,300次API调用，整体成功率99.65%。平均响应时间204ms。/api/payment/init响应最慢（P99达1500ms），/api/store/nearby成功率最低（99.2%）。',
      chart: {
        type: 'bar', title: 'API接口响应时间分布',
        data: apiMonitorData, xKey: 'name',
        yKeys: [
          { key: 'avgTime', color: 'hsl(199, 89%, 48%)', name: '平均响应(ms)' },
          { key: 'p99', color: 'hsl(0, 84%, 60%)', name: 'P99(ms)' },
        ],
      },
      table: {
        title: 'API接口监控详情',
        headers: ['接口', '调用量', '成功率', '平均响应', 'P99'],
        rows: apiMonitorData.map(a => [a.name, a.calls.toLocaleString(), a.successRate + '%', a.avgTime + 'ms', a.p99 + 'ms']),
      },
      insights: [
        { type: 'warning', title: '支付接口响应慢', detail: '/api/payment/init平均445ms、P99达1500ms，严重影响支付体验和转化率。' },
        { type: 'warning', title: '门店查询可靠性不足', detail: '/api/store/nearby成功率99.2%（低于99.5%基线），P99达1200ms。' },
        { type: 'positive', title: '用户认证接口优秀', detail: '/api/user/auth成功率99.9%、平均85ms，核心鉴权链路稳定。' },
      ],
      solutions: [
        { priority: 'high', action: '优化支付初始化', detail: '将支付预签名前置到下单环节，减少用户点击支付后的等待时间', owner: '后端团队' },
        { priority: 'high', action: '门店接口加缓存', detail: '门店列表按区域做5分钟Redis缓存，距离排序改为客户端计算', owner: '后端团队' },
        { priority: 'medium', action: '建立API性能SLA', detail: '定义各接口的响应时间基线和告警阈值，P99>500ms自动触发告警', owner: 'SRE团队' },
      ],
    };
  }

  // ──── 10. 异动分析 ────
  if (p.includes('异动') || p.includes('波动') || p.includes('归因')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '异动分析诊断（04/14）：\n\n天访问用户1.85万（对比平日增加4,194人，增幅29.4%），基于异动规则29.5%判断，有小幅增长，无明显异动。\n\n综合ARMS和We分析数据交叉比对：流量增长与线下扫码活动强相关（04/11周六投放新一批物料），同时ARMS显示04/10的FCP波动（1.42s）未对次日留存产生明显负面影响（04/11留存17.94% vs 04/10的19.15%，属正常波动）。',
      metrics: [
        { label: '日访问用户', value: '1.85万', change: 29.4 },
        { label: '对比平日增加', value: '4,194', unit: '人' },
        { label: '异动判定', value: '小幅增长' },
        { label: '30日均值', value: '1.43万' },
      ],
      chart: {
        type: 'area', title: '天访问用户趋势 × 变量对比',
        data: visitTrendData, xKey: 'date',
        yKeys: [
          { key: 'uv', color: 'hsl(199, 89%, 48%)', name: '日访问用户' },
        ],
      },
      insights: [
        { type: 'positive', title: '增长来源明确', detail: '流量增长主因：04/11投放新一批线下扫码物料，扫码渠道UV占比从55%提升至60.37%。' },
        { type: 'positive', title: '性能波动影响有限', detail: '04/10 FCP达1.42s，但04/11留存17.94%在正常区间内，性能短期波动未影响留存。' },
        { type: 'neutral', title: '无明显负面异动', detail: '所有核心指标在正常波动范围内，未触发异动规则（阈值29.5%）。' },
      ],
      solutions: [
        { priority: 'medium', action: '持续追踪物料效果', detail: '为不同批次线下物料设置独立渠道参数，精准归因每批投放的ROI', owner: '运营团队' },
        { priority: 'low', action: '完善异动规则', detail: '当前29.5%的异动阈值偏宽松，建议按业务场景分级设置（核心指标20%，次要指标30%）', owner: '数据团队' },
      ],
    };
  }

  // ──── 11. 转化漏斗 ────
  if (p.includes('转化') || p.includes('漏斗')) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '从访问到核心行为的转化漏斗分析：\n\n授权页（10,800 UV）→ 主页（9,525 UV，转化88.2%）→ 扫描结果页（7,958 UV，转化83.6%）→ 兑换落地页（4,338 UV，转化54.5%）→ 兑付记录页（2,289 UV，转化52.8%）→ 注册页（2,146 UV，转化93.8%）。\n\n最大流失环节在"扫描结果→兑换落地"之间，流失率高达45.5%，建议结合ARMS的该页面性能数据排查原因。',
      chart: {
        type: 'bar', title: '核心转化漏斗',
        data: [
          { step: '授权页', value: 10800 },
          { step: '主页', value: 9525 },
          { step: '扫描结果', value: 7958 },
          { step: '兑换落地', value: 4338 },
          { step: '兑付记录', value: 2289 },
          { step: '注册完成', value: 2146 },
        ],
        xKey: 'step', yKeys: [{ key: 'value', color: 'hsl(199, 89%, 48%)', name: '访问人数' }],
      },
      insights: [
        { type: 'warning', title: '兑换转化断崖下降', detail: '扫描结果→兑换落地转化仅54.5%，流失3,620人。这是整个漏斗最大的优化点。' },
        { type: 'positive', title: '授权→主页转化良好', detail: '88.2%的授权用户进入主页，授权流程转化率健康。' },
        { type: 'neutral', title: '注册环节转化极高', detail: '兑付→注册转化93.8%，说明到达此环节的用户意愿强烈，注册流程顺畅。' },
      ],
      solutions: [
        { priority: 'high', action: '优化兑换落地页', detail: '45.5%用户在此环节流失，需A/B测试：简化兑换说明、增大CTA按钮、添加倒计时紧迫感', owner: '产品团队' },
        { priority: 'high', action: '排查兑换页性能', detail: '结合ARMS数据检查兑换落地页加载时间，若FCP>2s则优先做性能优化', owner: '前端团队' },
        { priority: 'medium', action: '增加扫描后引导', detail: '在扫描结果页增加"立即兑换"强引导和活动利益点提示', owner: '设计团队' },
      ],
    };
  }

  // ──── 12. 性能-留存关联 ────
  if (p.includes('关联') || (p.includes('性能') && p.includes('留存'))) {
    return {
      id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
      content: '性能与留存的关联性分析（ARMS × We分析交叉）：\n\n将近7天的FCP数据与次日留存率进行对比发现：04-10 FCP最高（1.42s），对应04-11次日留存17.94%（7天中最低）；04-12 FCP最低（1.18s），对应04-13次日留存18.82%（较好水平）。\n\n相关性分析表明，FCP每降低0.1s，次日留存约提升0.4个百分点。但样本量有限，需要更长周期验证。',
      charts: [
        {
          type: 'line', title: 'FCP vs 次日留存趋势',
          data: [
            { date: '04-08', fcp: 1.35, retention: 18.49 },
            { date: '04-09', fcp: 1.28, retention: 19.15 },
            { date: '04-10', fcp: 1.42, retention: 17.94 },
            { date: '04-11', fcp: 1.22, retention: 18.83 },
            { date: '04-12', fcp: 1.18, retention: 18.82 },
          ],
          xKey: 'date',
          yKeys: [
            { key: 'fcp', color: 'hsl(38, 92%, 50%)', name: 'FCP (s)' },
            { key: 'retention', color: 'hsl(199, 89%, 48%)', name: '次日留存 (%)' },
          ],
        },
      ],
      insights: [
        { type: 'warning', title: '性能与留存负相关', detail: 'FCP上升的日期（04-10: 1.42s）对应次日留存下降（17.94%），呈现一定的负相关趋势。' },
        { type: 'positive', title: '性能优化带来留存收益', detail: 'FCP降至1.18s时，次日留存回升至18.82%，性能优化对留存有正向影响。' },
        { type: 'neutral', title: '需更长数据验证', detail: '7天样本量有限，建议建立30天以上的追踪窗口以验证相关性系数的统计显著性。' },
      ],
      solutions: [
        { priority: 'high', action: '建立性能-留存监控面板', detail: '在ARMS中配置自定义看板，将FCP/LCP与We分析的留存数据联合展示', owner: '数据团队' },
        { priority: 'medium', action: '设定性能留存阈值', detail: '当FCP>1.3s时触发预警，关联查看同期留存变化，建立因果判断机制', owner: 'SRE团队' },
        { priority: 'medium', action: '推进性能预算制度', detail: '设定各页面性能预算（FCP<1.2s, LCP<2.0s），纳入迭代评审标准', owner: '工程效能' },
      ],
    };
  }

  // ──── Fallback ────
  return {
    id: Date.now().toString(), role: 'assistant', timestamp: new Date(),
    content: '收到您的查询请求。我可以帮您进行以下分析：\n\n综合分析：综合数据诊断、异动归因分析、性能-留存关联、转化漏斗分析\n\nWe分析平台：活跃概况、新用户引流、留存与流失、访问来源、页面热度\n\nARMS性能监控：FCP/LCP性能趋势、JS错误排查、API接口监控\n\n请告诉我您想了解哪方面的数据，我会为您生成含智能洞察和解决方案的分析报告。',
    insights: [
      { type: 'neutral', title: '提示', detail: '您可以直接输入自然语言描述，如"分析新用户为什么留存低"、"综合评估今天小程序表现"等。' },
    ],
  };
}
