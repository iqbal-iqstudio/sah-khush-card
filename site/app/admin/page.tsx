"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAdminStore } from "@/store/admin-store";
import { StatCard } from "@/components/admin/AdminCards";
import { Package, MessageSquare, Mail, Users, ArrowRight, Sparkles } from "lucide-react";

export default function AdminDashboard() {
  const products = useAdminStore((s) => s.products);
  const messages = useAdminStore((s) => s.messages);
  const subscribers = useAdminStore((s) => s.subscribers);
  const user = useAdminStore((s) => s.user);
  const initProducts = useAdminStore((s) => s.initProducts);

  useEffect(() => { initProducts(); }, [initProducts]);

  const unreadMessages = messages.filter((m) => !m.read).length;
  const activeSubscribers = subscribers.filter((s) => s.active).length;
  const uniqueBrands = [...new Set(products.map((p) => p.brand))].length;

  const stats = [
    { label: "Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600" },
    { label: "Messages", value: unreadMessages > 0 ? `${unreadMessages} new` : messages.length, icon: MessageSquare, color: "bg-rose-50 text-rose-600", subtitle: unreadMessages > 0 ? `${unreadMessages} unread` : undefined },
    { label: "Subscribers", value: activeSubscribers, icon: Mail, color: "bg-purple-50 text-purple-600" },
    { label: "Brands", value: uniqueBrands, icon: Users, color: "bg-amber-50 text-amber-600" },
  ];

  const recentMessages = messages.filter((m) => !m.read).slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brown to-brown-deep p-6 text-ivory sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-ivory/60">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Dashboard</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl">
            {greeting}, {user?.name || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-ivory/60">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10" />
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gold/5" />
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Manage Products", href: "/admin/products", desc: "Add, edit, or remove products" },
          { label: "Home Slider", href: "/admin/slider", desc: "Update homepage slides" },
          { label: "Store Settings", href: "/admin/settings", desc: "Configure your store" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between rounded-2xl border border-taupe/10 bg-white p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-charcoal">{link.label}</p>
              <p className="text-xs text-taupe">{link.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-taupe transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-charcoal">Unread Messages</h3>
          {unreadMessages > 0 && (
            <Link href="/admin/messages" className="text-xs font-medium text-gold hover:underline">
              View all ({unreadMessages})
            </Link>
          )}
        </div>
        {recentMessages.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-taupe/5 text-taupe/30">
              <MessageSquare className="h-6 w-6" />
            </div>
            <p className="mt-3 text-sm text-taupe">No unread messages</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 rounded-xl border border-taupe/10 p-3 transition hover:border-gold/20"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {msg.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-charcoal truncate">{msg.name}</p>
                    <p className="shrink-0 text-xs text-taupe">{new Date(msg.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-taupe truncate">{msg.subject}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-charcoal/60">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
