export function Pricing() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-slate-300">Starter</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-bold tracking-tight">Free</span>
                <span className="ml-2 text-xl text-slate-500">/forever</span>
              </div>
              <p className="mt-4 text-slate-400">Perfect for tracking income and manual calculations.</p>
            </div>
            <ul className="mb-8 space-y-4 flex-1">
              {["Manual Income Tracking", "Basic Tax Calculator", "1 User Profile"].map((feat) => (
                <li key={feat} className="flex items-center text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-slate-500 mr-3" />
                  {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
              Start for Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-nomad-green/20 to-slate-900 border border-nomad-green/30 flex flex-col shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
            <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 bg-nomad-green text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transform rotate-3">
              Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-nomad-green">Nomad Pro</h3>
              <div className="mt-4 flex items-baseline text-white">
                <span className="text-5xl font-bold tracking-tight">KES 1,000</span>
                <span className="ml-2 text-xl text-slate-500">/month</span>
              </div>
              <p className="mt-4 text-slate-400">Automate everything. From MMF allocations to KRA returns.</p>
            </div>
            <ul className="mb-8 space-y-4 flex-1">
              {[
                "Everything in Free",
                "Auto-Calculate Tax & NSSF/NHIF",
                "Triple Tank Visualizer",
                "eTIMS Receipt Scanner",
                "Priority Support",
              ].map((feat) => (
                <li key={feat} className="flex items-center text-white">
                  <span className="h-2 w-2 rounded-full bg-nomad-green mr-3" />
                  {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-nomad-green text-slate-900 font-bold hover:bg-emerald-400 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
