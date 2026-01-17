import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  isDeductible: boolean;
}

export function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", date: "2026-04-12", description: "Javahouse Coffee (Client Meeting)", category: "Meals & Ent", amount: 1200, isDeductible: true },
    { id: "2", date: "2026-04-11", description: "Uber Ride to CBD", category: "Transport", amount: 850, isDeductible: true },
    { id: "3", date: "2026-04-10", description: "Netflix Subscription", category: "Personal", amount: 1400, isDeductible: false },
    { id: "4", date: "2026-04-09", description: "KPLC Power Bill (Home Office)", category: "Utilities", amount: 5600, isDeductible: true },
    { id: "5", date: "2026-04-08", description: "Naivas Supermarket", category: "Groceries", amount: 15400, isDeductible: false },
  ]);

  const toggleDeductible = (id: string) => {
    setTransactions(prev => prev.map(t => 
        t.id === id ? { ...t, isDeductible: !t.isDeductible } : t
    ));
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
                <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-center">Tax Deductible</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4 text-slate-300 font-mono">{t.date}</td>
                        <td className="px-6 py-4 text-white font-medium">{t.description}</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-400">
                                {t.category}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right text-white font-mono">
                            {new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(t.amount)}
                        </td>
                        <td className="px-6 py-4 text-center">
                            <button
                                onClick={() => toggleDeductible(t.id)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                                    t.isDeductible 
                                        ? "bg-trust-blue/20 text-trust-blue ring-1 ring-trust-blue/50 hover:bg-trust-blue/30" 
                                        : "bg-slate-800 text-slate-500 hover:text-slate-300"
                                )}
                            >
                                {t.isDeductible ? <Check size={12} /> : <X size={12} />}
                                {t.isDeductible ? "YES" : "NO"}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
