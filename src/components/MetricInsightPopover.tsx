import { Lightbulb, ArrowRight, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { DashboardMetric } from '@/types';
import clsx from 'clsx';

interface MetricInsightPopoverProps {
  metric: DashboardMetric;
  onViewDetail: () => void;
}

export default function MetricInsightPopover({ metric, onViewDetail }: MetricInsightPopoverProps) {
  return (
    <div 
      className="w-full p-3 rounded-lg bg-surface border border-accent/20 shadow-elevated animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-semibold text-accent">AI 洞察</span>
      </div>

      {/* Insight Text */}
      <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-3">
        {metric.aiInsight}
      </p>

      {/* Quick Stats */}
      <div className="flex items-center gap-3 mb-3">
        {metric.target && (
          <div className="flex items-center gap-1 text-xs">
            <Target className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-tertiary">目标:</span>
            <span className="text-text-primary font-medium">{metric.target}</span>
          </div>
        )}
        {metric.change !== undefined && (
          <div className={clsx(
            'flex items-center gap-1 text-xs',
            metric.change > 0 ? 'text-success' : 'text-danger'
          )}>
            {metric.change > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>环比 {metric.change > 0 ? '+' : ''}{metric.change}%</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetail();
        }}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-xs font-medium hover:bg-accent/90 transition-colors"
      >
        <span>查看详细分析</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
