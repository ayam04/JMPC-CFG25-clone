'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Clock, CreditCard, TrendingUp } from 'lucide-react';

export default function DelaysPage() {
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

  const delays = [
    {
      id: 1,
      name: 'Sarah Johnson',
      date: '2024-01-15',
      school: 'Green Valley Elementary',
      minutes: 45,
      reason: 'Traffic jam',
      status: 'Resolved',
    },
    {
      id: 2,
      name: 'Michael Chen',
      date: '2024-01-14',
      school: 'Sunrise Middle School',
      minutes: 30,
      reason: 'Transportation issue',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      date: '2024-01-13',
      school: 'Oak Tree High School',
      minutes: 20,
      reason: 'Weather conditions',
      status: 'Resolved',
    },
  ];

  const getColor = (minutes) =>
    minutes >= 40 ? 'text-red-600' : minutes >= 25 ? 'text-yellow-600' : 'text-green-600';

  const getStatusClass = (status) =>
    status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-white border-r h-screen p-4 sticky top-0">
        <h2 className="text-lg font-bold mb-6">NGO Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ title, href, icon: Icon }) => (
            <Link key={title} href={href} className={`flex items-center gap-3 px-3 py-2 rounded-md ${pathname === href ? 'bg-gray-100 font-semibold' : 'text-muted-foreground'}`}>
              <Icon size={18} />
              {title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <Clock className="w-8 h-8" />
          Delays
        </h1>
        <p className="text-muted-foreground mb-6">Track volunteer attendance delays and reasons</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Delays</p>
            <p className="text-xl font-bold">5</p>
            <p className="text-xs">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pending Issues</p>
            <p className="text-xl font-bold">1</p>
            <p className="text-xs">Needs attention</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Avg Delay</p>
            <p className="text-xl font-bold">34 min</p>
            <p className="text-xs">Average duration</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Recent Delays</h2>
        <div className="space-y-3">
          {delays.map((d) => (
            <div key={d.id} className="bg-white p-4 rounded-lg flex justify-between items-center border">
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-gray-500">{d.date}</p>
              </div>
              <div>
                <p className="font-medium">{d.school}</p>
                <p className="text-sm text-gray-500">School</p>
              </div>
              <div className={`font-semibold ${getColor(d.minutes)}`}>{d.minutes} minutes</div>
              <div className="text-sm text-gray-500">{d.reason}</div>
              <div className={`text-xs px-3 py-1 rounded-full ${getStatusClass(d.status)}`}>
                {d.status}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
