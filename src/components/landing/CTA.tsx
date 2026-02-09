import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-nomad-green/10" />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-nomad-green/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-trust-blue/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Ready to Automate Your Financial Freedom?
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join thousands of Kenyan freelancers who have stopped worrying about KRA and started building wealth.
        </p>
        <button 
           onClick={() => navigate("/auth")}
           className="px-8 py-4 bg-white text-slate-950 font-bold text-lg rounded-full hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
        >
           Start Your Free Trial
           <ArrowRight size={20} />
        </button>
        <p className="mt-6 text-sm text-slate-500">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
