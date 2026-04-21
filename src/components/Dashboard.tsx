import { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, ChevronDown, Users, 
  Zap, ShoppingCart, RefreshCw, AlertCircle, Lightbulb,
  Share2, Moon, Sun, BarChart3, Activity, ArrowUpRight,
  Clock, Target, Globe, Smartphone, MousePointer2, LayoutDashboard,
  Layers, Bug, Palette, Shield, Briefcase
} from 'lucide-react';
import { MiniApp, UserRole, DashboardMetric } from '@/types';
import { miniApps, roleConfigs, getMetricsByMiniApp, getMetricsByRole } from '@/data/miniappData';
import { visitTrendData, performanceData, retentionData, platformData } from '@/data/mockData';
import MetricInsightPopover from './MetricInsightPopover';
import ShareModal from './ShareModal';
import DashboardChart from './DashboardChart';
import GeoDistributionChart from './GeoDistributionChart';
import clsx from 'clsx';

interface DashboardProps {
  currentRole: UserRole;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onMetricClick: (metric: DashboardMetric) => void;
  onEnterChat: () => void;
}

const roleIcons = {
  product: Briefcase,
  pm: Target,
  operation: ShoppingCart,
  developer: Bug,
  uiux: Palette,
  admin: Shield,
};

export default function Dashboard({ 
  currentRole, 
  theme, 
  onThemeToggle, 
  onMetricClick,
  onEnterChat 
}: DashboardProps) {
  const [selectedApp, setSelectedApp] = useState<MiniApp>(miniApps[0]);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const allMetrics = useMemo(() => getMetricsByMiniApp(selectedApp.id), [selectedApp]);
  const roleMetrics = useMemo(() => 
    getMetricsByRole(allMetrics, currentRole), 
    [allMetrics, currentRole]
  );

  const currentRoleConfig = roleConfigs.find(r => r.id === currentRole) || roleConfigs[0];
  const RoleIcon = roleIcons[currentRole as keyof typeof roleIcons] || Users;

  // Key metrics for top cards - 根据角色动态选择
  const keyMetrics = useMemo(() => {
    const metrics: Record<string, DashboardMetric | undefined> = {};
    
    // 根据角色显示不同的核心指标
    if (currentRole === 'product') {
      metrics.dailyActive = allMetrics.find(m => m.id === 'dailyActive');
      metrics.newUsers = allMetrics.find(m => m.id === 'newUsers');
      metrics.retentionRate = allMetrics.find(m => m.id === 'retentionRate');
      metrics.conversionRate = allMetrics.find(m => m.id === 'conversionRate');
      metrics.fcp = allMetrics.find(m => m.id === 'fcp');
      metrics.jsError = allMetrics.find(m => m.id === 'jsError');
    } else if (currentRole === 'pm') {
      metrics.healthScore = allMetrics.find(m => m.id === 'healthScore');
      metrics.dailyActive = allMetrics.find(m => m.id === 'dailyActive');
      metrics.newUsers = allMetrics.find(m => m.id === 'newUsers');
      metrics.retentionRate = allMetrics.find(m => m.id === 'retentionRate');
      metrics.jsError = allMetrics.find(m => m.id === 'jsError');
      metrics.apiSuccess = allMetrics.find(m => m.id === 'apiSuccess');
    } else if (currentRole === 'operation') {
      metrics.dailyActive = allMetrics.find(m => m.id === 'dailyActive');
      metrics.newUsers = allMetrics.find(m => m.id === 'newUsers');
      metrics.dailyRevenue = allMetrics.find(m => m.id === 'dailyRevenue');
      metrics.conversionRate = allMetrics.find(m => m.id === 'conversionRate');
      metrics.repurchaseRate = allMetrics.find(m => m.id === 'repurchaseRate');
      metrics.retentionRate = allMetrics.find(m => m.id === 'retentionRate');
    } else if (currentRole === 'developer') {
      metrics.fcp = allMetrics.find(m => m.id === 'fcp');
      metrics.lcp = allMetrics.find(m => m.id === 'lcp');
      metrics.apiLatency = allMetrics.find(m => m.id === 'apiLatency');
      metrics.apiSuccess = allMetrics.find(m => m.id === 'apiSuccess');
      metrics.jsError = allMetrics.find(m => m.id === 'jsError');
      metrics.crashRate = allMetrics.find(m => m.id === 'crashRate');
    } else if (currentRole === 'uiux') {
      metrics.fcp = allMetrics.find(m => m.id === 'fcp');
      metrics.lcp = allMetrics.find(m => m.id === 'lcp');
      metrics.fid = allMetrics.find(m => m.id === 'fid');
      metrics.cls = allMetrics.find(m => m.id === 'cls');
      metrics.pageDepth = allMetrics.find(m => m.id === 'pageDepth');
      metrics.bounceRate = allMetrics.find(m => m.id === 'bounceRate');
    } else {
      // admin or default
      metrics.totalUsers = allMetrics.find(m => m.id === 'totalUsers');
      metrics.dailyActive = allMetrics.find(m => m.id === 'dailyActive');
      metrics.dailyRevenue = allMetrics.find(m => m.id === 'dailyRevenue');
      metrics.conversionRate = allMetrics.find(m => m.id === 'conversionRate');
      metrics.healthScore = allMetrics.find(m => m.id === 'healthScore');
      metrics.fcp = allMetrics.find(m => m.id === 'fcp');
    }
    
    return metrics;
  }, [allMetrics, currentRole]);

  const categoryIcons = {
    traffic: Users,
    performance: Zap,
    conversion: ShoppingCart,
    retention: RefreshCw,
    error: AlertCircle,
  };

  const categoryLabels = {
    traffic: '流量指标',
    performance: '性能指标',
    conversion: '转化指标',
    retention: '留存指标',
    error: '错误指标',
  };

  const groupedMetrics = useMemo(() => {
    const groups: Record<string, DashboardMetric[]> = {};
    roleMetrics.forEach(m => {
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    });
    return groups;
  }, [roleMetrics]);

  const handleMetricClick = (metric: DashboardMetric) => {
    setActivePopover(null);
    onMetricClick(metric);
  };

  const toggleMetricSelection = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const trendIcon = (change?: number) => {
    if (change === undefined) return <Minus className="w-4 h-4 text-text-tertiary" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-danger" />;
    return <Minus className="w-4 h-4 text-text-tertiary" />;
  };

  return (
    <div className="h-full flex flex-col bg-canvas">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-border-subtle bg-surface shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo with mascot */}
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="数据洞察中心" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-lg font-semibold text-text-primary">数据洞察中心</span>
          </div>

          <div className="h-6 w-px bg-border-subtle mx-1" />
          
          {/* MiniApp Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-active hover:bg-surface-hover transition-colors">
              <span className="text-sm font-medium text-text-primary">{selectedApp.name}</span>
              <ChevronDown className="w-4 h-4 text-text-tertiary" />
            </button>
            <div className="absolute top-full left-0 mt-1 py-1 w-48 rounded-xl bg-surface border border-border shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {miniApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={clsx(
                    'w-full px-4 py-2.5 text-left text-sm transition-colors',
                    selectedApp.id === app.id 
                      ? 'bg-accent-muted text-accent' 
                      : 'text-text-secondary hover:bg-surface-hover'
                  )}
                >
                  <div className="font-medium">{app.name}</div>
                  <div className="text-xs text-text-tertiary mt-0.5">{app.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Role Switcher - Icon only with hover */}
          <div className="relative">
            <button
              onMouseEnter={() => setRoleMenuOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
            >
              <RoleIcon className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-text-secondary">{currentRoleConfig.name}</span>
            </button>
            {roleMenuOpen && (
              <div 
                className="absolute top-full right-0 mt-1 py-1 w-44 rounded-xl bg-surface border border-border shadow-elevated z-50"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-xs text-text-tertiary border-b border-border-subtle">
                  切换角色视角
                </div>
                {roleConfigs.map(role => (
                  <button
                    key={role.id}
                    onClick={() => {
                      window.location.reload();
                      localStorage.setItem('userRole', role.id);
                    }}
                    className={clsx(
                      'w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2',
                      currentRole === role.id 
                        ? 'bg-accent-muted text-accent' 
                        : 'text-text-secondary hover:bg-surface-hover'
                    )}
                  >
                    {role.id === 'product' && <Briefcase className="w-3.5 h-3.5" />}
                    {role.id === 'pm' && <Target className="w-3.5 h-3.5" />}
                    {role.id === 'operation' && <ShoppingCart className="w-3.5 h-3.5" />}
                    {role.id === 'developer' && <Bug className="w-3.5 h-3.5" />}
                    {role.id === 'uiux' && <Palette className="w-3.5 h-3.5" />}
                    {role.id === 'admin' && <Shield className="w-3.5 h-3.5" />}
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs text-text-tertiary">{role.description.slice(0, 15)}...</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-border-subtle" />

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-text-secondary" />
            ) : (
              <Sun className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>分享</span>
          </button>

          {/* Enter Chat */}
          <button
            onClick={onEnterChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent text-accent text-sm font-medium hover:bg-accent-muted transition-colors"
          >
            <img src="/src/assets/logo.png" alt="AI" className="w-4 h-4 rounded" />
            <span>AI对话</span>
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Welcome Section - Role specific */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
              <RoleIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">
                {currentRoleConfig.name}数据驾驶舱
              </h1>
              <p className="text-xs text-text-secondary">
                {currentRoleConfig.description} · 数据更新于 {new Date().toLocaleString('zh-CN')}
              </p>
            </div>
          </div>
        </div>

        {/* Top Stats Cards - Role Specific Key Metrics with AI Insight */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(keyMetrics).map(([key, metric]) => {
              if (!metric) return null;
              const isActive = activePopover === `top-${metric.id}`;
              return (
                <div 
                  key={key}
                  className={clsx(
                    'relative p-4 rounded-xl border transition-all duration-200 cursor-pointer overflow-visible',
                    'bg-gradient-to-br from-surface to-surface-active',
                    isActive 
                      ? 'border-accent shadow-lg shadow-accent/10' 
                      : 'border-border-subtle hover:border-accent/40 hover:shadow-md'
                  )}
                  onMouseEnter={() => setActivePopover(`top-${metric.id}`)}
                  onMouseLeave={() => setActivePopover(null)}
                  onClick={() => handleMetricClick(metric)}
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={clsx(
                      'text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide',
                      metric.category === 'traffic' && 'bg-blue-500/10 text-blue-600',
                      metric.category === 'conversion' && 'bg-green-500/10 text-green-600',
                      metric.category === 'retention' && 'bg-purple-500/10 text-purple-600',
                      metric.category === 'performance' && 'bg-amber-500/10 text-amber-600',
                      metric.category === 'error' && 'bg-red-500/10 text-red-600'
                    )}>
                      {categoryLabels[metric.category as keyof typeof categoryLabels]?.slice(0, -2) || metric.category}
                    </span>
                    {trendIcon(metric.change)}
                  </div>

                  {/* Metric Value */}
                  <div className="text-2xl font-bold text-text-primary mb-1">{metric.value}</div>
                  
                  {/* Metric Label */}
                  <div className="text-xs text-text-secondary mb-2">{metric.label}</div>
                  
                  {/* Change & Target */}
                  <div className="flex items-center gap-2">
                    {metric.change !== undefined && (
                      <span className={clsx(
                        'text-xs font-medium px-1.5 py-0.5 rounded',
                        metric.change > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      )}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    )}
                    {metric.target && (
                      <span className="text-[10px] text-text-tertiary">
                        目标 {metric.target}
                      </span>
                    )}
                  </div>

                  {/* AI Insight Popover */}
                  {isActive && (
                    <div 
                      className="absolute inset-x-0 -bottom-2 translate-y-full pt-2 z-30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MetricInsightPopover 
                        metric={metric}
                        onViewDetail={() => handleMetricClick(metric)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Geo Distribution - User Geography Portrait */}
        <div className="px-4 pb-4">
          <GeoDistributionChart />
        </div>

        {/* Charts Section - Enhanced with better visual hierarchy */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Traffic Trend - Main Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary block">流量趋势</span>
                    <span className="text-xs text-text-tertiary">过去7天访问数据</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-text-secondary">UV</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-text-secondary">新增</span>
                  </span>
                </div>
              </div>
              <DashboardChart 
                type="area" 
                data={visitTrendData} 
                xKey="date" 
                yKeys={[
                  { key: 'uv', color: 'hsl(147, 100%, 21%)', name: 'UV' },
                  { key: 'newUsers', color: 'hsl(147, 60%, 45%)', name: '新增用户' },
                ]}
                height={200}
              />
            </div>

            {/* Platform Distribution */}
            <div className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-text-primary block">平台分布</span>
                  <span className="text-xs text-text-tertiary">用户设备来源占比</span>
                </div>
              </div>
              <DashboardChart 
                type="pie" 
                data={platformData} 
                xKey="name" 
                yKeys={[{ key: 'value', color: '', name: '占比' }]}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Secondary Charts - Role specific with enhanced styling */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Performance Trend - for dev/uiux/pm */}
            {(currentRole === 'developer' || currentRole === 'uiux' || currentRole === 'pm' || currentRole === 'product') && (
              <div className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary block">核心Web Vitals趋势</span>
                    <span className="text-xs text-text-tertiary">页面加载性能监控</span>
                  </div>
                </div>
                <DashboardChart 
                  type="line" 
                  data={performanceData} 
                  xKey="date" 
                  yKeys={[
                    { key: 'fcp', color: 'hsl(147, 100%, 21%)', name: 'FCP (s)' },
                    { key: 'lcp', color: 'hsl(38, 92%, 50%)', name: 'LCP (s)' },
                  ]}
                  height={180}
                />
              </div>
            )}

            {/* Retention Trend - for product/operation/pm */}
            {(currentRole === 'product' || currentRole === 'operation' || currentRole === 'pm') && (
              <div className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary block">留存率趋势</span>
                    <span className="text-xs text-text-tertiary">用户回访情况分析</span>
                  </div>
                </div>
                <DashboardChart 
                  type="line" 
                  data={retentionData.filter(d => d.day1 > 0)} 
                  xKey="date" 
                  yKeys={[
                    { key: 'day1', color: 'hsl(147, 100%, 21%)', name: '次日留存' },
                    { key: 'day3', color: 'hsl(147, 60%, 45%)', name: '3日留存' },
                  ]}
                  height={180}
                />
              </div>
            )}

            {/* Error Trend - for developer/pm */}
            {(currentRole === 'developer' || currentRole === 'pm') && (
              <div className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary block">错误率趋势</span>
                    <span className="text-xs text-text-tertiary">系统稳定性监控</span>
                  </div>
                </div>
                <div className="h-44 flex flex-col items-center justify-center gap-3">
                  <div className="text-4xl font-bold text-success">0.12%</div>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingDown className="w-4 h-4" />
                    <span>较昨日下降 18.5%</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs text-text-tertiary">
                    <span className="px-2 py-1 rounded-full bg-surface-active">JS错误: 0.08%</span>
                    <span className="px-2 py-1 rounded-full bg-surface-active">API错误: 0.04%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Conversion Funnel - for operation/product */}
            {(currentRole === 'operation' || currentRole === 'product') && (
              <div className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MousePointer2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary block">转化漏斗</span>
                    <span className="text-xs text-text-tertiary">用户转化路径分析</span>
                  </div>
                </div>
                <div className="space-y-3 py-2">
                  {[
                    { step: '访问', value: '100%', count: '18,520', color: 'from-accent to-accent/80' },
                    { step: '授权', value: '58%', count: '10,742', color: 'from-accent/80 to-accent/60' },
                    { step: '注册', value: '12%', count: '2,222', color: 'from-accent/60 to-accent/40' },
                    { step: '下单', value: '4.3%', count: '796', color: 'from-accent/40 to-accent/20' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-12 text-xs font-medium text-text-secondary">{item.step}</span>
                      <div className="flex-1 h-8 bg-surface-active rounded-lg overflow-hidden relative">
                        <div 
                          className={clsx('h-full rounded-lg bg-gradient-to-r', item.color)} 
                          style={{ width: item.value }} 
                        />
                        <span className="absolute inset-0 flex items-center px-2 text-xs font-medium text-white drop-shadow">
                          {item.value}
                        </span>
                      </div>
                      <span className="w-14 text-xs text-text-tertiary text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Status Bar - Enhanced */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-surface to-surface-active border border-border-subtle shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-active">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm text-text-secondary">更新于 {new Date().toLocaleTimeString('zh-CN')}</span>
            </div>
            
            <div className="h-6 w-px bg-border-subtle" />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-success font-medium">ARMS 监控正常</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-success font-medium">We分析 同步正常</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto px-3 py-1.5 rounded-lg bg-accent/10">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">
                {selectedApp.name} · {currentRoleConfig.name}视角
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid by Category - Enhanced with tabs and better layout */}
        <div className="px-4 pb-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary block">详细指标监控</span>
                <span className="text-xs text-text-tertiary">鼠标悬停查看AI洞察，点击查看详细分析</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface-active text-text-secondary">
                共 {roleMetrics.length} 个关注指标
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {Object.entries(groupedMetrics).map(([category, metrics]) => {
              const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
              const isActive = activePopover?.startsWith(`cat-${category}`);
              return (
                <button
                  key={category}
                  onClick={() => setActivePopover(isActive ? null : `cat-${category}`)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                    isActive 
                      ? 'bg-accent text-white shadow-md shadow-accent/20' 
                      : 'bg-surface border border-border-subtle text-text-secondary hover:border-accent/30'
                  )}
                >
                  <CategoryIcon className="w-4 h-4" />
                  <span>{categoryLabels[category as keyof typeof categoryLabels]}</span>
                  <span className={clsx(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-white/20' : 'bg-surface-active'
                  )}>
                    {metrics.length}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Metrics Cards */}
          <div className="space-y-4">
            {Object.entries(groupedMetrics).map(([category, metrics]) => {
              const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <section 
                  key={category} 
                  className="bg-surface rounded-2xl border border-border-subtle p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={clsx(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      category === 'traffic' && 'bg-blue-500/10',
                      category === 'conversion' && 'bg-green-500/10',
                      category === 'retention' && 'bg-purple-500/10',
                      category === 'performance' && 'bg-amber-500/10',
                      category === 'error' && 'bg-red-500/10'
                    )}>
                      <CategoryIcon className={clsx(
                        'w-4 h-4',
                        category === 'traffic' && 'text-blue-500',
                        category === 'conversion' && 'text-green-500',
                        category === 'retention' && 'text-purple-500',
                        category === 'performance' && 'text-amber-500',
                        category === 'error' && 'text-red-500'
                      )} />
                    </div>
                    <h2 className="text-sm font-semibold text-text-primary">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h2>
                    <span className="text-xs text-text-tertiary">({metrics.length})</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {metrics.map(metric => (
                      <div
                        key={metric.id}
                        className={clsx(
                          'relative p-4 rounded-xl border cursor-pointer transition-all duration-200',
                          'bg-gradient-to-br from-canvas to-surface hover:from-surface-hover hover:to-surface',
                          activePopover === metric.id 
                            ? 'border-accent shadow-lg shadow-accent/10 scale-[1.02]' 
                            : 'border-border-subtle hover:border-accent/40 hover:shadow-md',
                          selectedMetrics.includes(metric.id) && 'border-accent bg-accent-muted/20'
                        )}
                        onMouseEnter={() => setActivePopover(metric.id)}
                        onMouseLeave={() => setActivePopover(null)}
                        onClick={() => handleMetricClick(metric)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          toggleMetricSelection(metric.id);
                        }}
                      >
                        {/* Selection Indicator */}
                        {selectedMetrics.includes(metric.id) && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-sm">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}

                        {/* Metric Label */}
                        <p className="text-xs text-text-tertiary mb-2 truncate pr-6">{metric.label}</p>
                        
                        {/* Metric Value */}
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-xl font-bold text-text-primary">{metric.value}</span>
                          {metric.unit && (
                            <span className="text-xs text-text-tertiary">{metric.unit}</span>
                          )}
                        </div>
                        
                        {/* Trend */}
                        <div className="flex items-center gap-1.5">
                          {trendIcon(metric.change)}
                          {metric.change !== undefined && (
                            <span className={clsx(
                              'text-xs font-medium',
                              metric.change > 0 ? 'text-success' : 
                              metric.change < 0 ? 'text-danger' : 'text-text-tertiary'
                            )}>
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          )}
                        </div>

                        {/* AI Insight Preview on hover - positioned above the card */}
                        {activePopover === metric.id && (
                          <div className="absolute inset-x-0 -top-2 -translate-y-full pb-2 z-50">
                            <MetricInsightPopover 
                              metric={metric}
                              onViewDetail={() => handleMetricClick(metric)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Quick Actions - Enhanced floating bar */}
        {selectedMetrics.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-5 py-3 rounded-2xl bg-surface border border-accent/20 shadow-elevated shadow-accent/10 z-40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white text-sm font-bold">{selectedMetrics.length}</span>
              </div>
              <span className="text-sm text-text-secondary">个指标已选择</span>
            </div>
            <div className="h-6 w-px bg-border-subtle" />
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              分享选中
            </button>
            <button
              onClick={() => setSelectedMetrics([])}
              className="p-2 rounded-xl text-text-tertiary hover:text-text-secondary hover:bg-surface-active transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        selectedMetrics={selectedMetrics.length > 0 ? selectedMetrics : undefined}
        allMetrics={allMetrics}
        miniAppName={selectedApp.name}
      />
    </div>
  );
}
