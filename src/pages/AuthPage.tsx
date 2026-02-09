import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Facebook } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
          },
        });
        if (error) throw error;
        // Optionally handle check email message
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden selection:bg-nomad-green/30">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nomad-green/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-trust-blue/10 rounded-full blur-[100px] -z-10" />

      {/* Navbar */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wider text-nomad-green">NOMAD<span className="text-trust-blue">TAX</span></span>
            </Link>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400 hidden sm:inline">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm font-medium text-white hover:text-nomad-green transition-colors"
                >
                    {isLogin ? "Sign up" : "Log in"}
                </button>
                <div className="w-px h-4 bg-white/10 mx-2" />

            </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-slate-400">
                    {isLogin 
                        ? "Enter your credentials to access your dashboard." 
                        : "Start automating your tax compliance today."}
                </p>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">{error}</div>}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                            <div className="relative group">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-nomad-green transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
                                    required={!isLogin}
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                        <div className="relative group">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-nomad-green transition-colors" />
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <div className="relative group">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-nomad-green transition-colors" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-nomad-green focus:ring-1 focus:ring-nomad-green transition-all"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-nomad-green hover:underline">Forgot password?</a>
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full py-3 px-4 bg-nomad-green hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-900 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </button>
                            <button 
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 rounded-lg transition-colors text-white font-medium"
                            >
                                <Facebook size={20} className="text-[#1877F2]" />
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
