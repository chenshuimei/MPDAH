import { MiniApp, RoleConfig, DashboardMetric, ShareConfig } from '@/types';

// 小程序配置
export const miniApps: MiniApp[] = [
  {
    id: 'jiaxiaobao',
    name: '嘉销宝',
    logo: '/src/assets/logo.png',
    description: '销售赋能与业绩管理平台',
    industry: '企业销售管理',
  },
  {
    id: 'jiayoushengyi',
    name: '嘉有生意',
    logo: '/src/assets/logo.png',
    description: '商家经营与获客增长平台',
    industry: '本地生活服务',
  },
];

// ============================================
// 6个角色配置 - 基于PRD文档优化
// ============================================

export const roleConfigs: RoleConfig[] = [
  {
    id: 'product',
    name: '产品经理',
    description: '关注产品健康度与体验驱动迭代',
    // 产品经理关注：规模活跃、拉新结构、留存流失、转化路径、页面体验、问题影响面
    focusMetrics: [
      'dailyActive',      // 日活跃用户
      'totalUsers',       // 累计用户
      'newUsers',         // 新增用户
      'retentionRate',    // 留存率
      'conversionRate',   // 转化率
      'pageDepth',        // 人均深度
      'fcp',              // 首屏体验
      'lcp',              // 最大内容渲染
      'jsError',          // JS错误影响
      'apiSuccess',       // API稳定性
    ],
    permissions: ['view_all', 'share', 'create_insight'],
  },
  {
    id: 'pm',
    name: '项目经理',
    description: '关注按期交付与风险控制',
    // 项目经理关注：发布后风险、质量门禁、实时波动、核心健康度、关键业务转化
    focusMetrics: [
      'healthScore',      // 健康评分
      'dailyActive',      // 日活跃
      'newUsers',         // 新增用户
      'retentionRate',    // 留存
      'conversionRate',   // 转化率
      'fcp',              // 性能
      'jsError',          // 异常数
      'apiSuccess',       // API错误
      'crashRate',        // 崩溃率
      'apiLatency',       // API延迟
    ],
    permissions: ['view_all', 'share', 'view_logs'],
  },
  {
    id: 'operation',
    name: '运营',
    description: '关注拉新促活与转化变现',
    // 运营关注：渠道效率、促活粘性、内容效果、交易复购、广告变现、活动体验
    focusMetrics: [
      'dailyActive',      // 日活跃
      'newUsers',         // 新增用户
      'trafficSource',    // 渠道来源
      'pageVisitTop',     // 页面热度
      'retentionRate',    // 留存
      'dailyRevenue',     // 日成交额
      'conversionRate',   // 转化率
      'repurchaseRate',   // 复购率
      'adRevenue',        // 广告收入
      'fcp',              // 活动体验
    ],
    permissions: ['view_all', 'share', 'create_campaign'],
  },
  {
    id: 'developer',
    name: '开发',
    description: '关注问题根因与性能优化',
    // 开发关注：API性能剖析、稳定性异常、卡顿治理、采集归因、链路漏斗
    focusMetrics: [
      'fcp',              // FCP
      'lcp',              // LCP
      'fid',              // FID
      'cls',              // CLS
      'apiLatency',       // API延迟
      'apiSuccess',       // API成功率
      'jsError',          // JS错误
      'crashRate',        // 崩溃率
      'longTask',         // 卡顿
      'resourceError',    // 资源错误
    ],
    permissions: ['view_tech', 'share', 'view_logs'],
  },
  {
    id: 'uiux',
    name: 'UI/UX设计师',
    description: '关注可用性与交互体验',
    // UI/UX关注：感知速度、交互延迟、布局稳定、行为停留、页面表现、流程可用性
    focusMetrics: [
      'fcp',              // 白屏时间
      'lcp',              // 最大内容渲染
      'fid',              // 交互延迟
      'cls',              // 布局抖动
      'pageDepth',        // 页面深度
      'pageVisitTop',     // 页面热度
      'conversionFunnel', // 转化漏斗
      'eventCount',       // 事件分析
      'timeOnPage',       // 停留时长
      'bounceRate',       // 跳出率
    ],
    permissions: ['view_all', 'share', 'view_heatmap'],
  },
  {
    id: 'admin',
    name: '管理员',
    description: '拥有全部权限，管理数据治理',
    focusMetrics: ['all'],
    permissions: ['all'],
  },
];

// ============================================
// 嘉销宝 - 完整指标库（按6个角色需求扩展）
// ============================================

export const jiaxiaobaoMetrics: DashboardMetric[] = [
  // ===== 流量指标 =====
  {
    id: 'totalUsers',
    label: '累计用户',
    value: '126.59万',
    change: 0.52,
    unit: '',
    description: '小程序累计注册用户总数',
    target: '130万',
    trend: 'up',
    category: 'traffic',
    aiInsight: '累计用户稳定增长，7日增幅3.58%。建议关注新用户转化效率，当前授权页到注册页流失率46.72%，优化空间较大。',
    detailPage: 'user-growth',
  },
  {
    id: 'dailyActive',
    label: '日活跃用户',
    value: '1.85万',
    change: 29.4,
    unit: '',
    description: '今日访问小程序的去重用户数',
    target: '2.0万',
    trend: 'up',
    category: 'traffic',
    aiInsight: '日活较平日增长29.4%，主要受04/11线下扫码物料投放影响。线下扫码渠道贡献60.37%流量，建议持续优化该渠道转化。',
    detailPage: 'daily-active',
  },
  {
    id: 'newUsers',
    label: '新增用户',
    value: '6,616',
    change: 3.35,
    unit: '',
    description: '今日新注册用户',
    target: '7,000',
    trend: 'up',
    category: 'traffic',
    aiInsight: '新增用户6,616人，线下扫码贡献95.54%。渠道集中度过高风险大，建议拓展社交裂变和搜索渠道。',
    detailPage: 'new-users',
  },
  {
    id: 'pageDepth',
    label: '人均访问深度',
    value: '5.18',
    change: 11.73,
    unit: '页',
    description: '平均每人访问页面数',
    target: '6页',
    trend: 'up',
    category: 'traffic',
    aiInsight: '人均访问深度5.18页，7日增幅11.73%。用户参与度持续提升，说明内容吸引力增强。',
    detailPage: 'page-depth',
  },
  {
    id: 'trafficSource',
    label: '主要来源',
    value: '线下扫码',
    change: 5.2,
    unit: '',
    description: '今日访问来源Top1',
    target: '',
    trend: 'up',
    category: 'traffic',
    aiInsight: '线下扫码占比60.37%，任务栏40.02%。渠道结构单一，建议拓展搜索和社交分享渠道。',
    detailPage: 'traffic-source',
  },
  {
    id: 'pageVisitTop',
    label: '热门页面',
    value: '授权页',
    change: 0,
    unit: '',
    description: '今日访问最多的页面',
    target: '',
    trend: 'stable',
    category: 'traffic',
    aiInsight: '授权页UV占58.33%，但注册页仅11.61%，意味着大量用户在授权环节未进入核心流程。',
    detailPage: 'page-visit',
  },

  // ===== 转化指标 =====
  {
    id: 'dailyRevenue',
    label: '日成交额',
    value: '¥28.5万',
    change: 15.3,
    unit: '',
    description: '今日通过小程序完成的交易总额',
    target: '¥30万',
    trend: 'up',
    category: 'conversion',
    aiInsight: '成交额增长15.3%，与流量增长趋势一致。客单价¥154，较上周提升8%。建议关注支付成功率，当前99.6%良好。',
    detailPage: 'revenue',
  },
  {
    id: 'conversionRate',
    label: '转化率',
    value: '4.32%',
    change: 0.8,
    unit: '%',
    description: '访问到成交的转化比例',
    target: '5.0%',
    trend: 'up',
    category: 'conversion',
    aiInsight: '转化率4.32%，行业平均水平。扫描结果页到兑换落地页流失率45.5%是最大优化点，建议简化兑换流程。',
    detailPage: 'conversion',
  },
  {
    id: 'repurchaseRate',
    label: '月复购率',
    value: '32.5%',
    change: 2.1,
    unit: '%',
    description: '用户月内重复购买比例',
    target: '35%',
    trend: 'up',
    category: 'conversion',
    aiInsight: '月复购率32.5%，较上月提升2.1%。会员体系贡献显著，建议继续优化会员权益。',
    detailPage: 'repurchase',
  },
  {
    id: 'conversionFunnel',
    label: '转化漏斗',
    value: '45.5%',
    change: -5.2,
    unit: '流失',
    description: '扫描结果→兑换落地流失率',
    target: '<30%',
    trend: 'down',
    category: 'conversion',
    aiInsight: '扫描结果页到兑换落地页流失率高达45.5%，是整个转化路径的最大瓶颈，建议A/B测试优化。',
    detailPage: 'funnel',
  },
  {
    id: 'adRevenue',
    label: '广告收入',
    value: '¥3,200',
    change: 8.5,
    unit: '',
    description: '今日广告变现收入',
    target: '¥3,500',
    trend: 'up',
    category: 'conversion',
    aiInsight: '广告收入¥3,200，eCPM ¥12.5。点击率2.3%，曝光率78%，建议优化广告位布局。',
    detailPage: 'ad-revenue',
  },

  // ===== 留存指标 =====
  {
    id: 'retentionRate',
    label: '次日留存',
    value: '18.82%',
    change: -0.02,
    unit: '%',
    description: '新用户次日回访比例',
    target: '25%',
    trend: 'stable',
    category: 'retention',
    aiInsight: '次日留存18.82%，低于行业基准25%。但新增用户留存从2.76%跃升至5.20%，说明近期获客质量显著提升。',
    detailPage: 'retention',
  },
  {
    id: 'day7Retention',
    label: '7日留存',
    value: '15.2%',
    change: 1.5,
    unit: '%',
    description: '用户7日内回访比例',
    target: '18%',
    trend: 'up',
    category: 'retention',
    aiInsight: '7日留存15.2%，呈上升趋势。建议建立用户生命周期管理，对7日未活跃用户触发召回。',
    detailPage: 'retention-7d',
  },
  {
    id: 'churnRate',
    label: '流失率',
    value: '8.5%',
    change: -0.8,
    unit: '%',
    description: '用户7日未回访比例',
    target: '<10%',
    trend: 'up',
    category: 'retention',
    aiInsight: '流失率8.5%，控制良好。流失用户67.42万，建议建立回流机制发放专属回归礼包。',
    detailPage: 'churn',
  },

  // ===== 性能指标 =====
  {
    id: 'fcp',
    label: 'FCP',
    value: '1.20',
    change: -5.2,
    unit: 's',
    description: '首次内容绘制时间',
    target: '<1.0s',
    trend: 'up',
    category: 'performance',
    aiInsight: 'FCP 1.20s达到良好标准，连续3天优化。04-10曾波动至1.42s，建议建立发布性能卡点防止回归。',
    detailPage: 'performance',
  },
  {
    id: 'lcp',
    label: 'LCP',
    value: '1.88',
    change: -3.8,
    unit: 's',
    description: '最大内容绘制时间',
    target: '<2.0s',
    trend: 'up',
    category: 'performance',
    aiInsight: 'LCP 1.88s良好，但需关注P95/P99是否存在长尾超3s的情况，特别是图片资源加载。',
    detailPage: 'lcp',
  },
  {
    id: 'fid',
    label: 'FID',
    value: '45',
    change: -12.5,
    unit: 'ms',
    description: '首次输入延迟',
    target: '<100ms',
    trend: 'up',
    category: 'performance',
    aiInsight: 'FID 45ms优秀，交互响应迅速。建议继续保持，避免在主线程执行耗时操作。',
    detailPage: 'fid',
  },
  {
    id: 'cls',
    label: 'CLS',
    value: '0.03',
    change: -25.0,
    unit: '',
    description: '累积布局偏移',
    target: '<0.1',
    trend: 'up',
    category: 'performance',
    aiInsight: 'CLS 0.03优秀，布局稳定性好。图片和广告位都设置了固定尺寸，避免了布局抖动。',
    detailPage: 'cls',
  },
  {
    id: 'apiLatency',
    label: 'API延迟',
    value: '204',
    change: 12.5,
    unit: 'ms',
    description: '接口平均响应时间',
    target: '<200ms',
    trend: 'down',
    category: 'performance',
    aiInsight: '平均延迟204ms，支付接口P99达1500ms严重影响体验。建议将支付预签名前置优化。',
    detailPage: 'api-latency',
  },
  {
    id: 'apiSuccess',
    label: 'API成功率',
    value: '99.65',
    change: -0.15,
    unit: '%',
    description: '接口调用成功比例',
    target: '99.9%',
    trend: 'stable',
    category: 'performance',
    aiInsight: '整体成功率99.65%，但/api/store/nearby仅99.2%。该接口P99达1200ms，建议增加缓存和优化查询逻辑。',
    detailPage: 'api-monitor',
  },

  // ===== 错误指标 =====
  {
    id: 'jsError',
    label: 'JS错误率',
    value: '0.12',
    change: -18.5,
    unit: '%',
    description: '前端JavaScript错误占比',
    target: '<0.1%',
    trend: 'up',
    category: 'error',
    aiInsight: '错误率0.12%，较昨日下降18.5%。NetworkError占44.8%，建议增加请求重试机制和离线缓存策略。',
    detailPage: 'error-monitor',
  },
  {
    id: 'crashRate',
    label: '崩溃率',
    value: '0.02',
    change: -5.0,
    unit: '%',
    description: '小程序崩溃比例',
    target: '<0.05%',
    trend: 'up',
    category: 'error',
    aiInsight: '崩溃率0.02%，控制良好。主要崩溃集中在低端Android设备，建议增加兼容性测试。',
    detailPage: 'crash',
  },
  {
    id: 'longTask',
    label: '卡顿次数',
    value: '128',
    change: -15.2,
    unit: '次',
    description: '长任务卡顿次数',
    target: '<150',
    trend: 'up',
    category: 'error',
    aiInsight: '卡顿次数128次，较上周下降15.2%。建议继续优化setData调用，避免大数据量同步更新。',
    detailPage: 'longtask',
  },
  {
    id: 'resourceError',
    label: '资源错误',
    value: '45',
    change: -8.5,
    unit: '次',
    description: '图片/资源加载失败次数',
    target: '<50',
    trend: 'up',
    category: 'error',
    aiInsight: '资源错误45次，主要是CDN节点偶发故障。建议配置多CDN回源和失败重试机制。',
    detailPage: 'resource-error',
  },

  // ===== 综合指标 =====
  {
    id: 'healthScore',
    label: '健康评分',
    value: '87',
    change: 3.2,
    unit: '/100',
    description: '综合业务健康度评估',
    target: '90',
    trend: 'up',
    category: 'traffic',
    aiInsight: '综合健康评分87分（良好）。流量侧优秀，但门店接口P99达1200ms可能影响门店页体验，建议优先优化。',
    detailPage: 'health',
  },
  {
    id: 'timeOnPage',
    label: '平均停留',
    value: '4:32',
    change: 15.1,
    unit: '',
    description: '用户平均停留时长',
    target: '5:00',
    trend: 'up',
    category: 'traffic',
    aiInsight: '平均停留4分32秒，较上周提升15.1%。用户在兑换流程中停留时间较长，建议优化流程缩短决策时间。',
    detailPage: 'time-on-page',
  },
  {
    id: 'bounceRate',
    label: '跳出率',
    value: '28.99',
    change: -1.32,
    unit: '%',
    description: '用户单页访问后离开比例',
    target: '<30%',
    trend: 'up',
    category: 'traffic',
    aiInsight: '跳出率28.99%，处于良好水平。授权页跳出率较高（46.72%），建议优化授权引导流程。',
    detailPage: 'bounce',
  },
  {
    id: 'eventCount',
    label: '人均事件',
    value: '12.5',
    change: 8.2,
    unit: '次',
    description: '人均触发事件次数',
    target: '15',
    trend: 'up',
    category: 'traffic',
    aiInsight: '人均事件12.5次，较上周提升8.2%。用户交互活跃度提升，核心功能使用率良好。',
    detailPage: 'events',
  },
];

// 嘉有生意 - 指标库（简化版）
export const jiayoushengyiMetrics: DashboardMetric[] = jiaxiaobaoMetrics.map(m => ({
  ...m,
  value: m.id === 'totalUsers' ? '89.32万' :
         m.id === 'dailyActive' ? '2.34万' :
         m.id === 'dailyRevenue' ? '¥45.8万' :
         m.id === 'conversionRate' ? '6.85%' :
         m.id === 'healthScore' ? '91' :
         m.id === 'fcp' ? '0.95' :
         m.value,
  change: Number(((m.change || 0) * (0.8 + Math.random() * 0.4)).toFixed(2)),
}));

// 示例分享记录
export const mockShares: ShareConfig[] = [
  {
    id: 'share-001',
    title: '嘉销宝 4月经营周报',
    description: '包含流量、转化、留存核心指标分析',
    metricIds: ['totalUsers', 'dailyActive', 'conversionRate', 'retentionRate'],
    createdAt: new Date('2026-04-14'),
    expiresAt: new Date('2026-05-14'),
    viewCount: 23,
    createdBy: '张经理',
  },
  {
    id: 'share-002',
    title: '性能优化效果评估',
    description: 'FCP优化前后的性能数据对比',
    metricIds: ['fcp', 'apiLatency', 'jsError'],
    createdAt: new Date('2026-04-13'),
    viewCount: 8,
    createdBy: '李开发',
  },
];

// 获取指定小程序的指标
export function getMetricsByMiniApp(miniAppId: string): DashboardMetric[] {
  return miniAppId === 'jiayoushengyi' ? jiayoushengyiMetrics : jiaxiaobaoMetrics;
}

// 根据角色获取关注指标
export function getMetricsByRole(metrics: DashboardMetric[], roleId: string): DashboardMetric[] {
  const role = roleConfigs.find(r => r.id === roleId);
  if (!role || role.focusMetrics.includes('all')) return metrics;
  return metrics.filter(m => role.focusMetrics.includes(m.id));
}
