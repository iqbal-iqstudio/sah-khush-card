"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Home Slider", href: "/admin/slider", icon: Images },
  { label: "Brands", href: "/admin/brands", icon: Store },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAdminStore((s) => s.user);
  const logout = useAdminStore((s) => s.logout);
  const initProducts = useAdminStore((s) => s.initProducts);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initProducts();
  }, [initProducts]);

  useEffect(() => {
    if (mounted && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [mounted, user, pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Wait for client mount before checking auth
  if (!mounted) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ivory">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-taupe border-t-transparent" />
    </div>;
  }

  // Not logged in — render bare children (login page)
  if (pathname === "/admin/login" || !user) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-ivory font-inter">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-brown text-ivory transition-transform duration-300 md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-ivory/15 px-6 py-5">
          <Link href="/admin" className="flex items-center">
            <img src="/logo.svg" alt="SAH-KHUSH" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:text-gold md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold text-brown"
                    : "text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-ivory/15 px-3 py-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory/70 transition hover:bg-ivory/10 hover:text-ivory"
          >
            <Store className="h-5 w-5" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory/70 transition hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-taupe/15 bg-white px-6 py-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-taupe/20 transition hover:border-brown hover:text-brown md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-charcoal">
              {NAV.find((n) =>
                n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
              )?.label || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-taupe">
            <span className="hidden sm:inline">{user.email}</span>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gold text-sm font-bold text-brown">
              {user.name[0]}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
