import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-nomad-green/30">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 w-full lg:pl-64 transition-all duration-300">
          <div className="container mx-auto p-4 lg:p-8 max-w-7xl animate-in fade-in zoom-in-95 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
