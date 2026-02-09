import { useNavigate } from "react-router-dom";


export function LandingNavbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-2xl font-bold tracking-wider text-nomad-green">NOMAD<span className="text-trust-blue">TAX</span></span>
        </div>
        <div className="flex items-center gap-6">

           <button 
              onClick={() => navigate("/auth")}
              className="hidden md:block px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
           >
              Log In
           </button>
           <button 
              onClick={() => navigate("/auth")}
              className="px-5 py-2 text-sm font-bold bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors"
           >
              Get Started
           </button>
        </div>
      </div>
    </nav>
  );
}
