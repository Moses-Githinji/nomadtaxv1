export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-2xl font-bold tracking-wider text-slate-700">NOMAD<span className="text-slate-600">TAX</span></span>
            <div className="flex items-center gap-8 text-slate-500 text-sm">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-white cursor-pointer transition-colors">KRA Compliance</span>
            </div>
            <p className="text-slate-600 text-sm">© 2026 NomadTax Inc.</p>
        </div>
    </footer>
  );
}
