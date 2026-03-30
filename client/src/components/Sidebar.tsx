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
    iconColor: 'text-cyan-400',
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: Receipt,
    iconColor: 'text-violet-400',
  },
  {
    title: 'Add Expense',
    href: '/expenses/new',
    icon: Plus,
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Summary',
    href: '/summary',
    icon: BarChart3,
    iconColor: 'text-amber-400',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    iconColor: 'text-blue-400',
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
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-white' : item.iconColor)} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300">
          <LogOut className="h-5 w-5 text-cyan-400 hover:text-white" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}