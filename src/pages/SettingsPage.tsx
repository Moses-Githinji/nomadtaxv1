import { useState } from "react";
import { User, Bell, Shield, Wallet, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Wallet },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and NomadTax preferences.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        activeTab === tab.id
                            ? "bg-slate-800 text-white"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 min-h-[400px]">
            {activeTab === "profile" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Full Name</label>
                            <input type="text" defaultValue="Nomad User" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Email Address</label>
                            <input type="email" defaultValue="nomad@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">KRA PIN</label>
                            <input type="text" defaultValue="A001234567Z" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:border-nomad-green" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Tax Residency</label>
                            <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green">
                                <option>Kenya (Resident)</option>
                                <option>Kenya (Non-Resident)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "preferences" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">App Preferences</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Appearance</h3>
                                <p className="text-sm text-slate-400">Switch between light and dark mode</p>
                            </div>
                            <ModeToggle />
                        </div>
                        
                        <div className="flex items-center justify-between">
                             <div>
                                <h3 className="text-white font-medium">Default Currency</h3>
                                <p className="text-sm text-slate-400">Preferred currency for dashboards</p>
                            </div>
                            <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white">
                                <option>KES (Shilling)</option>
                                <option>USD (Dollar)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "notifications" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Notifications</h2>
                    <div className="space-y-4">
                         <div className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                            <input type="checkbox" id="email-alerts" defaultChecked className="mt-1" />
                            <div>
                                <label htmlFor="email-alerts" className="text-white font-medium block">Email Alerts</label>
                                <p className="text-sm text-slate-400">Receive weekly summaries and tax deadline reminders.</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                            <input type="checkbox" id="sms-alerts" className="mt-1" />
                            <div>
                                <label htmlFor="sms-alerts" className="text-white font-medium block">SMS Notifications</label>
                                <p className="text-sm text-slate-400">Get instant alerts for critical compliance updates (e.g. eTIMS failures).</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                            <input type="checkbox" id="promo-alerts" className="mt-1" />
                            <div>
                                <label htmlFor="promo-alerts" className="text-white font-medium block">Product Updates</label>
                                <p className="text-sm text-slate-400">Stay informed about new NomadTax features and tools.</p>
                            </div>
                         </div>
                    </div>
                </div>
            )}

            {activeTab === "security" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-4">Security</h2>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-white font-medium">Change Password</h3>
                            <div className="space-y-3">
                                <input type="password" placeholder="Current Password" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green" />
                                <input type="password" placeholder="New Password" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green" />
                                <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nomad-green" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-medium">Two-Factor Authentication (2FA)</h3>
                                    <p className="text-sm text-slate-400">Add an extra layer of security to your account.</p>
                                </div>
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
             
            {/* Save Button Placeholder for all tabs */}
             <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-nomad-green text-slate-950 font-bold rounded-lg hover:bg-emerald-500 transition-colors">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
