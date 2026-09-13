"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";
import type { AdminUser, AdminOrder, AdminSettings, ContactMessage, NewsletterSubscriber, HomeSlide, Brand } from "@/types/admin";
import { products as defaultProducts } from "@/data/mock-products";

/* ── Auth ── */
interface AuthState {
  user: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const DEFAULT_CREDS = { email: "admin@sahkhush.com", password: "admin123" };

/* ── Products ── */
interface ProductState {
  products: Product[];
  initProducts: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  importProducts: (p: Product[]) => void;
  exportProducts: () => string;
}

/* ── Orders ── */
interface OrderState {
  orders: AdminOrder[];
  addOrder: (o: AdminOrder) => void;
  updateOrderStatus: (id: string, status: AdminOrder["status"]) => void;
  deleteOrder: (id: string) => void;
}

/* ── Contact Messages ── */
interface ContactState {
  messages: ContactMessage[];
  addMessage: (m: ContactMessage) => void;
  markRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

/* ── Newsletter ── */
interface NewsletterState {
  subscribers: NewsletterSubscriber[];
  addSubscriber: (email: string, name?: string) => boolean;
  removeSubscriber: (id: string) => void;
  toggleActive: (id: string) => void;
  exportSubscribers: () => string;
}

/* ── Settings ── */
interface SettingsState {
  settings: AdminSettings;
  updateSettings: (s: Partial<AdminSettings>) => void;
}

/* ── Home Slider ── */
interface SliderState {
  slides: HomeSlide[];
  initSlides: () => void;
  addSlide: (s: HomeSlide) => void;
  updateSlide: (id: string, s: Partial<HomeSlide>) => void;
  deleteSlide: (id: string) => void;
  moveSlide: (id: string, dir: -1 | 1) => void;
}

/* ── Brands ── */
interface BrandsState {
  brands: Brand[];
  initBrands: () => void;
  addBrand: (b: Brand) => void;
  deleteBrand: (id: string) => void;
  moveBrand: (id: string, dir: -1 | 1) => void;
}

const defaultSlides: HomeSlide[] = [
  {
    id: "slide-1",
    eyebrow: "The Charizma Edit",
    title: "Summer Lawn, Reimagined",
    copy: "Pure imported lawn with hand-finished embroidery. Limited premium slots.",
    cta: "Shop the Look",
    href: "/products?brand=Charizma",
    image: "/slide1.jpg",
  },
  {
    id: "slide-2",
    eyebrow: "Luxury Chiffon '24",
    title: "Intricate. Ethereal. Yours.",
    copy: "Resham and zari embroidery crafted for soirées and weddings.",
    cta: "Explore Formal Wear",
    href: "/products?fabric=Chiffon",
    image: "/s2.jpg",
  },
  {
    id: "slide-3",
    eyebrow: "Raw Silk Couture",
    title: "Substance Meets Splendour",
    copy: "Premium, substantial weaves for the woman who commands a room.",
    cta: "Discover Silk",
    href: "/products?fabric=Silk",
    image: "/s3.jpg",
  },
];

const defaultBrands: Brand[] = [
  { id: "b1", name: "Charizma" },
  { id: "b2", name: "Bin Hameed" },
  { id: "b3", name: "Firdous" },
  { id: "b4", name: "Sapphire" },
  { id: "b5", name: "Elan" },
  { id: "b6", name: "Maria B" },
  { id: "b7", name: "Sana Safinaz" },
  { id: "b8", name: "Alkaram" },
];

const safeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} } as any;
  }
  return localStorage as any;
});

export const useAdminStore = create<
  AuthState & ProductState & OrderState & ContactState & NewsletterState & SettingsState & SliderState & BrandsState
>()(
  persist(
    (set, get) => ({
      /* ── Auth ── */
      user: null,
      login: (email, password) => {
        if (email === DEFAULT_CREDS.email && password === DEFAULT_CREDS.password) {
          set({ user: { email, name: "Admin" } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),

      /* ── Products ── */
      products: [],
      initProducts: () => {
        if (get().products.length === 0) {
          set({ products: defaultProducts });
        }
      },
      addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
      updateProduct: (id, updates) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      importProducts: (p) => set({ products: p }),
      exportProducts: () => JSON.stringify(get().products, null, 2),

      /* ── Orders ── */
      orders: [],
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      deleteOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),

      /* ── Contact Messages ── */
      messages: [],
      addMessage: (m) => set((s) => ({ messages: [m, ...s.messages] })),
      markRead: (id) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),
      deleteMessage: (id) => set((s) => ({ messages: s.messages.filter((m) => m.id !== id) })),

      /* ── Newsletter ── */
      subscribers: [],
      addSubscriber: (email, name) => {
        const exists = get().subscribers.some((s) => s.email === email);
        if (exists) return false;
        const sub: NewsletterSubscriber = {
          id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          date: new Date().toISOString(),
          email,
          name,
          active: true,
        };
        set((s) => ({ subscribers: [sub, ...s.subscribers] }));
        return true;
      },
      removeSubscriber: (id) => set((s) => ({ subscribers: s.subscribers.filter((sub) => sub.id !== id) })),
      toggleActive: (id) =>
        set((s) => ({
          subscribers: s.subscribers.map((sub) =>
            sub.id === id ? { ...sub, active: !sub.active } : sub
          ),
        })),
      exportSubscribers: () => JSON.stringify(get().subscribers, null, 2),

      /* ── Settings ── */
      settings: {
        storeName: "SAH-KHUSH",
        storeEmail: "admin@sahkhush.com",
        storePhone: "+880 1XXXXXXXXX",
        storeAddress: "Dhaka, Bangladesh",
        whatsappNumber: "8801XXXXXXXXX",
        freeShippingThreshold: 5000,
        currency: "৳ BDT",
      },
      updateSettings: (s) => set((state) => ({ settings: { ...state.settings, ...s } })),

      /* ── Home Slider ── */
      slides: [],
      initSlides: () => {
        if (get().slides.length === 0) {
          set({ slides: defaultSlides });
        }
      },
      addSlide: (s) => set((state) => ({ slides: [...state.slides, s] })),
      updateSlide: (id, updates) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, ...updates } : sl)),
        })),
      deleteSlide: (id) => set((s) => ({ slides: s.slides.filter((sl) => sl.id !== id) })),
      moveSlide: (id, dir) =>
        set((s) => {
          const idx = s.slides.findIndex((sl) => sl.id === id);
          if (idx < 0) return s;
          const newIdx = idx + dir;
          if (newIdx < 0 || newIdx >= s.slides.length) return s;
          const arr = [...s.slides];
          [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
          return { slides: arr };
        }),

      /* ── Brands ── */
      brands: [],
      initBrands: () => {
        if (get().brands.length === 0) {
          set({ brands: defaultBrands });
        }
      },
      addBrand: (b) => set((s) => ({ brands: [...s.brands, b] })),
      deleteBrand: (id) => set((s) => ({ brands: s.brands.filter((b) => b.id !== id) })),
      moveBrand: (id, dir) =>
        set((s) => {
          const idx = s.brands.findIndex((b) => b.id === id);
          if (idx < 0) return s;
          const newIdx = idx + dir;
          if (newIdx < 0 || newIdx >= s.brands.length) return s;
          const arr = [...s.brands];
          [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
          return { brands: arr };
        }),
    }),
    {
      name: "sahkhush-admin",
      storage: safeStorage,
    }
  )
);
