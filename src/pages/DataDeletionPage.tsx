import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

export function DataDeletionPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send a request to your backend
    // For now, we'll just show a success message
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider text-nomad-green">
              NOMAD<span className="text-trust-blue">TAX</span>
            </span>
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Data Deletion Instructions</h1>
        
        <div className="space-y-8 text-slate-300">
          <section>
            <p className="text-lg mb-6">
              We respect your right to have your data deleted. This page explains how to request deletion of your NomadTax account and associated data.
            </p>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
            <div className="flex gap-3">
              <AlertCircle className="text-amber-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-amber-500 font-semibold mb-2">Important Notice</h3>
                <p className="text-sm text-slate-300">
                  Deleting your account is permanent and cannot be undone. All your data, including transaction history, tax records, and settings will be permanently deleted. Some data may need to be retained for legal compliance (tax records are kept for 7 years as per Kenyan law).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Will Be Deleted</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Your account information (name, email, profile)</li>
              <li>Transaction records</li>
              <li>Tank balances and allocations</li>
              <li>eTIMS invoice data</li>
              <li>User preferences and settings</li>
              <li>OAuth connection data (Google/Facebook)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What May Be Retained</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Tax records (retained for 7 years as required by Kenyan tax law)</li>
              <li>Audit logs (retained for security and compliance)</li>
              <li>Aggregated, anonymized analytics data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How to Request Deletion</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-3">Option 1: Through Your Account</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Log in to your NomadTax account</li>
                  <li>Go to Settings → Account Settings</li>
                  <li>Scroll to the bottom and click "Delete Account"</li>
                  <li>Confirm your decision</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-3">Option 2: Email Request</h3>
                <p className="mb-4">
                  If you cannot access your account, send an email to{" "}
                  <a href="mailto:privacy@nomadtax.co.ke" className="text-nomad-green hover:underline">
                    privacy@nomadtax.co.ke
                  </a>{" "}
                  with the subject "Data Deletion Request" and include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Your full name</li>
                  <li>Email address associated with your account</li>
                  <li>Reason for deletion (optional)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-3">Option 3: Quick Request Form</h3>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Account Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 rounded-lg py-2.5 px-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
                        required
                      />
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                      We will send a confirmation email to this address before processing your deletion request.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                    >
                      Request Account Deletion
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 text-green-500">
                      <Check size={24} />
                      <div>
                        <h4 className="font-semibold">Request Submitted</h4>
                        <p className="text-sm text-slate-300 mt-1">
                          We've sent a confirmation email to <strong>{email}</strong>. Please check your inbox and follow the instructions to complete your deletion request.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Timeline</h2>
            <p className="mb-4">
              Once we receive your deletion request:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Within 24 hours:</strong> We'll send a confirmation email</li>
              <li><strong>Within 7 days:</strong> Your account will be deactivated</li>
              <li><strong>Within 30 days:</strong> All deletable data will be permanently removed</li>
              <li><strong>After 30 days:</strong> You'll receive final confirmation of deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Facebook & Google Data</h2>
            <p className="mb-4">
              If you signed up using Facebook or Google:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Deleting your NomadTax account will disconnect the OAuth connection</li>
              <li>This does NOT delete your Facebook or Google account</li>
              <li>You can also revoke NomadTax's access through your Facebook/Google account settings</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-slate-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Questions?</h2>
            <p className="mb-4">
              If you have questions about data deletion, please review our{" "}
              <a href="/privacy" className="text-nomad-green hover:underline">
                Privacy Policy
              </a>{" "}
              or contact us at{" "}
              <a href="mailto:privacy@nomadtax.co.ke" className="text-nomad-green hover:underline">
                privacy@nomadtax.co.ke
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-slate-500">
          <p>&copy; 2026 NomadTax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
