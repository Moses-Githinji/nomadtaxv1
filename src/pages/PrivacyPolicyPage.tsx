export function PrivacyPolicyPage() {
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
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-slate-300">
          <section>
            <p className="text-slate-400 mb-6">
              <strong>Last Updated:</strong> January 17, 2026
            </p>
            <p className="mb-4">
              NomadTax ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-medium text-white mb-3">1.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Account information (name, email address)</li>
              <li>Profile information (business name, KRA PIN)</li>
              <li>Transaction data (income, expenses, invoices)</li>
              <li>Tax-related information</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-3">1.2 Information from OAuth Providers</h3>
            <p className="mb-2">When you sign in using Google or Facebook, we collect:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Your name</li>
              <li>Email address</li>
              <li>Profile picture</li>
              <li>OAuth provider ID</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our tax management services</li>
              <li>To calculate tax obligations and generate reports</li>
              <li>To send important notifications about tax deadlines</li>
              <li>To improve our services and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard encryption. We use Supabase (a secure, SOC 2 compliant platform) to store your information. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations (e.g., tax authorities)</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide services. Tax-related data may be retained for longer periods as required by Kenyan tax law (typically 5-7 years).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain your session and preferences. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Supabase:</strong> Authentication and database services</li>
              <li><strong>Google OAuth:</strong> Sign-in authentication</li>
              <li><strong>Facebook Login:</strong> Sign-in authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not intended for users under 18 years of age. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <p><strong>Email:</strong> privacy@nomadtax.co.ke</p>
              <p><strong>Address:</strong> Nairobi, Kenya</p>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Deletion</h2>
            <p className="mb-4">
              To request deletion of your data, please visit our{" "}
              <a href="/data-deletion" className="text-nomad-green hover:underline">
                Data Deletion Instructions
              </a>{" "}
              page.
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
