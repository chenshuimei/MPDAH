import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ArrowDown, Layers, BarChart3, Activity } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';
import { quickPrompts, generateMockResponse } from '@/data/mockData';
import ChatMessage from './ChatMessage';
import clsx from 'clsx';

interface ChatAreaProps {
  onExport: () => void;
}

const promptCategories = [
  { id: 'all', label: '全部', icon: Layers },
  { id: 'cross', label: '综合分析', icon: Sparkles },
  { id: 'wedata', label: 'We分析', icon: BarChart3 },
  { id: 'arms', label: 'ARMS', icon: Activity },
];

const categoryMap: Record<string, number[]> = {
  all: [0,1,2,3,4,5,6,7,8,9,10,11],
  cross: [0,9,10,11],
  wedata: [1,2,3,4,5],
  arms: [6,7,8],
};

export default function ChatArea({ onExport }: ChatAreaProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [promptCat, setPromptCat] = useState('all');

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isProcessing) return;

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    // Typing indicator
    const typingMsg: ChatMessageType = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    setTimeout(() => setMessages(prev => [...prev, typingMsg]), 300);

    // Simulate AI response
    setTimeout(() => {
      const response = generateMockResponse(msg);
      setMessages(prev => prev.filter(m => m.id !== 'typing').concat(response));
      setIsProcessing(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      {/* Glow effect top */}
      <div className="absolute top-0 left-0 right-0 h-40 glow-top pointer-events-none z-0" />

      {isEmpty ? (
        /* Welcome Screen */
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
          {/* Background hero image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
            <img src="/hero-bg.png" alt="" className="w-[600px] h-[600px] object-cover" />
          </div>

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-lg mb-6 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2 tracking-tight text-center">
              小程序数据，开口即达
            </h2>
            <p className="text-sm text-text-secondary mb-10 max-w-md text-center leading-relaxed mx-auto">
              连接 ARMS 性能监控与 We分析平台，用自然语言实时查询和分析小程序数据
            </p>
          </div>

          {/* Category Tabs + Quick Prompts Grid */}
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-1.5 mb-3">
              {promptCategories.map(cat => {
                const CIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setPromptCat(cat.id)}
                    className={clsx(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                      promptCat === cat.id
                        ? 'bg-accent/15 text-accent border border-accent/25'
                        : 'text-text-tertiary hover:text-text-secondary hover:bg-surface'
                    )}
                  >
                    <CIcon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
              {(categoryMap[promptCat] || categoryMap.all).map(idx => {
                const p = quickPrompts[idx];
                if (!p) return null;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.prompt)}
                    className={clsx(
                      'flex items-start gap-2.5 px-4 py-3.5 rounded-xl',
                      'bg-surface border border-border-subtle',
                      'hover:border-border hover:bg-surface-hover',
                      'transition-all duration-150 text-left group'
                    )}
                  >
                    <span className="text-base mt-0.5">{p.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                        {p.label}
                      </p>
                      <p className="text-xxs text-text-tertiary mt-0.5 line-clamp-2">
                        {p.prompt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Messages Area */
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto relative z-10 pt-4 pb-2"
        >
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} onShare={onExport} />
          ))}
        </div>
      )}

      {/* Scroll to bottom */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-surface border border-border shadow-elevated hover:bg-surface-hover transition-all"
        >
          <ArrowDown className="w-4 h-4 text-text-secondary" />
        </button>
      )}

      {/* Input Area */}
      <div className="relative z-10 px-6 pb-5 pt-2">
        <div className={clsx(
          'flex items-end gap-3 px-4 py-3 rounded-2xl',
          'bg-surface border border-border-subtle',
          'focus-within:border-accent/40 focus-within:shadow-glow',
          'transition-all duration-200'
        )}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入数据查询指令，例如：查看今天的用户留存率..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary resize-none outline-none min-h-[24px] max-h-[120px] leading-relaxed"
            rows={1}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = 'auto';
              t.style.height = Math.min(t.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isProcessing}
            className={clsx(
              'p-2 rounded-xl transition-all duration-150 shrink-0',
              input.trim() && !isProcessing
                ? 'gradient-accent text-white shadow-glow hover:shadow-glow-lg'
                : 'bg-surface-active text-text-tertiary cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xxs text-text-tertiary mt-2">
          数据来源：ARMS 实时性能监控 · We分析平台 · 数据每5分钟刷新
        </p>
      </div>
    </div>
  );
}
