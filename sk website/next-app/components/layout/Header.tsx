"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag, User, LogIn, X } from "lucide-react";
import { useCartStore, selectCount } from "@/store/cart-store";

const NAV = [
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Brands", href: "/products" },
  { label: "Sale", href: "/products?sort=price-asc" },
];

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  const count = useCartStore(selectCount);
  const openCart = useCartStore((s) => s.openCart);
  const wishlist = useCartStore((s) => s.wishlist.length);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
    setScrolled(y > 20);
  });

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          transparent
            ? "border-transparent bg-transparent"
            : "border-b border-taupe/15 bg-ivory/90 backdrop-blur-md shadow-soft"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35 }}
      >
        <div className="container-shell flex items-center justify-between h-16">
          <div className={`flex-1 flex items-center gap-4 ${transparent ? "text-ivory" : "text-charcoal"}`}>
            <button className="md:hidden transition hover:text-gold" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu className="h-6 w-6" />
            </button>
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              {NAV.map((n) => (
                <Link key={n.label} href={n.href} className={`link-underline transition ${transparent ? "text-ivory/90 hover:text-gold" : "text-charcoal/80 hover:text-brown"}`}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className={`font-serif text-2xl tracking-[0.22em] transition ${transparent ? "text-ivory hover:text-gold" : "text-brown hover:text-brown-deep"}`}>
            SAH-KHUSH
          </Link>

          <div className={`flex-1 flex items-center justify-end gap-5 ${transparent ? "text-ivory" : "text-charcoal"}`}>
            <button aria-label="Search" className="hover:text-gold">
              <Search className="h-5 w-5" />
            </button>
            {/* Desktop-only: wishlist + account */}
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden hover:text-gold md:inline-flex">
              <Heart className="h-5 w-5" />
              {mounted && wishlist > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[10px] h-4 w-4 rounded-full grid place-items-center">
                  {wishlist}
                </span>
              )}
            </Link>
            <Link href="/login" aria-label="Account" className="hidden hover:text-gold md:inline-flex">
              <User className="h-5 w-5" />
            </Link>
            <button aria-label="Cart" onClick={openCart} className="relative hover:text-gold">
              <ShoppingBag className="h-5 w-5" />
              {mounted && count > 0 && (
                <span className="absolute -top-2 -right-2 bg-brown text-ivory text-[10px] h-4 w-4 rounded-full grid place-items-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMenuOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-ivory shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
              <span className="font-serif text-xl tracking-[0.18em] text-brown">SAH-KHUSH</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-taupe/20 transition hover:border-brown hover:text-brown">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 py-5">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-taupe/10 py-3.5 text-lg font-medium text-charcoal transition hover:text-brown"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="px-6">
              <p className="eyebrow mb-3">Shop by Fabric</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Lawn", href: "/products?fabric=Lawn" },
                  { label: "Chiffon", href: "/products?fabric=Chiffon" },
                  { label: "Silk", href: "/products?fabric=Silk" },
                ].map((f) => (
                  <Link
                    key={f.label}
                    href={f.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-taupe/30 px-4 py-1.5 text-sm text-charcoal transition hover:border-brown hover:bg-brown hover:text-ivory"
                  >
                    {f.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mx-6 mb-2 mt-auto flex items-center justify-between rounded-2xl border border-taupe/20 bg-alabaster px-4 py-3 text-charcoal transition hover:border-brown hover:text-brown"
            >
              <span className="inline-flex items-center gap-2 font-medium"><LogIn className="h-5 w-5" /> Login / My Account</span>
              <span className="text-xs text-taupe">→</span>
            </Link>
            <div className="flex items-center justify-between border-t border-taupe/15 px-6 py-4 text-sm">
              <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 text-charcoal hover:text-brown"><Heart className="h-5 w-5" /> Wishlist</Link>
              <Link href="/cart" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 text-charcoal hover:text-brown"><ShoppingBag className="h-5 w-5" /> Bag</Link>
            </div>
          </motion.aside>
        </div>
      )}
    </>
  );
}
