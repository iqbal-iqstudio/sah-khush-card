"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCartStore, selectSubtotal } from "@/store/cart-store";
import { formatBDT, whatsappLink } from "@/lib/utils";

const FREE_THRESHOLD = 6000;

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectSubtotal);

  const remain = Math.max(0, FREE_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-[90%] max-w-md flex-col bg-ivory shadow-lift"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-taupe/20 px-5 py-4">
              <h3 className="font-serif text-xl">Your Bag</h3>
              <button onClick={close} aria-label="Close"><X className="h-6 w-6" /></button>
            </div>

            <div className="px-5 pt-4">
              <div className="rounded-2xl bg-alabaster p-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-taupe/20">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-charcoal/80">
                  {remain > 0 ? <>Add <b>{formatBDT(remain)}</b> more for <b>FREE shipping</b></> : <>🎉 You’ve unlocked <b>FREE shipping</b>!</>}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-3 no-scrollbar">
              {items.length === 0 && (
                <div className="py-16 text-center text-taupe">
                  <p className="font-serif text-2xl text-charcoal">Your bag is empty</p>
                  <Link href="/products" onClick={close} className="mt-4 inline-block text-brown link-underline">Start shopping</Link>
                </div>
              )}
              {items.map((i) => (
                <div key={i.key} className="flex gap-3 border-b border-taupe/15 pb-3">
                  <Image src={i.image} alt={i.name} width={64} height={80} className="rounded-lg object-cover bg-alabaster" />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-sm leading-tight">{i.name}</p>
                      <button onClick={() => removeItem(i.key)} className="text-taupe hover:text-charcoal"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    {i.stitching && <span className="tag-gold mt-1">+ Stitching</span>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-taupe/30">
                        <button className="h-7 w-7" onClick={() => updateQty(i.key, i.qty - 1)}><Minus className="h-3.5 w-3.5 mx-auto" /></button>
                        <span className="px-2 text-sm">{i.qty}</span>
                        <button className="h-7 w-7" onClick={() => updateQty(i.key, i.qty + 1)}><Plus className="h-3.5 w-3.5 mx-auto" /></button>
                      </div>
                      <span className="text-sm font-semibold">{formatBDT(i.price * i.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-taupe/20 px-5 py-4">
                <div className="flex justify-between">
                  <span className="text-taupe">Subtotal</span>
                  <span className="text-lg font-semibold">{formatBDT(subtotal)}</span>
                </div>
                <Link href="/cart" onClick={close} className="btn-brown w-full btn-lg">
                  <ShoppingBag className="h-4 w-4" /> View Bag &amp; Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink(`Hello SAH-KHUSH, I'd like to order items worth ${formatBDT(subtotal)}.`)}
                  className="btn-gold w-full btn-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-.95.24-3.2-.67-2.66-1.05-4.34-3.73-4.47-3.91-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.56.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.69-.8.87-1.07.18-.27.36-.23.61-.14.25.09 1.6.76 1.88.9.27.14.46.21.53.33.07.12.07.68-.17 1.36z" /></svg>
                  Order via WhatsApp
                </a>
                <p className="text-center text-[11px] text-taupe">Delivery charge via bKash/Nagad · Balance as COD</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
