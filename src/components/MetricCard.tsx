import { MetricData } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  metric: MetricData;
  compact?: boolean;
}

export default function MetricCard({ metric, compact }: MetricCardProps) {
  const isPositive = metric.change !== undefined && metric.change > 0;
  const isNegative = metric.change !== undefined && metric.change < 0;

  return (
    <div className={clsx(
      'rounded-xl border border-border-subtle bg-surface',
      'hover:border-border hover:bg-surface-hover',
      'transition-all duration-150',
      compact ? 'px-3 py-2.5' : 'px-4 py-3.5'
    )}>
      <p className={clsx(
        'text-text-tertiary font-medium',
        compact ? 'text-xxs mb-1' : 'text-xs mb-2'
      )}>
        {metric.label}
      </p>
      <div className="flex items-end justify-between gap-2">
        <p className={clsx(
          'font-semibold text-text-primary tracking-tight',
          compact ? 'text-lg' : 'text-2xl'
        )}>
          {metric.value}
          {metric.unit && (
            <span className={clsx(
              'text-text-tertiary font-normal',
              compact ? 'text-xs ml-0.5' : 'text-sm ml-1'
            )}>
              {metric.unit}
            </span>
          )}
        </p>
        {metric.change !== undefined && (
          <div className={clsx(
            'flex items-center gap-0.5 text-xxs font-medium px-1.5 py-0.5 rounded-md',
            isPositive && metric.label.includes('错误') ? 'text-danger bg-danger-muted' :
            isPositive ? 'text-success bg-success-muted' :
            isNegative && metric.label.includes('错误') ? 'text-success bg-success-muted' :
            isNegative ? 'text-danger bg-danger-muted' :
            'text-text-tertiary bg-surface-active'
          )}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : isNegative ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
