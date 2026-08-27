"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, Heart, Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [stitching, setStitching] = useState(false);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<string | null>(null);

  const mainImage = product.colors.find((c) => c.name === color)?.image ?? product.image;

  const handleAdd = () => addItem(product, { stitching, color, qty });
  const handleBuyNow = () => {
    addItem(product, { stitching, color, qty });
    router.push("/checkout");
  };

  const accordion = [
    { title: "Description", content: product.description },
    { title: "Shipping & COD Info", content: "Dhaka delivery ৳80, Outside Dhaka ৳150. Cash on Delivery available nationwide. Express (1 day) optional at checkout." },
    { title: "Authenticity Guarantee", content: <><a href="#" className="text-brown link-underline">Download certificate of authenticity</a> — every piece is 100% original, sourced directly from the brand.</> },
    { title: "Return Policy", content: "Easy 7-day returns on unused items in original packaging." },
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

          {/* Stitching toggle */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Format</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setStitching(false)} className={`rounded-2xl border-2 p-3 text-left ${!stitching ? "border-brown bg-alabaster" : "border-taupe/30"}`}>
                <p className="text-sm font-semibold">Unstitched (Fabric)</p>
                <p className="text-xs text-taupe">Raw 3-piece box</p>
              </button>
              <button onClick={() => setStitching(true)} disabled={product.stitchingPrice === 0} className={`rounded-2xl border-2 p-3 text-left ${stitching ? "border-brown bg-alabaster" : "border-taupe/30"} disabled:opacity-50`}>
                <p className="text-sm font-semibold">Stitched (Custom)</p>
                <p className="text-xs text-taupe">{product.stitchingPrice ? `+${formatBDT(product.stitchingPrice)}` : "Ready-to-wear"}</p>
              </button>
            </div>
          </div>

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
