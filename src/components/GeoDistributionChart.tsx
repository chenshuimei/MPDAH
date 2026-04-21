import { useState } from 'react';
import { MapPin, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { Treemap, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import clsx from 'clsx';

interface ProvinceData {
  name: string;
  value: number;
  percent: number;
  growth: number;
}

// 模拟省份数据
const provinceData: ProvinceData[] = [
  { name: '新疆', value: 3066, percent: 15.85, growth: 12.3 },
  { name: '广东', value: 2977, percent: 15.39, growth: 8.5 },
  { name: '云南', value: 2606, percent: 13.47, growth: -2.1 },
  { name: '江苏', value: 1203, percent: 6.22, growth: 5.2 },
  { name: '重庆', value: 1138, percent: 5.88, growth: 3.8 },
  { name: '四川', value: 1089, percent: 5.63, growth: 7.2 },
  { name: '浙江', value: 956, percent: 4.94, growth: 4.5 },
  { name: '山东', value: 823, percent: 4.25, growth: 2.1 },
  { name: '河南', value: 756, percent: 3.91, growth: 1.8 },
  { name: '湖北', value: 689, percent: 3.56, growth: 3.2 },
  { name: '湖南', value: 634, percent: 3.28, growth: 2.5 },
  { name: '福建', value: 567, percent: 2.93, growth: 4.1 },
  { name: '陕西', value: 523, percent: 2.70, growth: 1.5 },
  { name: '北京', value: 489, percent: 2.53, growth: 6.8 },
  { name: '上海', value: 456, percent: 2.36, growth: 5.5 },
  { name: '河北', value: 412, percent: 2.13, growth: 0.8 },
  { name: '山西', value: 378, percent: 1.95, growth: -0.5 },
  { name: '辽宁', value: 345, percent: 1.78, growth: -1.2 },
  { name: '黑龙江', value: 312, percent: 1.61, growth: -2.5 },
  { name: '广西', value: 289, percent: 1.49, growth: 3.8 },
  { name: '贵州', value: 267, percent: 1.38, growth: 4.2 },
  { name: '江西', value: 245, percent: 1.27, growth: 2.1 },
  { name: '甘肃', value: 223, percent: 1.15, growth: 1.2 },
  { name: '海南', value: 198, percent: 1.02, growth: 8.5 },
  { name: '内蒙古', value: 176, percent: 0.91, growth: 0.5 },
  { name: '吉林', value: 154, percent: 0.80, growth: -0.8 },
  { name: '宁夏', value: 132, percent: 0.68, growth: 2.8 },
  { name: '青海', value: 98, percent: 0.51, growth: 1.5 },
  { name: '西藏', value: 67, percent: 0.35, growth: 5.2 },
  { name: '天津', value: 45, percent: 0.23, growth: -3.5 },
];

// 用户类型选项
const userTypeOptions = ['全部用户', '新用户', '老用户'];

// 获取颜色强度
const getColorByValue = (value: number): string => {
  if (value >= 2500) return '#00692f';
  if (value >= 1500) return '#2d8a4e';
  if (value >= 800) return '#5aab73';
  if (value >= 400) return '#88cc98';
  if (value >= 200) return '#b5edbd';
  return '#d4f4d4';
};

// Treemap 数据转换 - recharts 需要 children 结构
const treemapData = [{
  name: '中国',
  children: provinceData.map(p => ({
    name: p.name,
    size: p.value,
    percent: p.percent,
    growth: p.growth,
    fill: getColorByValue(p.value),
  }))
}];

// Custom Treemap Node Component
const CustomTreemapNode = (props: any) => {
  const { x, y, width, height, name, size, percent, fill } = props;
  
  // Handle undefined values
  if (x == null || y == null || width == null || height == null) return <g />;
  if (width < 30 || height < 20) return <g />;
  
  const showText = width > 50 && height > 40;
  const showValue = width > 60 && height > 60;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill || '#e5e7eb'}
        stroke="#fff"
        strokeWidth={1}
        className="cursor-pointer transition-all duration-200 hover:opacity-80"
      />
      {showText && name && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showValue ? 8 : 0)}
          textAnchor="middle"
          fill="#fff"
          fontSize={width > 80 ? 14 : 12}
          fontWeight={500}
        >
          {name}
        </text>
      )}
      {showValue && size != null && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 12}
            textAnchor="middle"
            fill="#fff"
            fontSize={11}
            opacity={0.9}
          >
            {size.toLocaleString()}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 26}
            textAnchor="middle"
            fill="#fff"
            fontSize={10}
            opacity={0.8}
          >
            {percent || 0}%
          </text>
        </>
      )}
    </g>
  );
};

export default function GeoDistributionChart() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'value' | 'percent'>('value');
  const [userType, setUserType] = useState('全部用户');
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);

  const sortedData = [...provinceData].sort((a, b) =>
    sortBy === 'value' ? b.value - a.value : b.percent - a.percent
  );

  return (
    <div className="w-full bg-surface rounded-2xl border border-border-subtle p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">用户地域画像</h3>
            <p className="text-xs text-text-tertiary">省级地域分布与用户来源分析</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* 用户类型选择 */}
          <div className="relative">
            <button
              onClick={() => setShowUserTypeDropdown(!showUserTypeDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-active text-sm text-text-secondary hover:bg-surface-hover transition-colors"
            >
              <span>{userType}</span>
              <ChevronDown className={clsx('w-4 h-4 transition-transform', showUserTypeDropdown && 'rotate-180')} />
            </button>
            {showUserTypeDropdown && (
              <div className="absolute top-full right-0 mt-1 py-1 w-32 rounded-xl bg-surface border border-border shadow-elevated z-50">
                {userTypeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setUserType(option);
                      setShowUserTypeDropdown(false);
                    }}
                    className={clsx(
                      'w-full px-4 py-2 text-left text-sm transition-colors',
                      userType === option
                        ? 'bg-accent-muted text-accent'
                        : 'text-text-secondary hover:bg-surface-hover'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Visualization - Treemap */}
        <div className="relative bg-surface-active/30 rounded-xl p-4">
          {/* 日期选择 */}
          {/* <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-text-tertiary z-10">
            <span>2026/04/16</span>
            <ChevronDown className="w-3 h-3" />
          </div> */}

          {/* Treemap Chart */}
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={CustomTreemapNode}
              >
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      // Handle nested data structure
                      const name = data?.name || data?.payload?.name;
                      const size = data?.size || data?.payload?.size;
                      const percent = data?.percent || data?.payload?.percent;
                      const growth = data?.growth || data?.payload?.growth;
                      if (!name || name === '中国') return null;
                      return (
                        <div className="bg-surface border border-border-subtle rounded-lg p-3 shadow-elevated text-xs">
                          <div className="font-medium text-text-primary">{name}</div>
                          <div className="text-text-secondary mt-1">访问: {size?.toLocaleString()}</div>
                          <div className="text-accent">占比: {percent}%</div>
                          <div className={clsx(
                            'mt-1',
                            growth > 0 ? 'text-success' : 'text-danger'
                          )}>
                            环比: {growth > 0 ? '+' : ''}{growth}%
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>

          {/* 图例 */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 bg-surface/80 backdrop-blur-sm rounded-lg p-3">
            <div className="text-[10px] text-text-tertiary mb-1">访问人数</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#00692f' }} />
              <span className="text-[10px] text-text-secondary">&gt;2500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#2d8a4e' }} />
              <span className="text-[10px] text-text-secondary">1500-2500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#5aab73' }} />
              <span className="text-[10px] text-text-secondary">800-1500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#88cc98' }} />
              <span className="text-[10px] text-text-secondary">400-800</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#b5edbd' }} />
              <span className="text-[10px] text-text-secondary">200-400</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 rounded" style={{ backgroundColor: '#d4f4d4' }} />
              <span className="text-[10px] text-text-secondary">&lt;200</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary">省级地域分布</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy('value')}
                className={clsx(
                  'text-xs px-2 py-1 rounded transition-colors',
                  sortBy === 'value' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface-active'
                )}
              >
                按人数
              </button>
              <button
                onClick={() => setSortBy('percent')}
                className={clsx(
                  'text-xs px-2 py-1 rounded transition-colors',
                  sortBy === 'percent' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface-active'
                )}
              >
                按占比
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden max-h-[280px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-surface z-10">
                <tr className="border-b border-border-subtle">
                  <th className="text-left text-xs font-medium text-text-tertiary py-2 px-2">省份</th>
                  <th className="text-right text-xs font-medium text-text-tertiary py-2 px-2">
                    <span className="flex items-center justify-end gap-1">
                      访问人数
                      <TrendingUp className="w-3 h-3 text-accent" />
                    </span>
                  </th>
                  <th className="text-right text-xs font-medium text-text-tertiary py-2 px-2">占比</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr
                    key={item.name}
                    className={clsx(
                      'border-b border-border-subtle/50 transition-colors cursor-pointer',
                      hoveredProvince === item.name ? 'bg-accent/5' : 'hover:bg-surface-active/50'
                    )}
                    onMouseEnter={() => setHoveredProvince(item.name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium',
                          index < 3 ? 'bg-accent text-white' : 'bg-surface-active text-text-secondary'
                        )}>
                          {index + 1}
                        </span>
                        <span className="text-sm text-text-primary">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span className="text-sm text-text-primary">{item.value.toLocaleString()}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-surface-active rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-primary w-12">{item.percent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-text-tertiary" />
                <span className="text-xs text-text-secondary">总访问人数</span>
                <span className="text-sm font-semibold text-text-primary">
                  {provinceData.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-tertiary">
              <span>显示前 {sortedData.length} 个省份</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
