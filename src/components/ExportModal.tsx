import { useState, useEffect, useRef } from 'react';
import { X, FileText, FileImage, Code, File } from 'lucide-react';
import { ExportFormat } from '@/types';
import clsx from 'clsx';

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

const formats: { id: ExportFormat; label: string; desc: string; icon: React.ElementType }[] = [
  { id: 'pdf', label: 'PDF 文档', desc: '适合打印和正式分享', icon: File },
  { id: 'docx', label: 'Word 文档', desc: '可编辑的报告格式', icon: FileText },
  { id: 'png', label: '图片 (PNG)', desc: '适合社交分享和演示', icon: FileImage },
  { id: 'html', label: 'HTML 页面', desc: '可交互的网页报告', icon: Code },
];

export default function ExportModal({ open, onClose }: ExportModalProps) {
  const [selected, setSelected] = useState<ExportFormat>('pdf');
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const timerRefs = useRef<number[]>([]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setSelected('pdf');
      setExporting(false);
      setDone(false);
    } else {
      // Clear all pending timers on close
      timerRefs.current.forEach(id => clearTimeout(id));
      timerRefs.current = [];
    }
  }, [open]);

  if (!open) return null;

  const handleExport = () => {
    setExporting(true);
    const t1 = window.setTimeout(() => {
      setExporting(false);
      setDone(true);
      const t2 = window.setTimeout(() => {
        setDone(false);
        onClose();
      }, 1500);
      timerRefs.current.push(t2);
    }, 2000);
    timerRefs.current.push(t1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-canvas-deep/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[420px] bg-surface-raised border border-border rounded-2xl shadow-elevated animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h3 className="text-sm font-semibold text-text-primary">导出数据报告</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4 text-text-tertiary" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="p-6 space-y-2">
          {formats.map(f => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => setSelected(f.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150',
                  selected === f.id
                    ? 'border-accent/40 bg-accent/5'
                    : 'border-border-subtle bg-surface hover:bg-surface-hover'
                )}
              >
                <div className={clsx(
                  'w-9 h-9 rounded-lg flex items-center justify-center',
                  selected === f.id ? 'bg-accent/15 text-accent' : 'bg-surface-active text-text-tertiary'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className={clsx(
                    'text-sm font-medium',
                    selected === f.id ? 'text-text-primary' : 'text-text-secondary'
                  )}>
                    {f.label}
                  </p>
                  <p className="text-xxs text-text-tertiary">{f.desc}</p>
                </div>
                {selected === f.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border-subtle">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-text-secondary hover:bg-surface-hover transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={clsx(
              'px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150',
              done
                ? 'bg-success text-white'
                : 'gradient-accent text-white hover:shadow-glow'
            )}
          >
            {exporting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
                </svg>
                导出中...
              </span>
            ) : done ? (
              '导出成功!'
            ) : (
              '开始导出'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
