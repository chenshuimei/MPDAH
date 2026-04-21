import { useState, useEffect } from 'react';
import { UserRole, DashboardMetric } from '@/types';
import Dashboard from '@/components/Dashboard';
import MetricDetailPage from '@/components/MetricDetailPage';
import ShareViewPage from '@/components/ShareViewPage';
import { roleConfigs } from '@/data/miniappData';

// Get initial role from localStorage or default to 'pm'
const getInitialRole = (): UserRole => {
  const saved = localStorage.getItem('userRole') as UserRole;
  return saved && roleConfigs.some(r => r.id === saved) ? saved : 'pm';
};

// Get initial theme from localStorage or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark';
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Check if we're on a share page
const isSharePage = (): boolean => {
  return window.location.pathname.startsWith('/share/');
};

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(getInitialRole);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [view, setView] = useState<'dashboard' | 'detail' | 'share'>(isSharePage() ? 'share' : 'dashboard');
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save role changes
  useEffect(() => {
    localStorage.setItem('userRole', currentRole);
  }, [currentRole]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleMetricClick = (metric: DashboardMetric) => {
    setSelectedMetric(metric);
    setView('detail');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedMetric(null);
  };

  const handleEnterChat = () => {
    // Create a default metric for general chat
    const defaultMetric: DashboardMetric = {
      id: 'general',
      label: '数据洞察分析',
      value: '-',
      unit: '',
      change: 0,
      category: 'traffic',
      description: '通用数据分析助手',
      aiInsight: '我是您的AI数据分析助手，可以帮您分析小程序的各项指标数据。',
      detailPage: '/general-analysis',
    };
    setSelectedMetric(defaultMetric);
    setView('detail');
  };

  // Share page view
  if (view === 'share') {
    const shareId = window.location.pathname.split('/').pop();
    return (
      <ShareViewPage 
        shareId={shareId} 
        onBack={() => setView('dashboard')} 
      />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      {view === 'dashboard' ? (
        <Dashboard
          currentRole={currentRole}
          theme={theme}
          onThemeToggle={toggleTheme}
          onMetricClick={handleMetricClick}
          onEnterChat={handleEnterChat}
        />
      ) : selectedMetric ? (
        <MetricDetailPage
          metric={selectedMetric}
          currentRole={currentRole}
          onBack={handleBackToDashboard}
        />
      ) : null}
    </div>
  );
}
