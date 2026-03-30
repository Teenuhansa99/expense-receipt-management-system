import Link from 'next/link';
import { Plus, Receipt, BarChart3, Filter } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Add Expense',
      description: 'Create a new expense entry',
      href: '/expenses/new',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'View Expenses',
      description: 'Browse all your expenses',
      href: '/expenses',
      icon: Receipt,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'View Summary',
      description: 'See spending analytics',
      href: '/summary',
      icon: BarChart3,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Filter Expenses',
      description: 'Search and filter expenses',
      href: '/expenses?filter=true',
      icon: Filter,
      color: 'bg-orange-500 hover:bg-orange-600',
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
              className={`flex items-center space-x-3 rounded-lg p-4 text-white transition-colors ${action.color}`}
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