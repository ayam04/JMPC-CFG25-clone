'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Clock,
  CreditCard,
  TrendingUp,
} from 'lucide-react';

export default function VolunteersPage() {
  const pathname = usePathname();

  const navItems = [
    { title: 'Dashboard', href: '/admin', icon: Home },
    { title: 'Volunteers', href: '/admin/volunteers', icon: Users },
    { title: 'Delays', href: '/admin/delays', icon: Clock },
    { title: 'Payment', href: '/admin/payment', icon: CreditCard },
    { title: 'Metrics', href: '/admin/metrics', icon: TrendingUp },
  ];

  const volunteers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      region: 'North District',
      schools: 3,
      attendance: 94,
      quiz: 88,
    },
    {
      id: 2,
      name: 'Michael Chen',
      region: 'South District',
      schools: 2,
      attendance: 91,
      quiz: 85,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      region: 'West District',
      schools: 2,
      attendance: 88,
      quiz: 82,
    },
    {
      id: 4,
      name: 'David Thompson',
      region: 'East District',
      schools: 2,
      attendance: 85,
      quiz: 79,
    },
    {
      id: 5,
      name: 'Lisa Park',
      region: 'Central District',
      schools: 3,
      attendance: 96,
      quiz: 92,
    },
    {
      id: 6,
      name: 'James Wilson',
      region: 'North District',
      schools: 2,
      attendance: 82,
      quiz: 76,
    },
  ];

  const getAttendanceColor = (value) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQuizColor = (value) => {
    if (value >= 85) return 'text-green-600';
    if (value >= 75) return 'text-yellow-600';
    return 'text-red-600';
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
                pathname === href
                  ? 'bg-gray-100 font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon size={18} />
              {title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <Users className="w-8 h-8" />
          Volunteers
        </h1>
        <p className="text-muted-foreground mb-6">
          Manage and monitor all volunteers
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {volunteers.map((v) => (
            <div key={v.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                  {v.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{v.name}</h3>
                  <p className="text-sm text-gray-500">{v.region}</p>
                </div>
              </div>
              <p>Schools Assigned: <span className="font-medium">{v.schools}</span></p>
              <p>
                Attendance:{' '}
                <span className={`font-semibold ${getAttendanceColor(v.attendance)}`}>
                  {v.attendance}%
                </span>
              </p>
              <p>
                Avg Quiz Score:{' '}
                <span className={`font-semibold ${getQuizColor(v.quiz)}`}>
                  {v.quiz}%
                </span>
              </p>
              <button className="mt-4 w-full border rounded-md py-1 text-sm text-black hover:bg-gray-50">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
