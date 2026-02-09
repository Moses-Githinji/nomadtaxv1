import { Layers, Zap, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Layers size={24} />,
      title: "Connect Your Accounts",
      description: "Securely link your M-Pesa statements or bank feeds. We use read-only access to analyze income streams.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "hover:border-blue-400/30",
    },
    {
      icon: <Zap size={24} />,
      title: "Automate Allocations",
      description: "Set your Triple Tank rules. We automatically calculate what goes to Tax (MMF), Wealth, and Spend.",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "hover:border-amber-400/30",
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "File & Relax",
      description: "When tax season hits, generate a pre-filled return with one click. Pay directly via M-Pesa Paybill.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "hover:border-green-400/30",
    },
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-nomad-green font-medium tracking-wider text-sm uppercase">Workflow</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6">
            From Chaos to <span className="text-nomad-green">Clarity</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Stop managing taxes in spreadsheets. Let NomadTax handle the math while you focus on earning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent border-t border-dashed border-white/20 z-0" />

          {steps.map((step, index) => (
            <div key={index} className={`relative z-10 p-8 rounded-2xl bg-slate-900 border border-white/5 transition-all duration-300 ${step.border} group`}>
              <div className={`h-14 w-14 rounded-xl ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
