import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brown text-ivory">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="container-shell py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-serif text-2xl tracking-[0.12em]">SAH-KHUSH</h3>
          <p className="mt-3 leading-relaxed text-ivory/70">Elite imported Pakistani luxury lawn &amp; chiffon — authentic, always. Curated in Bangladesh.</p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:bg-gold hover:text-brown">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:bg-gold hover:text-brown">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.28.8-.32 1.7C3.81 8.98 3.8 9.35 3.8 12s.01 3.02.07 4.26c.04.9.2 1.38.32 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.28 1.7.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.28-.8.32-1.7.06-1.24.07-1.61.07-4.26s-.01-3.02-.07-4.26c-.04-.9-.2-1.38-.32-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.28-1.7-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zM17.34 6.8a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" /></svg>
            </a>
            <a href="#" aria-label="TikTok" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:bg-gold hover:text-brown">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.21 1.74 2.89 2.89 0 0 1 2.32-4.74.86.86 0 0 1 .86.86V9.4a6.13 6.13 0 0 0-1-.06A6.07 6.07 0 1 0 15.3 15.3V8.35a8.23 8.23 0 0 0 4.79 1.53V6.69a4.83 4.83 0 0 1-3.5-1z" /></svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition hover:border-gold hover:bg-gold hover:text-brown">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-.95.24-3.2-.67-2.66-1.05-4.34-3.73-4.47-3.91-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.56.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.69-.8.87-1.07.18-.27.36-.23.61-.14.25.09 1.6.76 1.88.9.27.14.46.21.53.33.07.12.07.68-.17 1.36z" /></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-gold mb-4">Shop</h4>
          <ul className="space-y-2.5 text-ivory/80">
            <li><Link href="/products?fabric=Lawn" className="link-underline">Luxury Lawn</Link></li>
            <li><Link href="/products?fabric=Chiffon" className="link-underline">Formal Chiffon</Link></li>
            <li><Link href="/products?fabric=Silk" className="link-underline">Raw Silk</Link></li>
            <li><Link href="/products?sale=1" className="link-underline">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-gold mb-4">Company</h4>
          <ul className="space-y-2.5 text-ivory/80">
            <li><Link href="/about" className="link-underline">About Us</Link></li>
            <li><Link href="/contact" className="link-underline">Contact Us</Link></li>
            <li><Link href="/faqs" className="link-underline">FAQs</Link></li>
            <li><Link href="/blog" className="link-underline">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-gold mb-4">Newsletter</h4>
          <p className="text-ivory/70 mb-3 leading-relaxed">Join for new arrivals &amp; a first-order discount.</p>
          <form className="flex overflow-hidden rounded-full border border-ivory/25 focus-within:border-gold">
            <input type="email" required placeholder="Email address" className="flex-1 bg-transparent px-4 py-2.5 text-ivory text-sm outline-none placeholder:text-ivory/50" />
            <button className="bg-gold px-5 text-sm font-semibold text-brown transition hover:bg-gold-soft">Join</button>
          </form>
          <div className="flex flex-wrap items-center gap-2 mt-4 text-ivory/60">
            <span>bKash</span><span>·</span><span>Nagad</span><span>·</span><span>Rocket</span><span>·</span><span>COD</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-ivory/15 px-4 py-5 text-xs tracking-wide text-ivory/50 sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} SAH-KHUSH · Crafted in Bangladesh 🇧🇩</span>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="link-underline hover:text-ivory">Privacy Policy</Link>
          <Link href="/terms" className="link-underline hover:text-ivory">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
