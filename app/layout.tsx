import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "SAH-KHUSH · Elite Pakistani Lawn & Chiffon", template: "%s · SAH-KHUSH" },
  description:
    "100% original imported Pakistani luxury lawn & chiffon — Charizma, Bin Hameed, Firdous. Authentic guaranteed. Shipping across Bangladesh with Cash on Delivery.",
  openGraph: {
    title: "SAH-KHUSH · Elite Pakistani Lawn & Chiffon",
    description: "Authentic Pakistani luxury, curated in Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ivory text-charcoal">
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
