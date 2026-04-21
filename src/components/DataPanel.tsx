import { Activity, BarChart3, TrendingUp, AlertTriangle, Globe, Smartphone } from 'lucide-react';
import { overviewMetrics } from '@/data/mockData';
import MetricCard from './MetricCard';
import clsx from 'clsx';

const statusItems = [
  { label: 'ARMS 监控', status: 'healthy' as const, latency: '12ms' },
  { label: 'We分析 API', status: 'healthy' as const, latency: '45ms' },
  { label: 'CDN 节点', status: 'healthy' as const, latency: '8ms' },
  { label: '数据同步', status: 'warning' as const, latency: '3min前' },
];

const topPages = [
  { path: '/pages/index/index', pv: '45,231', time: '3:12' },
  { path: '/pages/product/list', pv: '32,109', time: '4:45' },
  { path: '/pages/user/center', pv: '28,456', time: '2:08' },
  { path: '/pages/order/list', pv: '18,234', time: '3:56' },
  { path: '/pages/cart/index', pv: '15,890', time: '5:21' },
];

export default function DataPanel() {
  return (
    <aside className="w-[300px] h-full flex flex-col border-l border-border-subtle bg-canvas-deep shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">实时数据概览</h2>
        </div>
        <p className="text-xxs text-text-tertiary mt-1">更新于 {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      {/* Core Metrics */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {overviewMetrics.map((m, i) => (
            <MetricCard key={i} metric={m} compact />
          ))}
        </div>
      </div>

      {/* Service Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <Globe className="w-3.5 h-3.5 text-text-tertiary" />
          <p className="text-xs font-medium text-text-secondary">服务状态</p>
        </div>
        <div className="space-y-1.5">
          {statusItems.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface border border-border-subtle"
            >
              <div className={clsx(
                'w-1.5 h-1.5 rounded-full',
                s.status === 'healthy' ? 'bg-success' : 'bg-warning animate-pulse-soft'
              )} />
              <span className="text-xs text-text-secondary flex-1">{s.label}</span>
              <span className={clsx(
                'text-xxs',
                s.status === 'healthy' ? 'text-text-tertiary' : 'text-warning'
              )}>
                {s.latency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <Smartphone className="w-3.5 h-3.5 text-text-tertiary" />
          <p className="text-xs font-medium text-text-secondary">热门页面 Top 5</p>
        </div>
        <div className="space-y-1">
          {topPages.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border-subtle group hover:bg-surface-hover transition-colors"
            >
              <span className={clsx(
                'w-5 h-5 rounded-md flex items-center justify-center text-xxs font-semibold shrink-0',
                i === 0 ? 'bg-accent/15 text-accent' :
                i === 1 ? 'bg-success/15 text-success' :
                i === 2 ? 'bg-warning/15 text-warning' :
                'bg-surface-active text-text-tertiary'
              )}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary truncate group-hover:text-text-primary transition-colors">
                  {p.path}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xxs text-text-tertiary">{p.pv}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="px-4 pb-5">
        <div className="flex items-center gap-2 mb-2.5">
          <TrendingUp className="w-3.5 h-3.5 text-text-tertiary" />
          <p className="text-xs font-medium text-text-secondary">智能洞察</p>
        </div>
        <div className="space-y-2">
          <div className="px-3 py-2.5 rounded-xl bg-success-muted border border-success/20">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-xxs font-medium text-success">正向趋势</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              页面加载速度连续3天优化，FCP降至1.2s
            </p>
          </div>
          <div className="px-3 py-2.5 rounded-xl bg-warning-muted border border-warning/20">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3 h-3 text-warning" />
              <span className="text-xxs font-medium text-warning">需要关注</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              /api/search 接口成功率降至99.2%，建议排查
            </p>
          </div>
          <div className="px-3 py-2.5 rounded-xl bg-accent-muted border border-accent/20">
            <div className="flex items-center gap-1.5 mb-1">
              <BarChart3 className="w-3 h-3 text-accent" />
              <span className="text-xxs font-medium text-accent">数据亮点</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              今日UV突破28K，较上周同期增长15.7%
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
