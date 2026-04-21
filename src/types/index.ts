export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  chart?: ChartData;
  charts?: ChartData[];
  metrics?: MetricData[];
  table?: TableData;
  insights?: InsightItem[];
  solutions?: SolutionItem[];
  isTyping?: boolean;
}

export interface ChartData {
  type: 'line' | 'bar' | 'area' | 'pie';
  title: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; color: string; name: string }[];
}

export interface MetricData {
  label: string;
  value: string;
  change?: number;
  unit?: string;
  icon?: string;
  description?: string;
  target?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface InsightItem {
  type: 'positive' | 'warning' | 'neutral';
  title: string;
  detail: string;
}

export interface SolutionItem {
  priority: 'high' | 'medium' | 'low';
  action: string;
  detail: string;
  owner?: string;
}

// MiniApp types
export interface MiniApp {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
}

// Role types
export type UserRole = 'admin' | 'product' | 'operation' | 'developer' | 'pm' | 'uiux';

export interface RoleConfig {
  id: UserRole;
  name: string;
  description: string;
  focusMetrics: string[];
  permissions: string[];
}

// Dashboard Metric with hover insight
export interface DashboardMetric extends MetricData {
  id: string;
  category: 'traffic' | 'performance' | 'conversion' | 'retention' | 'error';
  aiInsight: string;
  detailPage: string;
}

// Share types
export interface ShareConfig {
  id: string;
  title: string;
  description: string;
  metricIds: string[];
  createdAt: Date;
  expiresAt?: Date;
  viewCount: number;
  createdBy: string;
}

export interface DataSource {
  id: 'arms' | 'wedata';
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected';
}

export interface ConversationSession {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
  dataSource: 'arms' | 'wedata' | 'all';
  metricId?: string;
}

export type ExportFormat = 'pdf' | 'docx' | 'png' | 'html';
