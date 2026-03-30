'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  Plus,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: Receipt,
  },
  {
    title: 'Add Expense',
    href: '/expenses/new',
    icon: Plus,
  },
  {
    title: 'Summary',
    href: '/summary',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}