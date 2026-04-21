import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface DashboardChartProps {
  type: 'line' | 'bar' | 'area' | 'pie';
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
  height?: number;
}

const CHART_COLORS = [
  'hsl(147, 100%, 21%)',  // brand
  'hsl(147, 60%, 45%)',   // brand light
  'hsl(38, 92%, 50%)',    // warning
  'hsl(160, 84%, 39%)',   // success
  'hsl(0, 84%, 60%)',     // danger
];

export default function DashboardChart({ type, data, xKey, yKeys, height = 200 }: DashboardChartProps) {
  const tooltipStyle = {
    backgroundColor: 'hsl(var(--surface))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    color: 'hsl(var(--text-primary))',
    fontSize: '12px',
    padding: '8px 12px',
  };

  const axisStyle = {
    fontSize: 11,
    fill: 'hsl(var(--text-tertiary))',
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                {yKeys.map((yk, i) => (
                  <linearGradient key={yk.key} id={`grad-${yk.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={yk.color || CHART_COLORS[i]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={yk.color || CHART_COLORS[i]} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" vertical={false} />
              <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
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
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" vertical={false} />
              <XAxis dataKey={xKey} tick={axisStyle} tickLine={false} axisLine={false} />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              {yKeys.map((yk, i) => (
                <Line
                  key={yk.key}
                  type="monotone"
                  dataKey={yk.key}
                  name={yk.name}
                  stroke={yk.color || CHART_COLORS[i]}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey={yKeys[0].key}
                nameKey={xKey}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={(entry as Record<string, string>).fill || CHART_COLORS[i % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend verticalAlign="bottom" height={20} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return renderChart();
}
