"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-16 overflow-hidden">
      {/* Background Image — same rolling shutter image as Hero */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            'url("https://overheaddoor-production-assets.azureedge.net/assets/images/default-source/product-images/commercial/rolling-shutter/allura-shutter-653-powder-coat.jpg?sfvrsn=5eea7e43_1")',
        }}
      />
      {/* Gradient overlays — same as Hero */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-brand-primary/40" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-primary/80 via-transparent to-brand-primary/30" />
      {/* Subtle animated radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] z-[2] rounded-full bg-brand-accent/5 blur-[120px] animate-pulse" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 py-16">

        {/* Left — Branding text */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-lg">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 backdrop-blur-sm fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
            </span>
            <span className="text-xs font-bold tracking-wider text-brand-accent uppercase">
              Secure Admin Access
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight fade-up fade-up-delay-1">
            Admin{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent bg-clip-text text-transparent">
                Portal
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed fade-up fade-up-delay-2">
            Manage service requests, track jobs, and oversee operations for Najmat Raozan Technical Service.
          </p>

          <div className="flex items-center gap-3 text-sm font-semibold text-gray-300 fade-up fade-up-delay-3">
            <ShieldCheck className="w-5 h-5 text-brand-accent flex-shrink-0" />
            <span>Protected by secure authentication — authorized personnel only</span>
          </div>
        </div>

        {/* Right — Login card (same style as Hero card) */}
        <div className="w-full max-w-md fade-up fade-up-delay-2">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/20">
            {/* Gold top accent line */}
            <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent rounded-full" />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-brand-primary tracking-tight">
                Sign In
              </h2>
              <p className="text-sm text-brand-gray mt-1">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                  <span className="text-red-400">⚠</span>
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email-address" className="block text-sm font-semibold text-brand-primary mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-brand-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all bg-white"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-brand-primary mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-brand-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all bg-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-primary transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed shimmer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Secure Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
