"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import { useCartStore, selectCount } from "@/store/cart-store";
import { useAdminStore } from "@/store/admin-store";
import { formatBDT } from "@/lib/utils";

const NAV = [
  { label: "All Products", href: "/products" },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Sales", href: "/products?sale=1" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const products = useAdminStore((s) => s.products);
  const initProducts = useAdminStore((s) => s.initProducts);

  useEffect(() => { initProducts(); }, [initProducts]);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  const count = useCartStore(selectCount);
  const openCart = useCartStore((s) => s.openCart);
  const wishlist = useCartStore((s) => s.wishlist.length);

  const results = query.trim().length >= 2
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

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
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-gold">
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

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-2xl mt-20 rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-taupe/15 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-taupe" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) { setSearchOpen(false); router.push(`/products?search=${encodeURIComponent(query.trim())}`); } if (e.key === "Escape") setSearchOpen(false); }}
                placeholder="Search products, fabrics, brands..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-taupe/60"
              />
              <button onClick={() => setSearchOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-taupe transition hover:bg-taupe/10 hover:text-charcoal">
                <X className="h-4 w-4" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setSearchOpen(false); router.push(`/products/${p.slug}`); }}
                    className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-ivory"
                  >
                    <img src={p.image} alt={p.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-taupe">{p.brand} · {p.fabric}</p>
                      <p className="text-sm font-medium text-charcoal truncate">{p.name}</p>
                      <p className="text-sm font-semibold text-brown">{formatBDT(p.price)}</p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => { setSearchOpen(false); router.push(`/products?search=${encodeURIComponent(query.trim())}`); }}
                  className="w-full rounded-xl bg-ivory py-2.5 text-center text-sm font-medium text-brown transition hover:bg-alabaster mt-1"
                >
                  View all results for &ldquo;{query}&rdquo;
                </button>
              </div>
            )}
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-taupe">No products found for &ldquo;{query}&rdquo;</p>
                <button onClick={() => { setSearchOpen(false); router.push("/products"); }} className="mt-2 text-sm font-medium text-brown link-underline">Browse all products</button>
              </div>
            )}
            {query.trim().length < 2 && (
              <div className="p-5">
                <p className="text-xs font-semibold text-taupe uppercase tracking-wider mb-3">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {["Lawn", "Chiffon", "Silk", "Charizma", "Bin Hameed", "Firdous"].map((tag) => (
                    <button key={tag} onClick={() => { setQuery(tag); }} className="rounded-full border border-taupe/20 px-3 py-1.5 text-xs font-medium text-charcoal transition hover:border-brown hover:text-brown">{tag}</button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

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
