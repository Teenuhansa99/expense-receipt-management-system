import { formatCurrency } from '@/utils/formatters';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function SummaryCard({ title, value, icon, color = 'blue' }: SummaryCardProps) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white',
    green: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
    purple: 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white',
    orange: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
  };

  return (
    <div className={`rounded-2xl p-6 shadow-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-normal tracking-wide opacity-90">{title}</p>
          <p className="text-3xl font-extrabold tracking-tight">{value}</p>
        </div>
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface SummaryCardMetric {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface SummaryCardsProps {
  totalExpenses: number;
  totalAmount: number;
  thisMonthAmount: number;
  totalCategories: number;
  receiptsCount: number;
  metrics?: SummaryCardMetric[];
}

export function SummaryCards({
  totalExpenses,
  totalAmount,
  thisMonthAmount,
  totalCategories,
  receiptsCount,
  metrics,
}: SummaryCardsProps) {
  const defaultMetrics: SummaryCardMetric[] = [
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: <span className="text-lg">📊</span>,
      color: 'blue',
    },
    {
      title: 'Total Spending',
      value: formatCurrency(totalAmount),
      icon: <span className="text-lg">💰</span>,
      color: 'green',
    },
    {
      title: 'This Month',
      value: formatCurrency(thisMonthAmount),
      icon: <span className="text-lg">📅</span>,
      color: 'purple',
    },
    {
      title: 'Categories',
      value: totalCategories,
      icon: <span className="text-lg">🏷️</span>,
      color: 'orange',
    },
  ];

  const items = metrics && metrics.length ? metrics : defaultMetrics;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <SummaryCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}