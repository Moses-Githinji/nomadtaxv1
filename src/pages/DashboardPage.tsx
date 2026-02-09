import { useState, useEffect } from "react";
import { TaxCountdown } from "@/components/dashboard/TaxCountdown";
import { TripleTank } from "@/components/dashboard/TripleTank";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { AutoLogStatus } from "@/components/dashboard/AutoLogStatus";
import { calculateTax } from "@/lib/tax-logic";
import { Play, RotateCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function DashboardPage() {
  const [balances, setBalances] = useState({
    spendable: 250000,
    growth: 840500,
    wealth: 4200000,
  });
  
  const [isSweeping, setIsSweeping] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

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

  // Get user display name
  const getUserName = () => {
    if (!user) return "Nomad";
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           "Nomad";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Welcome back, <span className="text-nomad-green font-semibold">{getUserName()}</span>. Here is your financial fortress.
        </p>
      </header>

      {/* Triple Tank Section (Net Worth Overview) */}
      <TripleTank balances={balances} />
      
      {/* Action Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sweep Salary */}
        <button 
          onClick={handleSweep}
          disabled={isSweeping}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-nomad-green hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-nomad-green/20"
        >
          {isSweeping ? <RotateCcw className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
          <span>{isSweeping ? "Allocating..." : "Sweep Salary"}</span>
        </button>
        
        {/* Tax Countdown */}
        <div className="md:col-span-2 flex items-center justify-center">
          <TaxCountdown />
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <AutoLogStatus />
      </div>
    </div>
  );
}
