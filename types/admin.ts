export interface AdminUser {
  email: string;
  name: string;
}

export interface HomeSlide {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
  image: string;
}

export interface AdminOrder {
  id: string;
  date: string;
  customer: { name: string; email: string; phone: string; address: string };
  items: { name: string; brand: string; price: number; qty: number; stitching: boolean; color?: string }[];
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes?: string;
}

export interface ContactMessage {
  id: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  date: string;
  email: string;
  name?: string;
  active: boolean;
}

export interface AdminSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  whatsappNumber: string;
  freeShippingThreshold: number;
  currency: string;
}

export interface Brand {
  id: string;
  name: string;
}
