"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brown p-4">
      <div className="w-full max-w-md rounded-[2rem] border border-taupe/10 bg-white p-8 shadow-lift">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="SAH-KHUSH" className="h-20 w-auto" />
        </div>
        <h1 className="mt-2 text-center font-serif text-3xl text-charcoal">Admin Panel</h1>
        <p className="mt-1 text-center text-sm text-taupe">Sign in to manage your store</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-taupe">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sahkhush.com"
              className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-1 focus:ring-brown"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-taupe">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 pr-11 text-sm outline-none transition focus:border-brown focus:ring-1 focus:ring-brown"
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
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-brown px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-taupe">
          Default: admin@sahkhush.com / admin123
        </p>
      </div>
    </div>
  );
}
