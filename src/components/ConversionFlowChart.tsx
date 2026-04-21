import { useState, useEffect } from 'react';
import { MousePointer2, Users, ShoppingCart, CreditCard, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface FlowNode {
  id: string;
  label: string;
  value: string;
  count: number;
  change?: number;
  icon: React.ReactNode;
  level: number;
  position: 'left' | 'center' | 'right';
}

interface FlowEdge {
  from: string;
  to: string;
  rate: string;
  percent: number;
}

interface ConversionFlowChartProps {
  miniAppId?: string;
}

// 嘉销宝转化流程数据 - 分层布局
const jiaxiaobaoNodes: FlowNode[] = [
  { id: 'auth', label: '小程序授权页', value: '12.6万', count: 126000, change: 5.2, icon: <Users className="w-4 h-4" />, level: 0, position: 'center' },
  { id: 'register', label: '注册页', value: '1.7万', count: 17000, change: -2.1, icon: <MousePointer2 className="w-4 h-4" />, level: 1, position: 'left' },
  { id: 'home', label: '主页', value: '20.5万', count: 205000, change: 8.3, icon: <MousePointer2 className="w-4 h-4" />, level: 1, position: 'right' },
  { id: 'scan', label: '扫码结果页', value: '11.9万', count: 119000, change: 12.5, icon: <MousePointer2 className="w-4 h-4" />, level: 2, position: 'left' },
  { id: 'activity', label: '陈列活动详情页', value: '1.8万', count: 18000, change: -5.2, icon: <ShoppingCart className="w-4 h-4" />, level: 2, position: 'center' },
  { id: 'profile', label: '个人中心页', value: '3.8万', count: 38000, change: 3.1, icon: <Users className="w-4 h-4" />, level: 2, position: 'right' },
  { id: 'exchange', label: '兑付记录页', value: '3.2万', count: 32000, change: 7.8, icon: <CreditCard className="w-4 h-4" />, level: 3, position: 'right' },
];

const jiaxiaobaoEdges: FlowEdge[] = [
  { from: 'auth', to: 'register', rate: '12.7%', percent: 12.7 },
  { from: 'auth', to: 'home', rate: '60.9%', percent: 60.9 },
  { from: 'register', to: 'home', rate: '87.3%', percent: 87.3 },
  { from: 'home', to: 'scan', rate: '31.5%', percent: 31.5 },
  { from: 'home', to: 'activity', rate: '5.8%', percent: 5.8 },
  { from: 'home', to: 'profile', rate: '8.0%', percent: 8.0 },
  { from: 'scan', to: 'profile', rate: '6.1%', percent: 6.1 },
  { from: 'profile', to: 'exchange', rate: '25.8%', percent: 25.8 },
];

// 嘉有生意转化流程数据 - 垂直漏斗布局
const jiayoushengyiNodes: FlowNode[] = [
  { id: 'auth', label: '小程序授权页', value: '8.9万', count: 89000, change: 3.2, icon: <Users className="w-4 h-4" />, level: 0, position: 'center' },
  { id: 'register', label: '注册页', value: '1.2万', count: 12000, change: -1.5, icon: <MousePointer2 className="w-4 h-4" />, level: 1, position: 'center' },
  { id: 'home', label: '主页', value: '15.2万', count: 152000, change: 6.8, icon: <MousePointer2 className="w-4 h-4" />, level: 2, position: 'center' },
  { id: 'store', label: '门店列表页', value: '6.8万', count: 68000, change: 9.2, icon: <MousePointer2 className="w-4 h-4" />, level: 3, position: 'center' },
  { id: 'detail', label: '商品详情页', value: '3.5万', count: 35000, change: -3.2, icon: <ShoppingCart className="w-4 h-4" />, level: 4, position: 'center' },
  { id: 'cart', label: '购物车页', value: '1.2万', count: 12000, change: 5.5, icon: <ShoppingCart className="w-4 h-4" />, level: 5, position: 'center' },
  { id: 'pay', label: '支付页', value: '0.8万', count: 8000, change: 4.2, icon: <CreditCard className="w-4 h-4" />, level: 6, position: 'center' },
];

const jiayoushengyiEdges: FlowEdge[] = [
  { from: 'auth', to: 'register', rate: '15.2%', percent: 15.2 },
  { from: 'register', to: 'home', rate: '82.5%', percent: 82.5 },
  { from: 'home', to: 'store', rate: '42.3%', percent: 42.3 },
  { from: 'store', to: 'detail', rate: '38.5%', percent: 38.5 },
  { from: 'detail', to: 'cart', rate: '28.6%', percent: 28.6 },
  { from: 'cart', to: 'pay', rate: '58.3%', percent: 58.3 },
];

export default function ConversionFlowChart({ miniAppId = 'jiaxiaobao' }: ConversionFlowChartProps) {
  const [animatedEdge, setAnimatedEdge] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = miniAppId === 'jiayoushengyi' ? jiayoushengyiNodes : jiaxiaobaoNodes;
  const edges = miniAppId === 'jiayoushengyi' ? jiayoushengyiEdges : jiaxiaobaoEdges;

  // 自动播放流向动画
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      const edge = edges[currentIndex];
      if (edge) {
        setAnimatedEdge(`${edge.from}-${edge.to}`);
        setTimeout(() => setAnimatedEdge(null), 1000);
      }
      currentIndex = (currentIndex + 1) % edges.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [edges]);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  const getPositionClass = (node: FlowNode) => {
    if (miniAppId === 'jiayoushengyi') {
      return 'justify-center';
    }
    switch (node.position) {
      case 'left': return 'justify-start pl-8';
      case 'right': return 'justify-end pr-8';
      default: return 'justify-center';
    }
  };

  const renderEdge = (edge: FlowEdge) => {
    const fromNode = getNodeById(edge.from);
    const toNode = getNodeById(edge.to);
    if (!fromNode || !toNode) return null;

    const isAnimated = animatedEdge === `${edge.from}-${edge.to}`;
    const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

    return (
      <div
        key={`${edge.from}-${edge.to}`}
        className={clsx(
          'flex items-center gap-2 py-2 transition-all duration-300',
          miniAppId === 'jiayoushengyi' ? 'flex-col' : 'flex-row'
        )}
      >
        {/* 连接线 */}
        <div className={clsx(
          'relative overflow-hidden transition-all duration-500',
          miniAppId === 'jiayoushengyi' ? 'w-1 h-8' : 'h-1 flex-1 max-w-[100px]'
        )}>
          {/* 背景线 */}
          <div className={clsx(
            'absolute bg-accent/20 rounded-full',
            miniAppId === 'jiayoushengyi' ? 'inset-0 w-full' : 'inset-y-0 left-0 right-0'
          )} />
          {/* 流动线 */}
          <div
            className={clsx(
              'absolute bg-accent rounded-full transition-all duration-300',
              miniAppId === 'jiayoushengyi' ? 'w-full left-0' : 'h-full top-0',
              isAnimated ? 'opacity-100' : 'opacity-40'
            )}
            style={{
              [miniAppId === 'jiayoushengyi' ? 'height' : 'width']: isAnimated ? '100%' : '0%',
              transition: isAnimated ? 'all 1s ease-out' : 'all 0.3s ease-out',
            }}
          >
            {isAnimated && (
              <div className={clsx(
                'absolute bg-white/50 rounded-full animate-pulse',
                miniAppId === 'jiayoushengyi'
                  ? 'w-full h-4 -left-1/2 top-0'
                  : 'w-4 h-full -top-1/2 left-0'
              )} />
            )}
          </div>
        </div>

        {/* 转化率标签 */}
        <div className={clsx(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300',
          isHighlighted || isAnimated
            ? 'bg-accent text-white shadow-md'
            : 'bg-surface border border-border-subtle text-text-secondary'
        )}>
          <ArrowRight className={clsx('w-3 h-3', miniAppId === 'jiayoushengyi' && 'rotate-90')} />
          {edge.rate}
        </div>

        {/* 水平布局时的剩余线 */}
        {miniAppId !== 'jiayoushengyi' && (
          <div className="h-1 flex-1 max-w-[100px] bg-accent/20 rounded-full" />
        )}
      </div>
    );
  };

  const renderNode = (node: FlowNode) => {
    const isHovered = hoveredNode === node.id;
    const incomingEdges = edges.filter(e => e.to === node.id);
    const outgoingEdges = edges.filter(e => e.from === node.id);

    return (
      <div
        key={node.id}
        className={clsx(
          'flex items-center gap-4 transition-all duration-300',
          miniAppId === 'jiayoushengyi' ? 'flex-col' : 'flex-row',
          getPositionClass(node)
        )}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {/* 入向连接线 */}
        {incomingEdges.length > 0 && miniAppId !== 'jiayoushengyi' && (
          <div className="flex items-center">
            {incomingEdges.map(edge => renderEdge(edge))}
          </div>
        )}

        {/* 节点卡片 */}
        <div className={clsx(
          'p-4 rounded-xl border bg-surface shadow-sm transition-all duration-300 cursor-pointer min-w-[140px]',
          isHovered
            ? 'border-accent shadow-lg shadow-accent/20 scale-105'
            : 'border-border-subtle hover:border-accent/30'
        )}>
          {/* 节点头部 */}
          <div className="flex items-center gap-2 mb-3">
            <div className={clsx(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              isHovered ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
            )}>
              {node.icon}
            </div>
            <span className="text-xs font-medium text-text-primary">{node.label}</span>
          </div>

          {/* 数值 */}
          <div className="text-xl font-bold text-text-primary mb-2">{node.value}</div>

          {/* 趋势 */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-surface-active rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-500',
                  node.change && node.change > 0 ? 'bg-success' : 'bg-danger'
                )}
                style={{ width: `${Math.min(Math.abs(node.change || 0) * 10, 100)}%` }}
              />
            </div>
            <span className={clsx(
              'text-xs font-medium',
              node.change && node.change > 0 ? 'text-success' : 'text-danger'
            )}>
              {node.change && node.change > 0 ? '+' : ''}{node.change}%
            </span>
          </div>
        </div>

        {/* 出向连接线 */}
        {outgoingEdges.length > 0 && (
          <div className={clsx(
            'flex',
            miniAppId === 'jiayoushengyi' ? 'flex-col' : 'flex-row items-center'
          )}>
            {outgoingEdges.map(edge => renderEdge(edge))}
          </div>
        )}
      </div>
    );
  };

  // 按层级分组节点
  const nodesByLevel = nodes.reduce((acc, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {} as Record<number, FlowNode[]>);

  return (
    <div className="w-full bg-surface rounded-2xl border border-border-subtle p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
            <MousePointer2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">转化流向分析</h3>
            <p className="text-xs text-text-tertiary">用户行为路径与转化漏斗可视化</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            实时流向动画
          </span>
        </div>
      </div>

      {/* Flow Chart */}
      <div className={clsx(
        'relative flex gap-8 py-4',
        miniAppId === 'jiayoushengyi' ? 'flex-col items-center' : 'flex-col'
      )}>
        {Object.entries(nodesByLevel).map(([level, levelNodes]) => (
          <div
            key={level}
            className={clsx(
              'flex gap-6',
              miniAppId === 'jiayoushengyi'
                ? 'flex-col items-center'
                : 'flex-row items-center justify-center w-full'
            )}
          >
            {levelNodes.map(node => renderNode(node))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <div className="w-8 h-1 rounded-full bg-accent/20" />
          <span>流量路径</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <div className="w-8 h-1 rounded-full bg-accent" />
          <span>实时流向</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px]">12%</span>
          <span>转化率</span>
        </div>
      </div>
    </div>
  );
}
