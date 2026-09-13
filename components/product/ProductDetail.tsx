"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Heart, Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { products } from "@/data/mock-products";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";

function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-alabaster">
        <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {p.badge && <span className="absolute left-3 top-3 rounded-full bg-brown px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">{p.badge}</span>}
      </div>
      <p className="mt-2 text-xs text-taupe">{p.brand}</p>
      <p className="text-sm font-medium text-charcoal line-clamp-1 group-hover:text-brown transition">{p.name}</p>
      <p className="mt-1 text-sm font-semibold text-brown">{formatBDT(p.price)}</p>
    </Link>
  );
}

function getRecentlyViewed(currentId: string): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const ids: string[] = JSON.parse(localStorage.getItem("recently-viewed") || "[]");
    return ids.filter((id) => id !== currentId).slice(0, 4).map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  } catch { return []; }
}

function addRecentlyViewed(id: string) {
  if (typeof window === "undefined") return;
  try {
    const ids: string[] = JSON.parse(localStorage.getItem("recently-viewed") || "[]");
    const updated = [id, ...ids.filter((i) => i !== id)].slice(0, 10);
    localStorage.setItem("recently-viewed", JSON.stringify(updated));
  } catch {}
}

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const mainImage = product.colors.find((c) => c.name === color)?.image ?? product.image;

  useEffect(() => {
    addRecentlyViewed(product.id);
    setRecentlyViewed(getRecentlyViewed(product.id));
  }, [product.id]);

  const handleAdd = () => addItem(product, { color, qty });
  const handleBuyNow = () => {
    addItem(product, { color, qty });
    router.push("/checkout");
  };

  const related = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.fabric === product.fabric))
    .slice(0, 4);

  const accordion = [
    { title: "Description", content: product.description },
    { title: "Shipping & COD Info", content: "Inside Dhaka: ৳70 (24–48 hours). Outside Dhaka: ৳130 (3–5 days). Advance payment of delivery charge via bKash/Nagad required to confirm order. Remaining balance via Cash on Delivery." },
    { title: "Authenticity Guarantee", content: <><a href="#" className="text-brown link-underline">Download certificate of authenticity</a> — every piece is 100% original, sourced directly from the brand.</> },
    { title: "Return Policy", content: "Strict No Change of Mind policy. Returns only accepted for massive manufacturing defects with continuous unboxing video proof reported same-day. See Terms & Conditions for full details." },
  ];

  return (
    <div className="container-shell py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-[2rem] bg-alabaster shadow-soft" onClick={() => setZoom(mainImage)}>
            <Image src={mainImage} alt={product.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" priority />
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
            {product.gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${activeImg === i ? "border-brown ring-2 ring-gold/40" : "border-transparent hover:border-taupe/40"}`}>
                <Image src={g} alt="" width={64} height={80} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Details */}
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{product.brand} · <a href={`/products?fabric=${product.fabric}`} className="link-underline">{product.fabric}</a></p>
          <h1 className="font-serif text-3xl sm:text-4xl mt-1">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-taupe">
            <span className="flex items-center gap-1 text-gold">{"★".repeat(Math.round(product.rating))}</span>
            <span>{product.sold} sold</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold">{formatBDT(product.price)}</span>
            {product.compareAtPrice && <span className="text-lg text-taupe line-through">{formatBDT(product.compareAtPrice)}</span>}
          </div>
          <div className="mt-3">
            {product.availability === "preorder" ? <Badge tone="gold">⏳ Pre-Order · Only {product.stockSlots} slots remaining</Badge> : <Badge tone="brown">🏬 Ready Stock</Badge>}
          </div>

          {/* Color variants */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Color: {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name}
                    className={`h-9 w-9 rounded-full border-2 ${color === c.name ? "border-brown" : "border-taupe/30"}`}
                    style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            </div>
          )}

          {/* Qty + actions */}
          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-taupe/30">
              <button className="h-10 w-10" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4 mx-auto" /></button>
              <span className="px-3 text-sm">{qty}</span>
              <button className="h-10 w-10" onClick={() => setQty((q) => q + 1)}><Plus className="h-4 w-4 mx-auto" /></button>
            </div>
            <button onClick={() => toggleWishlist(product.id)} className="grid h-10 w-10 place-items-center rounded-full border border-taupe/30 hover:border-brown hover:text-brown"><Heart className="h-5 w-5" /></button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-taupe">
            <div className="rounded-xl bg-alabaster p-3"><Truck className="mx-auto mb-1 h-5 w-5 text-brown" />Bangladesh-Wide Delivery</div>
            <div className="rounded-xl bg-alabaster p-3"><ShieldCheck className="mx-auto mb-1 h-5 w-5 text-brown" />100% Original</div>
            <div className="rounded-xl bg-alabaster p-3"><BadgeCheck className="mx-auto mb-1 h-5 w-5 text-brown" />Trusted Shop</div>
          </div>

          <Accordion items={accordion} className="mt-6" />

          {/* Desktop actions */}
          <div className="mt-6 hidden gap-3 lg:flex">
            <button onClick={handleAdd} className="btn-brown btn-lg flex-1">Add to Bag</button>
            <button onClick={handleBuyNow} className="btn-outline btn-lg flex-1">Buy Now</button>
          </div>
        </Reveal>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl">Recently Viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {recentlyViewed.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-taupe/20 bg-ivory/95 p-3 backdrop-blur lg:hidden">
        <button onClick={handleAdd} className="btn-gold btn-lg flex-1">Add to Bag</button>
        <button onClick={handleBuyNow} className="btn-outline btn-lg flex-1">Buy Now</button>
      </div>
      <div className="h-20 lg:hidden" />

      {zoom && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-charcoal/90 p-4" onClick={() => setZoom(null)}>
          <Image src={zoom} alt="" width={800} height={1000} className="max-h-[90vh] rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}
