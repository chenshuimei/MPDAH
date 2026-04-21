import { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User, Copy, Share2, Lightbulb, Wrench, TrendingUp, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import InlineChart from './InlineChart';
import MetricCard from './MetricCard';
import DataTable from './DataTable';
import clsx from 'clsx';

interface ChatMessageProps {
  message: ChatMessageType;
  onShare?: () => void;
}

export default function ChatMessage({ message, onShare }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (message.isTyping) {
    return (
      <div className="flex gap-3 px-6 py-4 animate-fade-in">
        <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center shrink-0 shadow-glow">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-1.5 pt-2">
          <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
          <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
          <div className="w-2 h-2 rounded-full bg-accent typing-dot" />
        </div>
      </div>
    );
  }

  const insightIcon = (type: string) => {
    if (type === 'positive') return <TrendingUp className="w-3.5 h-3.5 text-success" />;
    if (type === 'warning') return <AlertTriangle className="w-3.5 h-3.5 text-warning" />;
    return <Info className="w-3.5 h-3.5 text-accent" />;
  };

  const insightStyle = (type: string) => {
    if (type === 'positive') return 'border-success/20 bg-success-muted/50';
    if (type === 'warning') return 'border-warning/20 bg-warning-muted/50';
    return 'border-accent/20 bg-accent-muted/50';
  };

  const priorityBadge = (p: string) => {
    if (p === 'high') return { text: '高', cls: 'bg-danger-muted text-danger' };
    if (p === 'medium') return { text: '中', cls: 'bg-warning-muted text-warning' };
    return { text: '低', cls: 'bg-surface-active text-text-tertiary' };
  };

  return (
    <div className={clsx(
      'flex gap-3 px-6 py-4 animate-slide-up',
      'group',
      isUser && 'flex-row-reverse'
    )}>
      {/* Avatar */}
      <div className={clsx(
        'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 overflow-hidden',
        isUser
          ? 'bg-surface-active border border-border-subtle'
          : 'shadow-glow'
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-text-secondary" />
        ) : (
          <img src="/src/assets/logo.png" alt="AI" className="w-6 h-6 object-cover" />
        )}
      </div>

      {/* Content */}
      <div className={clsx(
        'flex-1 min-w-0',
        isUser ? 'max-w-[70%] ml-auto' : 'max-w-[85%]'
      )}>
        {/* Text bubble */}
        <div className={clsx(
          'rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-accent/15 text-text-primary border border-accent/20 ml-auto w-fit'
            : 'bg-surface border border-border-subtle text-text-primary'
        )}>
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={clsx(i > 0 && 'mt-2', !line && 'h-2')}>
              {line}
            </p>
          ))}
        </div>

        {/* Metrics row */}
        {message.metrics && message.metrics.length > 0 && (
          <div className={clsx(
            'grid gap-2 mt-3',
            message.metrics.length <= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'
          )}>
            {message.metrics.map((m, i) => (
              <MetricCard key={i} metric={m} compact />
            ))}
          </div>
        )}

        {/* Single Chart */}
        {message.chart && <InlineChart chart={message.chart} />}

        {/* Multiple Charts */}
        {message.charts && message.charts.map((c, i) => (
          <InlineChart key={i} chart={c} />
        ))}

        {/* Table */}
        {message.table && <DataTable table={message.table} />}

        {/* Smart Insights */}
        {message.insights && message.insights.length > 0 && (
          <div className="mt-3 rounded-xl border border-border-subtle bg-surface/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-surface">
              <Lightbulb className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-text-primary">智能洞察</span>
            </div>
            <div className="p-3 space-y-2">
              {message.insights.map((ins, i) => (
                <div key={i} className={clsx('flex gap-2.5 px-3 py-2.5 rounded-lg border', insightStyle(ins.type))}>
                  <div className="mt-0.5 shrink-0">{insightIcon(ins.type)}</div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">{ins.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{ins.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solutions */}
        {message.solutions && message.solutions.length > 0 && (
          <div className="mt-3 rounded-xl border border-border-subtle bg-surface/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-surface">
              <Wrench className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-text-primary">建议方案</span>
            </div>
            <div className="p-3 space-y-2">
              {message.solutions.map((sol, i) => {
                const badge = priorityBadge(sol.priority);
                return (
                  <div key={i} className="flex gap-2.5 px-3 py-2.5 rounded-lg border border-border-subtle bg-canvas/50 hover:bg-surface-hover transition-colors">
                    <div className="mt-0.5 shrink-0">
                      <span className={clsx('inline-flex items-center justify-center w-5 h-5 rounded text-xxs font-bold', badge.cls)}>
                        {badge.text}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-text-primary">{sol.action}</p>
                        {sol.owner && (
                          <span className="flex items-center gap-0.5 text-xxs text-text-tertiary bg-surface-active px-1.5 py-0.5 rounded-md">
                            <ArrowRight className="w-2.5 h-2.5" />
                            {sol.owner}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{sol.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xxs text-text-tertiary hover:text-text-secondary hover:bg-surface transition-colors"
              onClick={() => navigator.clipboard.writeText(message.content)}
            >
              <Copy className="w-3 h-3" />
              <span>复制</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xxs text-accent hover:bg-accent-muted transition-colors"
              onClick={onShare}
            >
              <Share2 className="w-3 h-3" />
              <span>分享</span>
            </button>
            <span className="text-xxs text-text-tertiary ml-2">
              {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
