import { useState, useRef, useEffect } from 'react';
import { X, Link2, Copy, Check, Share2, Clock, Eye } from 'lucide-react';
import { DashboardMetric } from '@/types';
import { mockShares } from '@/data/miniappData';
import clsx from 'clsx';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetrics?: string[];
  allMetrics: DashboardMetric[];
  miniAppName: string;
}

export default function ShareModal({ open, onClose, selectedMetrics, allMetrics, miniAppName }: ShareModalProps) {
  const [step, setStep] = useState<'select' | 'configure' | 'success'>('select');
  const [title, setTitle] = useState(`${miniAppName} 数据分享`);
  const [description, setDescription] = useState('');
  const [expiry, setExpiry] = useState('7');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedMetrics || []);

  useEffect(() => {
    if (open) {
      setStep(selectedMetrics && selectedMetrics.length > 0 ? 'configure' : 'select');
      setSelected(selectedMetrics || []);
      setTitle(`${miniAppName} 数据分享`);
    }
  }, [open, selectedMetrics]);

  useEffect(() => {
    if (!open) {
      setStep('select');
      setShareLink('');
      setCopied(false);
    }
  }, [open]);

  const toggleMetric = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const generateShareLink = () => {
    // Simulate generating a share link
    const shareId = `share-${Date.now().toString(36)}`;
    const link = `${window.location.origin}/share/${shareId}?metrics=${selected.join(',')}&app=${miniAppName}`;
    setShareLink(link);
    setStep('success');
    
    // Track share event (simulated)
    console.log('[Analytics] Share created:', {
      shareId,
      metrics: selected,
      app: miniAppName,
      timestamp: new Date().toISOString(),
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-canvas-deep/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-[560px] max-h-[80vh] bg-surface rounded-2xl border border-border shadow-elevated overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-text-primary">分享数据</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors">
            <X className="w-5 h-5 text-text-tertiary" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {step === 'select' && (
            <div className="p-6">
              <p className="text-sm text-text-secondary mb-4">
                选择要分享的指标（可多选），接收者可通过链接查看这些指标的实时数据
              </p>
              
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                {allMetrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={clsx(
                      'flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                      selected.includes(metric.id)
                        ? 'border-accent bg-accent-muted'
                        : 'border-border-subtle bg-surface hover:border-accent/30'
                    )}
                  >
                    <div className={clsx(
                      'w-5 h-5 rounded border flex items-center justify-center transition-colors',
                      selected.includes(metric.id)
                        ? 'bg-accent border-accent'
                        : 'border-border-subtle'
                    )}>
                      {selected.includes(metric.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{metric.label}</p>
                      <p className="text-xs text-text-tertiary">{metric.value}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-hover transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setStep('configure')}
                  disabled={selected.length === 0}
                  className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  下一步 ({selected.length})
                </button>
              </div>
            </div>
          )}

          {step === 'configure' && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">分享标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-sm text-text-primary focus:border-accent focus:outline-none"
                  placeholder="输入分享标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">描述（可选）</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-sm text-text-primary focus:border-accent focus:outline-none resize-none"
                  placeholder="添加描述帮助接收者理解数据"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">有效期</label>
                <div className="flex gap-2">
                  {['1', '7', '30', 'never'].map((days) => (
                    <button
                      key={days}
                      onClick={() => setExpiry(days)}
                      className={clsx(
                        'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                        expiry === days
                          ? 'border-accent bg-accent-muted text-accent'
                          : 'border-border-subtle text-text-secondary hover:border-accent/30'
                      )}
                    >
                      {days === 'never' ? '永久' : `${days}天`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-active rounded-lg p-3">
                <p className="text-xs text-text-secondary mb-2">已选择 {selected.length} 个指标：</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.map(id => {
                    const metric = allMetrics.find(m => m.id === id);
                    return metric ? (
                      <span key={id} className="px-2 py-0.5 rounded-md bg-accent-muted text-accent text-xs">
                        {metric.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setStep('select')}
                  className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-hover transition-colors"
                >
                  返回
                </button>
                <button
                  onClick={generateShareLink}
                  className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  生成分享链接
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-success-muted flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              
              <h4 className="text-lg font-semibold text-text-primary mb-2">分享链接已生成</h4>
              <p className="text-sm text-text-secondary mb-6">
                任何人通过此链接可查看您分享的指标数据
              </p>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-active border border-border-subtle mb-4">
                <Link2 className="w-4 h-4 text-text-tertiary shrink-0" />
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none"
                />
                <button
                  onClick={copyLink}
                  className={clsx(
                    'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    copied
                      ? 'bg-success text-white'
                      : 'bg-accent text-white hover:bg-accent/90'
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>

              {/* Share History */}
              <div className="text-left">
                <p className="text-xs font-medium text-text-secondary mb-2">最近分享</p>
                <div className="space-y-2">
                  {mockShares.slice(0, 2).map(share => (
                    <div key={share.id} className="flex items-center justify-between p-2 rounded-lg bg-surface-active">
                      <div>
                        <p className="text-sm text-text-primary">{share.title}</p>
                        <p className="text-xs text-text-tertiary flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {share.createdAt.toLocaleDateString('zh-CN')}
                          <Eye className="w-3 h-3 ml-1" />
                          {share.viewCount} 次查看
                        </p>
                      </div>
                      <button className="p-1.5 rounded hover:bg-surface-hover">
                        <Copy className="w-3.5 h-3.5 text-text-tertiary" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                完成
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
