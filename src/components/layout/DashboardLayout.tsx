import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area - adjusts based on sidebar state */}
      <div 
        className={cn(
          "transition-all duration-300 min-h-screen",
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        )}
      >
        <DashboardNavbar />
        
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
