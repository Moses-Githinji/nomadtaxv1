import { useState, useEffect } from "react";
import { Clock } from "lucide-react";


export function TaxCountdown() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Target: April 20th
      let targetDate = new Date(currentYear, 3, 20); // Month is 0-indexed, 3 = April

      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 3, 20);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center gap-4 group hover:border-trust-blue/50 transition-colors">
      <div className="flex items-center gap-2 text-trust-blue mb-2">
        <Clock size={20} className="animate-pulse" />
        <span className="text-sm font-semibold uppercase tracking-wider">Next Installment</span>
      </div>
      
      <div className="text-center z-10">
         <div className="flex items-baseline justify-center gap-1">
             <span className="text-4xl font-bold text-white tabular-nums">{timeLeft.days}</span>
             <span className="text-sm text-slate-400">days</span>
         </div>
         <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">April 20th Deadline</p>
      </div>

       {/* Decorative */}
       <div className="absolute top-0 right-0 w-24 h-24 bg-trust-blue/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
    </div>
  );
}
