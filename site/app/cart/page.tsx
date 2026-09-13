"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, selectSubtotal } from "@/store/cart-store";
import { Button } from "@/components/ui/Button";
import { formatBDT, whatsappLink } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <div className="container-shell py-10">
      <h1 className="font-serif text-3xl sm:text-4xl mb-8">Your Bag</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">Your bag is empty</p>
          <Button href="/products" variant="brown" className="mt-4">Start Shopping</Button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.key} className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft">
                <Link href={`/products/${i.slug}`} className="shrink-0">
                  <Image src={i.image} alt={i.name} width={96} height={120} className="rounded-xl object-cover bg-alabaster" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link href={`/products/${i.slug}`} className="hover:opacity-80 transition-opacity">
                      <p className="text-xs uppercase tracking-wider text-gold">{i.brand}</p>
                      <p className="font-serif text-lg leading-tight">{i.name}</p>
                    </Link>
                    <button onClick={(e) => { e.stopPropagation(); removeItem(i.key); }} className="text-taupe hover:text-charcoal shrink-0"><Trash2 className="h-5 w-5" /></button>
                  </div>
                  {i.stitching && <span className="tag-gold mt-1 w-fit">+ Stitching</span>}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-full border border-taupe/30">
                      <button className="h-8 w-8" onClick={(e) => { e.stopPropagation(); updateQty(i.key, i.qty - 1); }}><Minus className="h-3.5 w-3.5 mx-auto" /></button>
                      <span className="px-2 text-sm">{i.qty}</span>
                      <button className="h-8 w-8" onClick={(e) => { e.stopPropagation(); updateQty(i.key, i.qty + 1); }}><Plus className="h-3.5 w-3.5 mx-auto" /></button>
                    </div>
                    <span className="font-semibold">{formatBDT(i.price * i.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/products" className="inline-block text-sm text-brown link-underline">← Continue Shopping</Link>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <h2 className="font-serif text-xl mb-4">Order Summary</h2>
              <div className="flex justify-between py-1 text-sm"><span className="text-taupe">Subtotal</span><span>{formatBDT(subtotal)}</span></div>
              <p className="mt-2 rounded-lg bg-alabaster p-3 text-xs text-taupe">Delivery: Dhaka ৳70 · Outside Dhaka ৳130</p>
              <div className="mt-3 flex justify-between border-t border-taupe/20 pt-3 font-semibold text-lg"><span>Total</span><span>{formatBDT(subtotal)}</span></div>
              <a
                href={whatsappLink(
                  `Hello SAH-KHUSH! I'd like to order:\n\n` +
                  items.map((i, idx) =>
                    `${idx + 1}. ${i.name}\n   Brand: ${i.brand}\n   Fabric: ${i.fabric}\n   Price: ${formatBDT(i.price)} × ${i.qty} = ${formatBDT(i.price * i.qty)}`
                  ).join("\n\n") +
                  `\n\nTotal: ${formatBDT(subtotal)}\n\nPlease share the delivery details. Thank you!`,
                  "8801627272342"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-lg mt-3 w-full text-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-.95.24-3.2-.67-2.66-1.05-4.34-3.73-4.47-3.91-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.56.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.69-.8.87-1.07.18-.27.36-.23.61-.14.25.09 1.6.76 1.88.9.27.14.46.21.53.33.07.12.07.68-.17 1.36z" /></svg>
                Order via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
