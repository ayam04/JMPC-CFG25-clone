'use client';

import { useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Users,
  Home,
  Clock,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AdminDashboardPage() {
  const pathname = usePathname();

  const navItems = [
    { title: 'Dashboard', href: '/admin', icon: Home },
    { title: 'Volunteers', href: '/admin/volunteers', icon: Users },
    { title: 'Delays', href: '/admin/delays', icon: Clock },
    { title: 'Payment', href: '/admin/payment', icon: CreditCard },
    { title: 'Metrics', href: '/admin/metrics', icon: TrendingUp },
    { title: 'Heatmap', href: '/admin/heatmap', icon: TrendingUp },
    { title: 'Feedback', href: '/admin/feedback', icon: Users },

  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [80, 83, 85, 89, 94, 87],
        borderColor: '#10B981',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Quiz Score %',
        data: [85, 86, 88, 88, 91, 84],
        borderColor: '#0F172A',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'School Visits',
        data: [12, 15, 17, 16, 20, 18],
        borderColor: '#FACC15',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


  return (
    <div className="flex min-h-screen md-surface">
      {/* Material 3 Sidebar */}
      <aside className="w-60 md-surface-container-low md-elevation-1 h-screen p-6 sticky top-0">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md-primary-container md-shape-corner-medium flex items-center justify-center">
              <span className="md-typescale-title-medium font-bold">AD</span>
            </div>
            <div>
              <h2 className="md-typescale-title-large md-text-on-surface font-bold">Admin Portal</h2>
              <p className="md-typescale-body-small md-text-on-surface-variant">NGO Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map(({ title, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 md-shape-corner-full md-ripple-surface transition-all duration-200 ${
                pathname === href
                  ? 'md-secondary-container md-text-on-secondary-container font-semibold'
                  : 'md-text-on-surface hover:md-surface-container-high'
              }`}
            >
              <Icon size={20} />
              <span className="md-typescale-label-large">{title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content - Material 3 */}
      <main className="flex-1 p-6 overflow-y-auto md-surface">
        {/* Material 3 Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-6">
            <span className="text-2xl">📊</span>
            <span className="md-typescale-label-large md-text-on-surface font-medium">
              Admin Portal
            </span>
          </div>
          
          <h1 className="md-typescale-display-small md-text-on-surface font-bold mb-2">
            <span className="bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent">
              Dashboard Overview
            </span>
          </h1>
          <p className="md-typescale-body-large md-text-on-surface-variant">
            Monitor your NGO's performance and volunteer activities
          </p>
        </div>

        {/* Material 3 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md-surface-container md-elevation-1 md-shape-corner-large p-6 relative overflow-hidden group hover:md-elevation-2 transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-60/10 to-primary-80/10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="md-typescale-body-medium md-text-on-surface-variant mb-2">Total Volunteers</div>
            <div className="md-typescale-display-small md-text-primary font-bold mb-1">24</div>
            <div className="md-typescale-body-small md-text-on-surface-variant">Active this month</div>
          </div>
          
          <div className="md-surface-container md-elevation-1 md-shape-corner-large p-6 relative overflow-hidden group hover:md-elevation-2 transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary-60/10 to-secondary-80/10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="md-typescale-body-medium md-text-on-surface-variant mb-2">Schools Covered</div>
            <div className="md-typescale-display-small md-text-secondary font-bold mb-1">48</div>
            <div className="md-typescale-body-small md-text-on-surface-variant">Across all regions</div>
          </div>
          
          <div className="md-surface-container md-elevation-1 md-shape-corner-large p-6 relative overflow-hidden group hover:md-elevation-2 transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-tertiary-60/10 to-tertiary-80/10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="md-typescale-body-medium md-text-on-surface-variant mb-2">Avg Attendance</div>
            <div className="md-typescale-display-small md-text-tertiary font-bold mb-1">87%</div>
            <div className="md-typescale-body-small md-text-on-surface-variant">This quarter</div>
          </div>
          
          <div className="md-surface-container md-elevation-1 md-shape-corner-large p-6 relative overflow-hidden group hover:md-elevation-2 transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-60/10 to-tertiary-60/10 rounded-full transform translate-x-8 -translate-y-8" />
            <div className="md-typescale-body-medium md-text-on-surface-variant mb-2">Avg Quiz Score</div>
            <div className="md-typescale-display-small md-text-primary font-bold mb-1">82%</div>
            <div className="md-typescale-body-small md-text-on-surface-variant">Last 30 days</div>
          </div>
        </div>

        {/* Material 3 Chart Section */}
        <div className="md-surface-container md-elevation-1 md-shape-corner-large p-6">
          <h2 className="md-typescale-headline-small md-text-on-surface font-bold mb-6">Performance Overview</h2>
          <div className="w-full h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
}
