"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.push("/admin");
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-taupe/10 bg-white p-8 shadow-lift">
          <div className="flex flex-col items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brown text-ivory">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-serif text-2xl text-charcoal">Welcome back</h1>
            <p className="mt-1 text-sm text-taupe">Sign in to your admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-taupe">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sahkhush.com"
                  className="w-full rounded-xl border border-taupe/20 bg-ivory py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-taupe/50 focus:border-gold focus:ring-1 focus:ring-gold/30"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-taupe">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe/50" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-taupe/20 bg-ivory py-2.5 pl-10 pr-11 text-sm outline-none transition placeholder:text-taupe/50 focus:border-gold focus:ring-1 focus:ring-gold/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-brown"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brown px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-taupe/50">
          SAH-KHUSH Admin Panel
        </p>
      </div>
    </div>
  );
}
