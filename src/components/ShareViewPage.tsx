import { useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, Clock, Eye, 
  Share2, ArrowLeft, BarChart3, Users 
} from 'lucide-react';
import { DashboardMetric } from '@/types';
import { jiaxiaobaoMetrics, jiayoushengyiMetrics } from '@/data/miniappData';
import clsx from 'clsx';

interface ShareViewPageProps {
  shareId?: string;
  onBack?: () => void;
}

// Parse share ID to get metrics (mock implementation)
const parseShareParams = (shareId?: string): { metrics: DashboardMetric[]; title: string; appName: string } => {
  // In real implementation, this would fetch from backend
  // For demo, return some metrics
  const allMetrics = [...jiaxiaobaoMetrics, ...jiayoushengyiMetrics];
  return {
    metrics: allMetrics.slice(0, 6),
    title: '嘉销宝 核心指标分享',
    appName: '嘉销宝',
  };
};

export default function ShareViewPage({ shareId, onBack }: ShareViewPageProps) {
  const { metrics, title, appName } = parseShareParams(shareId);

  // Track view (mock)
  useEffect(() => {
    console.log('[Analytics] Share viewed:', {
      shareId,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
    });
  }, [shareId]);

  const trendIcon = (change?: number) => {
    if (change === undefined) return <Minus className="w-4 h-4 text-text-tertiary" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-danger" />;
    return <Minus className="w-4 h-4 text-text-tertiary" />;
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-border-subtle bg-surface sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">返回</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="Logo" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-base font-semibold text-text-primary">数据洞察中心</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            分享于 2026-04-17
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            23 次查看
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">{title}</h1>
          <p className="text-sm text-text-secondary">{appName} · 数据分享</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {metrics.map(metric => (
            <div
              key={metric.id}
              className="p-4 rounded-xl bg-surface border border-border-subtle hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-text-tertiary mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-text-primary mb-2">
                {metric.value}
                {metric.unit && <span className="text-sm font-normal text-text-tertiary ml-1">{metric.unit}</span>}
              </div>
              <div className="flex items-center gap-2">
                {trendIcon(metric.change)}
                {metric.change !== undefined && (
                  <span className={clsx(
                    'text-sm font-medium',
                    metric.change > 0 ? 'text-success' : 
                    metric.change < 0 ? 'text-danger' : 'text-text-tertiary'
                  )}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                )}
                {metric.target && (
                  <span className="text-xs text-text-tertiary ml-auto">
                    目标: {metric.target}
                  </span>
                )}
              </div>
              
              {/* AI Insight */}
              <div className="mt-3 pt-3 border-t border-border-subtle">
                <p className="text-xs text-text-secondary leading-relaxed">
                  {metric.aiInsight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border-subtle">
          <p className="text-sm text-text-tertiary mb-4">
            此分享链接包含实时数据，刷新页面获取最新指标
          </p>
          <button
            onClick={() => {
              // Copy current URL
              navigator.clipboard.writeText(window.location.href);
              alert('链接已复制到剪贴板');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            复制分享链接
          </button>
        </div>
      </main>
    </div>
  );
}
