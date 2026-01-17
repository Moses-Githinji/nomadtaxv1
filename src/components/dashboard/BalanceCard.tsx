import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  currency: "KES" | "USD";
  exchangeRate: number; // KES per USD
  icon: LucideIcon;
  variant: "spendable" | "growth" | "wealth";
  className?: string;
  subtitle?: string;
}

export function BalanceCard({ title, amount, currency, exchangeRate, icon: Icon, variant, className, subtitle }: BalanceCardProps) {
  // Calculate displayed amount
  const displayedAmount = currency === "KES" ? amount : amount / exchangeRate;
  
  // Format currency
  const formattedAmount = new Intl.NumberFormat(currency === "KES" ? "en-KE" : "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayedAmount);

  const variantStyles = {
    spendable: "from-slate-800 to-slate-900 border-slate-700 text-white",
    growth: "from-emerald-900/40 to-slate-900 border-nomad-green/30 text-nomad-green",
    wealth: "from-blue-900/40 to-slate-900 border-trust-blue/30 text-trust-blue",
  };

  const iconStyles = {
    spendable: "bg-slate-800 text-slate-300",
    growth: "bg-nomad-green/20 text-nomad-green",
    wealth: "bg-trust-blue/20 text-trust-blue",
  };

  return (
    <div className={cn(
        "relative overflow-hidden rounded-xl p-6 border bg-gradient-to-br shadow-xl transition-all duration-300 hover:scale-[1.02]", 
        variantStyles[variant],
        className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest">{title}</h3>
           {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
            <Icon size={20} />
        </div>
      </div>
      
      <div className="space-y-1">
          <div className="text-3xl font-bold tracking-tight">
             {formattedAmount}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
             <span className={cn(
                 "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase",
                 currency === "KES" ? "bg-slate-800 text-slate-400" : "bg-trust-blue/20 text-trust-blue"
             )}>
                {currency}
             </span>
             {currency === "USD" && <span>≈ KES {new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", notation: "compact" }).format(amount)}</span>}
          </div>
      </div>

      {/* Background Decorative Glow */}
      <div className={cn(
          "absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none",
          variant === "spendable" && "bg-slate-500",
          variant === "growth" && "bg-nomad-green",
          variant === "wealth" && "bg-trust-blue"
      )} />
    </div>
  );
}
