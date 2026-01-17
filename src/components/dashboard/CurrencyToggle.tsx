import { ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyToggleProps {
  currency: "KES" | "USD";
  onToggle: () => void;
}

export function CurrencyToggle({ currency, onToggle }: CurrencyToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors group"
      title={`Switch to ${currency === "KES" ? "USD" : "KES"}`}
    >
      <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
          currency === "KES" ? "bg-nomad-green text-slate-950" : "bg-slate-600 text-slate-300"
      )}>
        K
      </div>
      <ArrowRightLeft size={14} className="text-slate-400 group-hover:text-white transition-colors" />
      <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
          currency === "USD" ? "bg-trust-blue text-white" : "bg-slate-600 text-slate-300"
      )}>
        $
      </div>
    </button>
  );
}
