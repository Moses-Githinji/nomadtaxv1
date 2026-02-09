import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Abstract Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-nomad-green/20 rounded-full blur-[120px] -z-10 opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-trust-blue/10 rounded-full blur-[100px] -z-10 opacity-20" />

      <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-nomad-green text-xs font-medium tracking-wide mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nomad-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nomad-green"></span>
              </span>
              UPDATED FOR 2026 KRA FINANCE ACT
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Financial Fortress for <br />
              the <span className="text-white">Modern Nomad.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Automate your tax compliance, optimize your wealth allocation, and secure your financial future—all from one elegant dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                  onClick={() => navigate("/auth")}
                  className="group px-8 py-4 bg-nomad-green text-slate-950 font-bold text-lg rounded-full hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                  Launch Dashboard 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium text-lg rounded-full hover:bg-white/10 transition-colors">
                  View Demo
              </button>
          </div>
      </div>
    </div>
  );
}
