import { useState } from "react";
import { TaxCountdown } from "@/components/dashboard/TaxCountdown";
import { TripleTank } from "@/components/dashboard/TripleTank";
import { calculateTax } from "@/lib/tax-logic";
import { Play, RotateCcw } from "lucide-react";

export function DashboardPage() {
  const [balances, setBalances] = useState({
    spendable: 250000,
    growth: 840500,
    wealth: 4200000,
  });
  
  const [isSweeping, setIsSweeping] = useState(false);

  const handleSweep = () => {
    setIsSweeping(true);
    
    // Simulate API delay/Animation
    setTimeout(() => {
        const salary = 1500000;
        const taxResult = calculateTax(salary);
        
        // Logic:
        // 1. Tax Deductions -> Growth Tank (MMF)
        // 2. Net Pay -> Split 70% Spendable, 30% Wealth
        
        const deductions = taxResult.totalDeductions;
        const net = taxResult.netPay;
        
        const addToSpendable = net * 0.70;
        const addToWealth = net * 0.30;
        
        setBalances(prev => ({
            spendable: prev.spendable + addToSpendable,
            growth: prev.growth + deductions,
            wealth: prev.wealth + addToWealth
        }));
        
        setIsSweeping(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, Nomad. Here is your financial fortress.</p>
        </div>
        <div className="flex items-center gap-4">
             <button 
                onClick={handleSweep}
                disabled={isSweeping}
                className="flex items-center gap-2 px-4 py-2 bg-nomad-green hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-nomad-green/20"
             >
                {isSweeping ? <RotateCcw className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
                {isSweeping ? "Allocating..." : "Sweep Salary"}
             </button>
             <TaxCountdown />
        </div>
      </header>

      {/* Triple Tank Section */}
      <TripleTank balances={balances} />
      
      {/* Future Sections Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="h-64 rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex items-center justify-center text-slate-500">
             Transactions (Coming Soon)
          </div>
          <div className="h-64 rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col items-center justify-center text-slate-500 gap-2">
             <span className="text-lg font-medium">Auto-Log Active</span>
             <span className="text-sm">eTIMS Receipt Scanner Ready</span>
          </div>
      </div>
    </div>
  );
}
