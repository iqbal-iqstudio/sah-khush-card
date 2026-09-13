"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { products } from "@/data/mock-products";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const wishlist = useCartStore((s) => s.wishlist);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-shell py-10">
      <h1 className="font-serif text-3xl sm:text-4xl mb-8">Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">No saved pieces yet</p>
          <Button href="/products" variant="brown" className="mt-4">Explore Collections</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {items.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <div className="aspect-[3/4] bg-alabaster"><Image src={p.image} alt={p.name} width={300} height={400} className="h-full w-full object-cover" /></div>
              <div className="p-3"><p className="font-serif">{p.name}</p></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
