import { ShieldCheck, Wallet, PieChart } from "lucide-react";

export function Features() {
  return (
    <div className="py-24 bg-slate-900/30 border-t border-white/5">
       <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
                  Everything you need to <br /> thrive as a modern nomad.
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                  Consolidate your financial life. From tax calculations to wealth distribution, we handle the boring stuff so you can focus on your craft.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-nomad-green/30 transition-colors group">
                  <div className="h-12 w-12 rounded-lg bg-nomad-green/10 flex items-center justify-center text-nomad-green mb-6 group-hover:scale-110 transition-transform">
                      <PieChart size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Triple Tank Method</h3>
                  <p className="text-slate-400 leading-relaxed">
                      Visualise your income split between Spendable Cash, Tax Reserves (MMF), and Fortress Wealth. Never dip into your tax money again.
                  </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-trust-blue/30 transition-colors group">
                  <div className="h-12 w-12 rounded-lg bg-trust-blue/10 flex items-center justify-center text-trust-blue mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">2026 Tax Engine</h3>
                  <p className="text-slate-400 leading-relaxed">
                      Automatic calculation of PAYE, SHIF (2.75%), and Housing Levy. Stay perfectly compliant with the latest KRA regulations.
                  </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group">
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                      <Wallet size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">eTIMS Hub</h3>
                  <p className="text-slate-400 leading-relaxed">
                      Scan and validate receipts instantly. Ensure every business expense is tax-deductible with our integrated compliance checker.
                  </p>
              </div>
          </div>
       </div>
    </div>
  );
}
