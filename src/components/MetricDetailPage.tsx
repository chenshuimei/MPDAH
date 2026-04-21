import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, MessageSquare, Lightbulb, TrendingUp, TrendingDown, 
  Target, Clock, Share2, Plus, Sparkles, BarChart3
} from 'lucide-react';
import { DashboardMetric, ChatMessage, UserRole } from '@/types';
import { generateMockResponse, quickPrompts } from '@/data/mockData';
import { roleConfigs } from '@/data/miniappData';
import ChatMessageComponent from './ChatMessage';
import ShareModal from './ShareModal';
import clsx from 'clsx';

interface MetricDetailPageProps {
  metric: DashboardMetric;
  currentRole: UserRole;
  onBack: () => void;
}

// Mock conversation history
const mockHistory = [
  { id: '1', title: '为什么转化率下降了？', time: '2小时前' },
  { id: '2', title: '优化建议分析', time: '昨天' },
  { id: '3', title: '与上周数据对比', time: '3天前' },
];

export default function MetricDetailPage({ metric, currentRole, onBack }: MetricDetailPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const currentRoleConfig = roleConfigs.find(r => r.id === currentRole) || roleConfigs[0];

  // Auto-scroll to bottom when messages change or typing starts/stops
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `您好！我是您的数据分析师啤啤。您正在查看 **${metric.label}** 的详细分析。\n\n当前数值：**${metric.value}${metric.unit}**，${metric.change && metric.change > 0 ? '较上期增长' : '较上期下降'} ${Math.abs(metric.change || 0)}%。\n\n您可以问我：\n• 这个指标为什么变化？\n• 如何优化这个指标？\n• 与历史数据对比情况\n• 同行业benchmark对比`,
      timestamp: new Date(),
      insights: [
        { type: 'neutral', title: '指标概览', detail: metric.description },
        { type: metric.change && metric.change > 0 ? 'positive' : 'warning', 
          title: '变化趋势', 
          detail: `该指标${metric.change && metric.change > 0 ? '呈上升趋势' : '需要关注'}，环比${metric.change && metric.change > 0 ? '增长' : '下降'} ${Math.abs(metric.change || 0)}%` 
        },
      ],
    };
    setMessages([welcomeMsg]);
  }, [metric]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowQuickPrompts(false);

    setTimeout(() => {
      const response = generateMockResponse(msg);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setTimeout(() => {
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `您好！我是您的数据分析师啤啤。\n\n**数据洞察分析**\n\n当前查看指标：**${metric.label}** (${metric.value}${metric.unit})\n\n有什么可以帮助您的？`,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }, 100);
  };

  const trendIcon = (change?: number) => {
    if (!change) return null;
    return change > 0 ? 
      <TrendingUp className="w-4 h-4 text-success" /> : 
      <TrendingDown className="w-4 h-4 text-danger" />;
  };

  // Filter quick prompts related to current metric category
  const relatedPrompts = quickPrompts.slice(0, 6);

  return (
    <div className="h-full flex flex-col bg-canvas">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-border-subtle bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回大屏</span>
          </button>
          <div className="h-6 w-px bg-border-subtle" />
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-text-primary">{metric.label}</span>
            <span className={clsx(
              'text-xs px-2 py-0.5 rounded-full',
              metric.change && metric.change > 0 ? 'bg-success-muted text-success' : 'bg-danger-muted text-danger'
            )}>
              {metric.change && metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </div>
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-sm hover:bg-accent/90 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>分享此分析</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-60 border-r border-border-subtle bg-surface flex flex-col shrink-0">
          {/* New Conversation */}
          <div className="p-3 border-b border-border-subtle">
            <button
              onClick={handleNewConversation}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>新建对话</span>
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-b border-border-subtle">
            <button
              onClick={() => setShowQuickPrompts(!showQuickPrompts)}
              className="flex items-center gap-2 text-text-secondary mb-2 w-full"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">快捷提问</span>
            </button>
            {showQuickPrompts && (
              <div className="space-y-1 animate-fade-in">
                {relatedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.prompt)}
                    className="w-full text-left px-2 py-1.5 rounded-md text-xs text-text-secondary hover:bg-surface-hover hover:text-accent transition-colors"
                  >
                    <span className="mr-1">{prompt.icon}</span>
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* History */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="flex items-center gap-2 text-text-secondary mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">历史对话</span>
              </div>
              <div className="space-y-1">
                {mockHistory.map(item => (
                  <button
                    key={item.id}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    <p className="text-sm text-text-primary truncate">{item.title}</p>
                    <p className="text-xs text-text-tertiary">{item.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Center - AI Chat */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <ChatMessageComponent
                key={msg.id}
                message={msg}
                onShare={() => setShareOpen(true)}
              />
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
                  <img src="/src/assets/logo.png" alt="AI" className="w-5 h-5 rounded object-cover" />
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-100" />
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-subtle">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`询问关于 ${metric.label} 的问题...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border-subtle bg-surface text-sm text-text-primary focus:border-accent focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
              >
                发送
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Metric Details */}
        <aside className="w-64 border-l border-border-subtle bg-surface flex flex-col shrink-0">
          <div className="p-4 border-b border-border-subtle">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-text-primary">指标详情</span>
            </div>

            {/* Big Number */}
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-text-primary">{metric.value}</div>
              <div className="text-sm text-text-secondary mt-1">{metric.label}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {trendIcon(metric.change)}
                <span className={clsx(
                  'text-sm font-medium',
                  metric.change && metric.change > 0 ? 'text-success' : 'text-danger'
                )}>
                  {metric.change && metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>

            {/* Target */}
            {metric.target && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-active mt-4">
                <Target className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-text-tertiary">目标值</p>
                  <p className="text-sm font-medium text-text-primary">{metric.target}</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Insight */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-text-secondary">AI 洞察</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {metric.aiInsight}
            </p>

            {/* Related Metrics */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-text-secondary mb-2">关联指标</p>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-surface-active text-sm">
                  <span className="text-text-tertiary">同比:</span>
                  <span className="text-text-primary ml-2">+12.5%</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-active text-sm">
                  <span className="text-text-tertiary">行业平均:</span>
                  <span className="text-text-primary ml-2">{metric.value}</span>
                </div>
              </div>
            </div>

            {/* Role Info */}
            <div className="mt-6 p-3 rounded-lg bg-accent-muted">
              <p className="text-xs text-accent font-medium mb-1">{currentRoleConfig.name}视角</p>
              <p className="text-xs text-text-secondary">{currentRoleConfig.description}</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        selectedMetrics={[metric.id]}
        allMetrics={[metric]}
        miniAppName="当前分析"
      />
    </div>
  );
}
