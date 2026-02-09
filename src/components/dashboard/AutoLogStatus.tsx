import { Scan, CheckCircle2, Zap, FileText } from "lucide-react";

export function AutoLogStatus() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-trust-blue/10 flex items-center justify-center">
            <Zap className="text-trust-blue" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Auto-Log Active</h3>
            <p className="text-sm text-slate-400">eTIMS Receipt Scanner</p>
          </div>
        </div>
      </div>

      {/* Status Content */}
      <div className="p-6 space-y-6">
        {/* Active Status */}
        <div className="flex items-center gap-3 p-4 bg-nomad-green/5 border border-nomad-green/20 rounded-lg">
          <CheckCircle2 className="text-nomad-green flex-shrink-0" size={24} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">System Online</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Automatically logging eTIMS receipts
            </p>
          </div>
          <div className="w-3 h-3 bg-nomad-green rounded-full animate-pulse"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Scan className="text-trust-blue" size={18} />
              <p className="text-xs text-slate-400">Scanned Today</p>
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-nomad-green mt-1">+3 from yesterday</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-trust-blue" size={18} />
              <p className="text-xs text-slate-400">This Month</p>
            </div>
            <p className="text-2xl font-bold text-white">247</p>
            <p className="text-xs text-slate-400 mt-1">Jan 2026</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Recent Activity
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="w-2 h-2 bg-nomad-green rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Receipt processed</p>
                <p className="text-xs text-slate-500">INV-2026-0247</p>
              </div>
              <p className="text-xs text-slate-500">2m ago</p>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="w-2 h-2 bg-nomad-green rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Auto-categorized</p>
                <p className="text-xs text-slate-500">Office Supplies</p>
              </div>
              <p className="text-xs text-slate-500">15m ago</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="w-2 h-2 bg-trust-blue rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Tax allocated</p>
                <p className="text-xs text-slate-500">KES 12,450 to Tax Tank</p>
              </div>
              <p className="text-xs text-slate-500">1h ago</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href="/dashboard/etims"
          className="block w-full text-center px-4 py-3 bg-trust-blue hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-trust-blue/20"
        >
          View eTIMS Dashboard
        </a>
      </div>
    </div>
  );
}
