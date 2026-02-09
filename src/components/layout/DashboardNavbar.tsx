import { Bell, Search, Plus, Command, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLocation } from "react-router-dom";

export function DashboardNavbar() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(3); // Mock notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Get breadcrumb from current route
  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 1) return 'Dashboard';
    if (segments[1] === 'tax') return 'Tax Engine';
    if (segments[1] === 'transactions') return 'Transactions';
    if (segments[1] === 'etims') return 'eTIMS Hub';
    if (segments[1] === 'settings') return 'Settings';
    
    return 'Dashboard';
  };

  const getUserName = () => {
    if (!user) return "User";
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           "User";
  };

  const getUserInitials = () => {
    const name = getUserName();
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Breadcrumb & Search */}
          <div className="flex items-center gap-6 flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Dashboard</span>
              {getBreadcrumb() !== 'Dashboard' && (
                <>
                  <span className="text-slate-600">/</span>
                  <span className="text-white font-medium">{getBreadcrumb()}</span>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-nomad-green transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions, invoices..."
                  className="w-full bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-slate-500 bg-slate-800 rounded border border-slate-700">
                  <Command size={10} className="inline mr-1" />K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Section: Actions & User */}
          <div className="flex items-center gap-4">
            {/* Quick Action Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-nomad-green hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-nomad-green/20 hover:shadow-nomad-green/30">
              <Plus size={18} />
              <span>New Transaction</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-slate-800">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors">
                      <p className="text-sm text-white font-medium">Tax Payment Due Soon</p>
                      <p className="text-xs text-slate-400 mt-1">Q4 2024 payment due in 7 days</p>
                      <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
                    </div>
                    <div className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors">
                      <p className="text-sm text-white font-medium">New eTIMS Receipt</p>
                      <p className="text-xs text-slate-400 mt-1">Receipt #INV-2024-001 processed</p>
                      <p className="text-xs text-slate-500 mt-2">5 hours ago</p>
                    </div>
                    <div className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors">
                      <p className="text-sm text-white font-medium">Tank Rebalance Complete</p>
                      <p className="text-xs text-slate-400 mt-1">Wealth tank updated with KES 150,000</p>
                      <p className="text-xs text-slate-500 mt-2">1 day ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-slate-800 text-center">
                    <button className="text-sm text-nomad-green hover:text-emerald-400 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={getUserName()}
                    className="w-8 h-8 rounded-full ring-2 ring-slate-800"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nomad-green to-trust-blue flex items-center justify-center text-white font-bold text-xs">
                    {getUserInitials()}
                  </div>
                )}
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-slate-800">
                    <p className="text-sm font-semibold text-white">{getUserName()}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <a href="/dashboard/settings" className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                      Account Settings
                    </a>
                    <a href="/dashboard/billing" className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                      Billing & Plans
                    </a>
                    <a href="/help" className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                      Help & Support
                    </a>
                  </div>
                  <div className="p-2 border-t border-slate-800">
                    <button 
                      onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.href = '/';
                      }}
                      className="w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
