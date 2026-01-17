import { TaxCalculator } from "@/components/tax/TaxCalculator";
import { TaxCountdown } from "@/components/dashboard/TaxCountdown";

export function TaxPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Tax Engine</h1>
           <p className="text-slate-400 mt-1">Simulate your liabilities under the 2026 Finance Bill.</p>
        </div>
        <div className="w-full md:w-auto">
           <TaxCountdown />
        </div>
      </header>

      {/* Main Content */}
      <TaxCalculator />
    </div>
  );
}
