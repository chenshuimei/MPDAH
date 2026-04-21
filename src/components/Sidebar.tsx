import { useState } from 'react';
import {
  MessageSquare, BarChart3, Zap, Clock, Plus,
  ChevronDown, Settings, Database, Activity
} from 'lucide-react';
import { ConversationSession } from '@/types';
import { mockConversations } from '@/data/mockData';
import clsx from 'clsx';

interface SidebarProps {
  activeConversation: string | null;
  onSelectConversation: (id: string | null) => void;
  activeSource: 'all' | 'arms' | 'wedata';
  onSourceChange: (source: 'all' | 'arms' | 'wedata') => void;
}

const sourceConfig = {
  all: { label: '全部数据源', icon: Database, color: 'text-accent' },
  arms: { label: 'ARMS 性能监控', icon: Activity, color: 'text-accent' },
  wedata: { label: 'We分析平台', icon: BarChart3, color: 'text-success' },
};

export default function Sidebar({
  activeConversation,
  onSelectConversation,
  activeSource,
  onSourceChange,
}: SidebarProps) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const currentSource = sourceConfig[activeSource];
  const SourceIcon = currentSource.icon;

  const todayConvos = mockConversations.filter(
    c => c.timestamp.toDateString() === new Date().toDateString()
  );
  const olderConvos = mockConversations.filter(
    c => c.timestamp.toDateString() !== new Date().toDateString()
  );

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

  const getSourceBadge = (s: ConversationSession['dataSource']) => {
    if (s === 'arms') return { text: 'ARMS', cls: 'bg-accent-muted text-accent' };
    if (s === 'wedata') return { text: 'We分析', cls: 'bg-success-muted text-success' };
    return { text: '全部', cls: 'bg-surface-active text-text-secondary' };
  };

  return (
    <aside className="w-[272px] h-full flex flex-col border-r border-border-subtle bg-canvas-deep shrink-0">
      {/* Logo & Brand */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary tracking-tight">
              MiniApp Insight
            </h1>
            <p className="text-xxs text-text-tertiary">智能数据分析助手</p>
          </div>
        </div>
      </div>

      {/* Data Source Selector */}
      <div className="px-3 mb-3">
        <div className="relative">
          <button
            onClick={() => setSourceOpen(!sourceOpen)}
            className={clsx(
              'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl',
              'bg-surface border border-border-subtle',
              'hover:bg-surface-hover transition-all duration-150',
              'text-sm text-text-primary'
            )}
          >
            <SourceIcon className={clsx('w-4 h-4', currentSource.color)} />
            <span className="flex-1 text-left truncate">{currentSource.label}</span>
            <ChevronDown className={clsx(
              'w-4 h-4 text-text-tertiary transition-transform duration-150',
              sourceOpen && 'rotate-180'
            )} />
          </button>

          {sourceOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl bg-surface-raised border border-border shadow-elevated z-50 animate-fade-in">
              {Object.entries(sourceConfig).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    onClick={() => { onSourceChange(key as 'all' | 'arms' | 'wedata'); setSourceOpen(false); }}
                    className={clsx(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm',
                      'hover:bg-surface-hover transition-colors',
                      key === activeSource ? 'text-text-primary' : 'text-text-secondary'
                    )}
                  >
                    <Icon className={clsx('w-4 h-4', cfg.color)} />
                    <span>{cfg.label}</span>
                    {key === activeSource && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* New Conversation */}
      <div className="px-3 mb-4">
        <button
          onClick={() => onSelectConversation(null)}
          className={clsx(
            'w-full flex items-center gap-2 px-3 py-2.5 rounded-xl',
            'bg-accent/10 border border-accent/20',
            'hover:bg-accent/15 transition-all duration-150',
            'text-sm text-accent font-medium'
          )}
        >
          <Plus className="w-4 h-4" />
          <span>新建对话</span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4">
        {todayConvos.length > 0 && (
          <div>
            <p className="px-2 mb-1.5 text-xxs font-medium text-text-tertiary uppercase tracking-wider">
              今天
            </p>
            <div className="space-y-0.5">
              {todayConvos.map(conv => {
                const badge = getSourceBadge(conv.dataSource);
                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={clsx(
                      'w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150',
                      'group',
                      activeConversation === conv.id
                        ? 'bg-surface-active text-text-primary'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="text-sm truncate flex-1">{conv.title}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-6">
                      <span className={clsx('text-xxs px-1.5 py-0.5 rounded-md', badge.cls)}>
                        {badge.text}
                      </span>
                      <span className="text-xxs text-text-tertiary flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(conv.timestamp)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {olderConvos.length > 0 && (
          <div>
            <p className="px-2 mb-1.5 text-xxs font-medium text-text-tertiary uppercase tracking-wider">
              更早
            </p>
            <div className="space-y-0.5">
              {olderConvos.map(conv => {
                const badge = getSourceBadge(conv.dataSource);
                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={clsx(
                      'w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150',
                      'group',
                      activeConversation === conv.id
                        ? 'bg-surface-active text-text-primary'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="text-sm truncate flex-1">{conv.title}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-6">
                      <span className={clsx('text-xxs px-1.5 py-0.5 rounded-md', badge.cls)}>
                        {badge.text}
                      </span>
                      <span className="text-xxs text-text-tertiary">
                        {conv.timestamp.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom - Status & Settings */}
      <div className="p-3 border-t border-border-subtle">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
            <span className="text-xxs text-text-secondary">数据源已连接</span>
          </div>
          <button className="p-1 rounded-lg hover:bg-surface-hover transition-colors">
            <Settings className="w-4 h-4 text-text-tertiary" />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2 px-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xxs text-text-tertiary">ARMS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-xxs text-text-tertiary">We分析</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
