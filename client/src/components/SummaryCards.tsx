import { formatCurrency } from '@/utils/formatters';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function SummaryCard({ title, value, icon, color = 'blue' }: SummaryCardProps) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white',
    green: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
    purple: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
    orange: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white',
  };

  return (
    <div className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-full p-3 bg-white/20 backdrop-blur-sm">
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