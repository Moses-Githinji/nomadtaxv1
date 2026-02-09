import { LayoutDashboard, PieChart, Wallet, ClipboardList, Settings, LogOut, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: PieChart, label: "Tax Engine", href: "/dashboard/tax" },
    { icon: Wallet, label: "Transactions", href: "/dashboard/transactions" },
    { icon: ClipboardList, label: "eTIMS", href: "/dashboard/etims" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  // Get user display name
  const getUserName = () => {
    if (!user) return "User";
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           "User";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = getUserName();
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  };

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
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 text-white",
          isOpen ? "w-64" : "w-20",
          "lg:translate-x-0",
          !isOpen && "max-lg:-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Collapse Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
             {isOpen ? (
                <span className="text-xl font-bold tracking-wider text-nomad-green">NOMAD<span className="text-trust-blue">TAX</span></span>
             ) : (
                <span className="text-xl font-bold text-nomad-green mx-auto">N</span>
             )}
             
             {/* Desktop Collapse Toggle */}
             <button
               onClick={() => setIsOpen(!isOpen)}
               className="hidden lg:flex p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
               title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
             >
               {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
             </button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className={cn(
              "p-4 border-b border-slate-800",
              !isOpen && "lg:px-2"
            )}>
              <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={getUserName()}
                        className="w-10 h-10 rounded-full ring-2 ring-nomad-green/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-nomad-green to-trust-blue flex items-center justify-center text-white font-bold text-sm">
                        {getUserInitials()}
                      </div>
                    )}
                  </div>
                
                {/* User Info */}
                {isOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {getUserName()}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group",
                  !isOpen && "justify-center px-0"
                )}
                title={!isOpen ? item.label : ""}
              >
                <item.icon size={20} className="shrink-0 group-hover:text-nomad-green" />
                <span className={cn("font-medium", !isOpen && "lg:hidden")}>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-800 space-y-2">
             <button 
               onClick={handleLogout}
               className={cn(
                 "flex items-center gap-3 px-3 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors",
                 !isOpen && "justify-center px-0"
               )}
               title={!isOpen ? "Logout" : ""}
             >
                <LogOut size={20} className="shrink-0" />
                <span className={cn("font-medium", !isOpen && "lg:hidden")}>Logout</span>
             </button>
          </div>
        </div>
      </aside>
    </>
  );
}
