"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart-store";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const inWishlist = useCartStore((s) => s.wishlist.includes(product.id));
  return (
    <article className="group card-hover relative flex flex-col overflow-hidden rounded-2xl border border-taupe/10 bg-white">
      <div className="relative block aspect-[3/4] overflow-hidden bg-alabaster">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" />
          <Image src={product.lifestyle} alt="" fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
        </Link>
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.availability === "preorder" ? <Badge tone="gold">Pre-Order</Badge> : <Badge tone="brown">Original</Badge>}
          {product.badge && product.badge !== "Original" && (
            <Badge tone={product.badge === "New Season" ? "emerald" : product.badge === "Low Stock" ? "rose" : "amber"}>{product.badge}</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{product.brand} · {product.fabric}</p>
        <Link href={`/products/${product.slug}`} className="font-serif text-lg leading-snug mt-1 text-charcoal transition-colors hover:text-brown">{product.name}</Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-lg text-charcoal">{formatBDT(product.price)}</span>
          {product.compareAtPrice && <span className="text-sm text-taupe line-through">{formatBDT(product.compareAtPrice)}</span>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => addItem(product)}
            className="btn-brown flex-1 py-2 text-sm"
          >Add to Bag</button>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`grid h-9 w-9 place-items-center rounded-full border transition ${
              inWishlist
                ? "border-brown bg-brown text-ivory"
                : "border-taupe/30 text-charcoal hover:border-brown hover:bg-brown hover:text-ivory"
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
