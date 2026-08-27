"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartItem {
  key: string;
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  qty: number;
  stitching: boolean;
  color?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  wishlist: string[];
  addItem: (p: Product, opts?: { stitching?: boolean; color?: string; qty?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleWishlist: (id: string) => void;
}

const safeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} } as any;
  }
  return localStorage as any;
});

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      wishlist: [],
      addItem: (p, opts = {}) => {
        const stitching = !!opts.stitching;
        const color = opts.color || p.colors[0]?.name;
        const key = `${p.id}:${stitching ? "s" : "u"}:${color}`;
        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + (opts.qty ?? 1) } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                key,
                id: p.id,
                slug: p.slug,
                name: p.name,
                brand: p.brand,
                price: p.price + (stitching ? p.stitchingPrice : 0),
                image: p.image,
                qty: opts.qty ?? 1,
                stitching,
                color,
              },
            ],
          };
        });
        set({ isOpen: true });
      },
      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      updateQty: (key, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),
    }),
    { name: "sahkhush-cart", storage: safeStorage }
  )
);

export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.qty, 0);
export const selectSubtotal = (s: CartState) => s.items.reduce((sum, i) => sum + i.price * i.qty, 0);
