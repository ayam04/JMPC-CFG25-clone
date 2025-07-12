'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Clock, CreditCard, TrendingUp } from 'lucide-react';

export default function PaymentPage() {
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

  const payments = [
    {
      id: 1,
      name: 'Sarah Johnson',
      month: 'January 2024',
      amount: '$1,200',
      hours: '40 hours',
      date: '2024-01-31',
      status: 'Paid',
    },
    {
      id: 2,
      name: 'Michael Chen',
      month: 'January 2024',
      amount: '$950',
      hours: '32 hours',
      date: null,
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      month: 'January 2024',
      amount: '$1,100',
      hours: '36 hours',
      date: '2024-01-30',
      status: 'Paid',
    },
  ];

  const getStatusClass = (status) =>
    status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600';

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
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <CreditCard className="w-8 h-8" />
          Payment
        </h1>
        <p className="text-muted-foreground mb-6">
          Manage volunteer payments and compensation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold">$4,125</p>
            <p className="text-xs">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Paid Amount</p>
            <p className="text-2xl font-bold text-green-600">$2,300</p>
            <p className="text-xs">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pending Amount</p>
            <p className="text-2xl font-bold text-yellow-600">$1,825</p>
            <p className="text-xs">Awaiting payment</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Payment Records</h2>
        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.month}</p>
              </div>
              <div>
                <p>{p.amount}</p>
                <p className="text-sm">{p.hours}</p>
                <p className="text-sm">{p.date || 'Not paid yet'}</p>
              </div>
              <div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${getStatusClass(p.status)}`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Process Payments
        </button>
      </main>
    </div>
  );
}
