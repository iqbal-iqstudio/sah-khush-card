"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <div className="bg-charcoal text-ivory/70 text-center text-xs py-2 tracking-wide">
        Site Under Development — Some Features May Be Incomplete
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
