import Link from 'next/link';
import { Plus, Receipt, BarChart3, Filter } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Add Expense',
      description: 'Create a new expense entry',
      href: '/expenses/new',
      icon: Plus,
      color: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg',
    },
    {
      title: 'View Expenses',
      description: 'Browse all your expenses',
      href: '/expenses',
      icon: Receipt,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg',
    },
    {
      title: 'View Summary',
      description: 'See spending analytics',
      href: '/summary',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 hover:shadow-lg',
    },
    {
      title: 'Filter Expenses',
      description: 'Search and filter expenses',
      href: '/expenses?filter=true',
      icon: Filter,
      color: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg',
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center space-x-3 rounded-lg p-4 text-white transition-all duration-300 transform hover:scale-105 ${action.color}`}
            >
              <Icon className="h-6 w-6" />
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}