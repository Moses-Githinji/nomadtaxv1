import { EtimsUpload } from "@/components/transactions/EtimsUpload";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

export function EtimsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">eTIMS Compliance Hub</h1>
        <p className="text-slate-400 mt-1">Ensure your tax compliance with real-time KRA validation.</p>
      </header>

      {/* Compliance Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-nomad-green/10 border border-nomad-green/20 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-nomad-green/20 rounded-lg text-nomad-green">
                <CheckCircle size={24} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Compliant</h3>
                <p className="text-nomad-green text-sm font-medium">All systems go</p>
                <p className="text-slate-400 text-xs mt-2">Last Audit: 2026-04-01</p>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-slate-800 rounded-lg text-slate-400">
                <FileText size={24} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">12 Receipts</h3>
                <p className="text-slate-400 text-sm">Processed this month</p>
                <p className="text-slate-500 text-xs mt-2">Total Value: KES 145,200</p>
            </div>
        </div>

        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                <AlertTriangle size={24} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Pending Action</h3>
                <p className="text-yellow-500 text-sm">2 Unverified receipts</p>
                <p className="text-slate-400 text-xs mt-2">Please re-scan if needed</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Upload New Receipt</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <EtimsUpload />
            </div>
        </div>

        {/* Recent History / Information */}
        <div className="space-y-4">
             <h2 className="text-xl font-semibold text-white">Compliance Guide</h2>
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 text-sm space-y-4">
                <p>
                    <strong className="text-white">Why eTIMS?</strong> <br />
                    All business expenses must be supported by an eTIMS-compliant invoice to be tax-deductible in Kenya.
                </p>
                <p>
                    <strong className="text-white">Validating QR Codes</strong> <br />
                    Our system automatically scans the QR code on your receipt to verify it against the KRA database.
                </p>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <h4 className="text-white font-medium mb-2">My KRA PIN</h4>
                    <p className="font-mono text-lg tracking-widest text-nomad-green">A001234567Z</p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
