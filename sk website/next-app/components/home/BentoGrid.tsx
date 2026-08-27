import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BentoGrid() {
  return (
    <section className="container-shell section-pad">
      <div className="mb-10 text-center">
        <p className="eyebrow">Shop by Fabric</p>
        <h2 className="font-serif text-3xl sm:text-4xl mt-3">The Texture of Luxury</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/products?fabric=Lawn" className="group relative aspect-square overflow-hidden rounded-[2rem] bg-brown shadow-soft md:col-span-2 md:row-span-2 md:aspect-auto">
          <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80" alt="Lawn" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/85 via-brown-deep/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-ivory">
            <h3 className="font-serif text-3xl">Lawn</h3>
            <p className="mt-1 max-w-sm text-sm text-ivory/85">Breathable, vibrant, perfect for Dhaka summers.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-gold">Explore <span className="transition group-hover:translate-x-1">→</span></span>
          </div>
        </Link>
        <Link href="/products?fabric=Chiffon" className="group relative overflow-hidden rounded-[2rem] bg-gold shadow-soft aspect-square">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80" alt="Chiffon" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/85 via-brown-deep/10 to-transparent" />
          <div className="absolute bottom-5 left-5 text-ivory">
            <h3 className="font-serif text-2xl">Chiffon</h3>
            <p className="text-xs text-ivory/85">Fluid drape, evening luxury.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-gold">Explore <span className="transition group-hover:translate-x-1">→</span></span>
          </div>
        </Link>
        <Link href="/products?fabric=Silk" className="group relative overflow-hidden rounded-[2rem] bg-charcoal shadow-soft aspect-square">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="Silk" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/85 via-brown-deep/10 to-transparent" />
          <div className="absolute bottom-5 left-5 text-ivory">
            <h3 className="font-serif text-2xl">Silk</h3>
            <p className="text-xs text-ivory/85">Premium, substantial feel.</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-gold">Explore <span className="transition group-hover:translate-x-1">→</span></span>
          </div>
        </Link>
      </div>
      <div className="mt-8 text-center">
        <Button href="/products" variant="outline">View All Collections</Button>
      </div>
    </section>
  );
}
