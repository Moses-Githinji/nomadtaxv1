import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar } from "lucide-react";

interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export function RecentTransactions() {
  // Mock data - in production, this would come from Supabase
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'INCOME',
      amount: 1500000,
      category: 'Freelance',
      description: 'Web Development Project',
      date: '2026-01-15'
    },
    {
      id: '2',
      type: 'EXPENSE',
      amount: 85000,
      category: 'Office',
      description: 'Co-working Space Rent',
      date: '2026-01-14'
    },
    {
      id: '3',
      type: 'INCOME',
      amount: 320000,
      category: 'Consulting',
      description: 'Tax Advisory Services',
      date: '2026-01-13'
    },
    {
      id: '4',
      type: 'EXPENSE',
      amount: 45000,
      category: 'Utilities',
      description: 'Internet & Phone',
      date: '2026-01-12'
    },
    {
      id: '5',
      type: 'EXPENSE',
      amount: 120000,
      category: 'Software',
      description: 'SaaS Subscriptions',
      date: '2026-01-10'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <p className="text-sm text-slate-400 mt-1">Latest 5 transactions</p>
        </div>
        <a 
          href="/dashboard/transactions" 
          className="text-sm text-nomad-green hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-slate-800">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="p-4 hover:bg-slate-800/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              {/* Left: Icon, Category & Description */}
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'INCOME' 
                    ? 'bg-nomad-green/10 text-nomad-green' 
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {transaction.type === 'INCOME' ? (
                    <ArrowUpRight size={20} />
                  ) : (
                    <ArrowDownRight size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {transaction.category}
                  </p>
                </div>
              </div>

              {/* Right: Amount & Date */}
              <div className="text-right ml-4">
                <p className={`text-sm font-semibold ${
                  transaction.type === 'INCOME' ? 'text-nomad-green' : 'text-red-400'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-nomad-green" size={16} />
          <div>
            <p className="text-xs text-slate-500">Income</p>
            <p className="text-sm font-semibold text-white">KES 1.82M</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-slate-400" size={16} />
          <div>
            <p className="text-xs text-slate-500">This Month</p>
            <p className="text-sm font-semibold text-white">Jan 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
