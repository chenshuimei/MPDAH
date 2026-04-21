import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { ChartData } from '@/types';

interface InlineChartProps {
  chart: ChartData;
}

const CHART_COLORS = [
  'hsl(199, 89%, 48%)',
  'hsl(160, 84%, 39%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 84%, 60%)',
  'hsl(270, 76%, 60%)',
];

const tooltipStyle = {
  backgroundColor: 'hsl(222, 30%, 12%)',
  border: '1px solid hsl(222, 20%, 20%)',
  borderRadius: '10px',
  color: 'hsl(210, 40%, 96%)',
  fontSize: '12px',
  padding: '8px 12px',
  boxShadow: '0 10px 30px -10px hsl(222, 50%, 4%, 0.6)',
};

const axisStyle = {
  fontSize: 11,
  fill: 'hsl(215, 15%, 45%)',
};

export default function InlineChart({ chart }: InlineChartProps) {
  const { type, title, data, xKey, yKeys } = chart;

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
              <defs>
                {yKeys.map((yk, i) => (
                  <linearGradient key={yk.key} id={`grad-${yk.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={yk.color || CHART_COLORS[i]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={yk.color || CHART_COLORS[i]} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 15%)" vertical={false} />
              <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              {yKeys.map((yk, i) => (
                <Area
                  key={yk.key}
                  type="monotone"
                  dataKey={yk.key}
                  name={yk.name}
                  stroke={yk.color || CHART_COLORS[i]}
                  strokeWidth={2}
                  fill={`url(#grad-${yk.key})`}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 15%)" vertical={false} />
              <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              {yKeys.map((yk, i) => (
                <Line
                  key={yk.key}
                  type="monotone"
                  dataKey={yk.key}
                  name={yk.name}
                  stroke={yk.color || CHART_COLORS[i]}
                  strokeWidth={2}
                  dot={{ r: 3, fill: yk.color || CHART_COLORS[i] }}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 15%)" vertical={false} />
              <XAxis dataKey={xKey} tick={{ ...axisStyle, fontSize: 10 }} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              {yKeys.map((yk, i) => (
                <Bar
                  key={yk.key}
                  dataKey={yk.key}
                  name={yk.name}
                  fill={yk.color || CHART_COLORS[i]}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey={yKeys[0].key}
                nameKey={xKey}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: 'hsl(215, 15%, 45%)' }}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={(entry as Record<string, string>).fill || CHART_COLORS[i % CHART_COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-border-subtle bg-canvas/50 p-4">
      <p className="text-xs font-medium text-text-secondary mb-3">{title}</p>
      {renderChart()}
    </div>
  );
}
