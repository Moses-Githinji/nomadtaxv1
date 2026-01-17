import { TransactionTable } from "@/components/transactions/TransactionTable";
import { EtimsUpload } from "@/components/transactions/EtimsUpload";

export function TransactionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Transactions</h1>
        <p className="text-slate-400 mt-1">Manage your spending and eTIMS validation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2 space-y-4">
               <div className="flex items-center justify-between">
                   <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                   {/* Filter placeholder */}
                   <button className="text-sm text-nomad-green hover:underline">View All</button>
               </div>
               <TransactionTable />
          </div>

          {/* Sidebar Upload */}
          <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                 <h2 className="text-lg font-semibold text-white mb-4">Quick Upload</h2>
                 <EtimsUpload />
              </div>
              
               <div className="p-4 rounded-xl bg-nomad-green/10 border border-nomad-green/20 text-nomad-green text-sm">
                   <strong>Tip:</strong> Ensure QR codes are visible for faster eTIMS validation.
               </div>
          </div>
      </div>
    </div>
  );
}
