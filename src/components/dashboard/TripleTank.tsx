import { useState } from "react";
import { Wallet, TrendingUp, Landmark } from "lucide-react";
import { BalanceCard } from "./BalanceCard";
import { CurrencyToggle } from "./CurrencyToggle";

interface TripleTankProps {
  balances: {
    spendable: number;
    growth: number;
    wealth: number;
  };
}

export function TripleTank({ balances }: TripleTankProps) {
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const exchangeRate = 132.50; // Mock rate logic for now

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Net Worth Overview</h2>
        <CurrencyToggle currency={currency} onToggle={() => setCurrency(c => c === "KES" ? "USD" : "KES")} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard
            title="Spendable"
            subtitle="M-Pesa / Cash"
            amount={balances.spendable}
            currency={currency}
            exchangeRate={exchangeRate}
            icon={Wallet}
            variant="spendable"
        />
        <BalanceCard
            title="Tax-in-Growth"
            subtitle="MMF (Includes Tax Reserve)"
            amount={balances.growth}
            currency={currency}
            exchangeRate={exchangeRate}
            icon={TrendingUp}
            variant="growth"
        />
        <BalanceCard
            title="Fortress Wealth"
            subtitle="Bonds / Sacco / Offshore"
            amount={balances.wealth}
            currency={currency}
            exchangeRate={exchangeRate}
            icon={Landmark}
            variant="wealth"
        />
      </div>
    </div>
  );
}
