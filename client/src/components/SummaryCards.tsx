import { formatCurrency } from '@/utils/formatters';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function SummaryCard({ title, value, icon, color = 'blue' }: SummaryCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  totalExpenses: number;
  totalAmount: number;
  thisMonthAmount: number;
  totalCategories: number;
  receiptsCount: number;
}

export function SummaryCards({
  totalExpenses,
  totalAmount,
  thisMonthAmount,
  totalCategories,
  receiptsCount,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Expenses"
        value={totalExpenses}
        icon={<span className="text-lg">📊</span>}
        color="blue"
      />
      <SummaryCard
        title="Total Spending"
        value={formatCurrency(totalAmount)}
        icon={<span className="text-lg">💰</span>}
        color="green"
      />
      <SummaryCard
        title="This Month"
        value={formatCurrency(thisMonthAmount)}
        icon={<span className="text-lg">📅</span>}
        color="purple"
      />
      <SummaryCard
        title="Categories"
        value={totalCategories}
        icon={<span className="text-lg">🏷️</span>}
        color="orange"
      />
    </div>
  );
}