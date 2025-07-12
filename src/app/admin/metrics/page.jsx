'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Clock, CreditCard, TrendingUp } from 'lucide-react';
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

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MetricsPage() {
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
  animation: false, // disables all animations completely
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r h-screen p-4 sticky top-0">
        <h2 className="text-lg font-bold mb-6">NGO Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ title, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                pathname === href ? 'bg-gray-100 font-semibold' : 'text-muted-foreground'
              }`}
            >
              <Icon size={18} />
              {title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8" />
          Metrics
        </h1>
        <p className="text-muted-foreground mb-6">
          Analyze performance and track key metrics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Volunteers</p>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-green-600">+12% from last month</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Schools Covered</p>
            <p className="text-2xl font-bold">48</p>
            <p className="text-xs text-green-600">+8% from last month</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Avg Attendance</p>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-xs text-green-600">+3% from last month</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">Avg Quiz Score</p>
            <p className="text-2xl font-bold">82%</p>
            <p className="text-xs text-green-600">+5% from last month</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Performance Trends</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>
    </div>
  );
}
