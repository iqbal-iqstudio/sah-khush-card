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
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SAH-KHUSH · Elite Pakistani Lawn & Chiffon",
    description: "Authentic Pakistani luxury, curated in Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory text-charcoal">
        <div className="bg-charcoal text-ivory/70 text-center text-xs py-2 tracking-wide">
          Site Under Development — Some Features May Be Incomplete
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
