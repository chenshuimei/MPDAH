import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { DashboardMetric } from '@/types';
import clsx from 'clsx';

interface MetricInsightTooltipProps {
  metric: DashboardMetric;
  position: { x: number; y: number };
  onClick: () => void;
}

export default function MetricInsightTooltip({ metric, position, onClick }: MetricInsightTooltipProps) {
  // Calculate position to keep tooltip on screen
  const tooltipWidth = 360;
  const tooltipHeight = 200;
  
  let left = position.x + 16;
  let top = position.y + 16;
  
  // Adjust if too close to right edge
  if (left + tooltipWidth > window.innerWidth) {
    left = position.x - tooltipWidth - 16;
  }
  
  // Adjust if too close to bottom
  if (top + tooltipHeight > window.innerHeight) {
    top = position.y - tooltipHeight - 16;
  }

  return (
    <div
      className="fixed z-50 w-[360px] insight-tooltip"
      style={{ left, top }}
    >
      <div className="rounded-xl bg-surface border border-border shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border-subtle bg-gradient-to-r from-accent-muted to-transparent">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-text-primary">AI 智能洞察</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-text-primary">{metric.value}</span>
            <span className="text-sm text-text-secondary">{metric.label}</span>
          </div>
          
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {metric.aiInsight}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary mb-3">
            {metric.target && (
              <span>目标: <span className="text-text-secondary">{metric.target}</span></span>
            )}
            {metric.change !== undefined && (
              <span className={clsx(
                metric.change > 0 ? 'text-success' : 
                metric.change < 0 ? 'text-danger' : 'text-text-tertiary'
              )}>
                环比 {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <span>查看详细分析</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tip */}
        <div className="px-4 py-2 bg-surface-active border-t border-border-subtle">
          <p className="text-xxs text-text-tertiary flex items-center gap-1">
            <Lightbulb className="w-3 h-3" />
            点击卡片或此按钮进入 AI 对话，获取深度分析和解决方案
          </p>
        </div>
      </div>
    </div>
  );
}
