import { useState } from "react";
import { Calculator, ArrowRight, ShieldCheck, PieChart } from "lucide-react";
import { calculateTax, type TaxResult } from "@/lib/tax-logic";


export function TaxCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(1500000); // Default 1.5M as per prompt
  const [result, setResult] = useState<TaxResult>(calculateTax(1500000));

  const handleCalculate = () => {
    const res = calculateTax(grossSalary);
    setResult(res);
  };

  const formatMoney = (amount: number) => 
    new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calculator className="text-nomad-green" size={20} />
                Input Salary
            </h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Gross Salary (KES)</label>
                    <input 
                        type="number" 
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nomad-green focus:border-transparent outline-none transition-all font-mono text-lg"
                    />
                </div>
                <button 
                    onClick={handleCalculate}
                    className="w-full bg-nomad-green hover:bg-emerald-500 text-slate-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    Calculate Taxes <ArrowRight size={18} />
                </button>
            </div>
        </div>

        {/* Info Card */}
        <div className="bg-trust-blue/10 border border-trust-blue/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
                <ShieldCheck className="text-trust-blue shrink-0" size={24} />
                <div>
                    <h4 className="text-trust-blue font-semibold mb-1">2026 Ready</h4>
                    <p className="text-sm text-slate-400">
                        Includes latest brackets (up to 35%), SHIF (2.75%), and Housing Levy (1.5%).
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7 space-y-4">
         <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
             <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                 <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                     <PieChart className="text-trust-blue" size={20} />
                     Breakdown
                 </h3>
                 <span className="text-sm text-slate-500">Monthly</span>
             </div>
             
             <div className="p-6 space-y-4">
                 {/* Gross */}
                 <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                     <span className="text-slate-400">Gross Salary</span>
                     <span className="text-white font-mono font-medium">{formatMoney(result.grossPay)}</span>
                 </div>

                 {/* Deductions */}
                 <div className="space-y-2">
                     <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            PAYE (Income Tax)
                         </span>
                         <span className="text-red-400 font-mono">{formatMoney(result.paye)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            SHIF (2.75%)
                         </span>
                         <span className="text-orange-400 font-mono">{formatMoney(result.shif)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                            Housing Levy (1.5%)
                         </span>
                         <span className="text-yellow-400 font-mono">{formatMoney(result.housingLevy)}</span>
                     </div>
                 </div>

                 {/* Divider */}
                 <div className="h-px bg-slate-800 my-2" />

                 {/* Net Pay */}
                 <div className="flex justify-between items-center py-2 bg-slate-800/30 rounded-lg px-4 -mx-2">
                     <span className="text-nomad-green font-semibold">Net Pay</span>
                     <span className="text-2xl font-bold text-nomad-green font-mono">{formatMoney(result.netPay)}</span>
                 </div>
                 
                 <div className="flex justify-between items-center px-2">
                    <span className="text-xs text-slate-500">Total Deductions</span>
                    <span className="text-xs text-slate-500">{formatMoney(result.totalDeductions)}</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}
