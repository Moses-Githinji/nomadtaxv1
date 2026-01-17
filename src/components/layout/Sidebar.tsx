import { LayoutDashboard, PieChart, Wallet, ClipboardList, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: PieChart, label: "Tax Engine", href: "/tax" },
    { icon: Wallet, label: "Transactions", href: "/transactions" },
    { icon: ClipboardList, label: "eTIMS", href: "/etims" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-nomad-dark text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out bg-slate-900 border-r border-slate-800 dark:bg-nomad-dark dark:border-slate-800 text-white",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-slate-800">
             {isOpen ? (
                <span className="text-xl font-bold tracking-wider text-nomad-green">NOMAD<span className="text-trust-blue">TAX</span></span>
             ) : (
                <span className="text-xl font-bold text-nomad-green">N</span>
             )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group"
              >
                <item.icon size={20} className="group-hover:text-nomad-green" />
                <span className={cn("font-medium", !isOpen && "lg:hidden")}>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-800 space-y-2">
             <div className="flex items-center justify-center w-full">
                <ModeToggle />
             </div>
             
             <button className="flex items-center gap-3 px-3 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors">
                <LogOut size={20} />
                <span className={cn("font-medium", !isOpen && "lg:hidden")}>Logout</span>
             </button>
          </div>
        </div>
      </aside>
    </>
  );
}
