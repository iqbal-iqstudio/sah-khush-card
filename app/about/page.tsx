"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAdminStore } from "@/store/admin-store";
import { useEffect } from "react";

export default function AboutPage() {
  const brands = useAdminStore((s) => s.brands);
  const initBrands = useAdminStore((s) => s.initBrands);

  useEffect(() => {
    initBrands();
  }, [initBrands]);

  const brandNames = brands.length > 0 ? brands.map((b) => b.name) : ["Charizma", "Bin Hameed", "Firdous", "Sapphire", "Elan", "Maria B", "Sana Safinaz", "Alkaram"];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brown py-20 text-ivory">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Our Story</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl">About SAH-KHUSH</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/80">
            We bring the finest Pakistani fashion directly to your doorstep in Bangladesh — authentic, curated, and delivered with care.
          </p>
        </div>
      </section>

      {/* Triple Your Happiness */}
      <section className="section-pad">
        <div className="container-shell grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-gold">Our Promise</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Triple Your Happiness</h2>
            <p className="mt-4 leading-relaxed text-taupe">
              At SAH-KHUSH, we believe fashion should bring joy in three ways — the thrill of discovering the perfect piece, the confidence of wearing something truly authentic, and the delight of sharing it with people you love.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <span className="font-serif text-xl">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Authenticity Guaranteed</h3>
                  <p className="text-sm text-taupe">Every piece is sourced directly from the original Pakistani fashion houses — no middlemen, no imitations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <span className="font-serif text-xl">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Curated for Bangladesh</h3>
                  <p className="text-sm text-taupe">We handpick collections suited to Bangladesh&apos;s climate, culture, and style — from breathable lawn to formal chiffon.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <span className="font-serif text-xl">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Delivered with Trust</h3>
                  <p className="text-sm text-taupe">From our hands to yours — secure packaging, Cash on Delivery, and customer service that genuinely cares.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-alabaster">
            <img src="/logo-update.svg" alt="SAH-KHUSH" className="mx-auto w-2/3 py-12 opacity-80" />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Who We Are */}
      <section className="section-pad">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold">Who We Are</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">The Team Behind the Thread</h2>
            <p className="mt-6 leading-relaxed text-taupe">
              SAH-KHUSH was born from a simple observation: Bangladesh&apos;s love for Pakistani fashion was met with inconsistency, markups, and uncertainty about authenticity. We set out to change that.
            </p>
            <p className="mt-4 leading-relaxed text-taupe">
              Based in Dhaka, we work directly with Pakistan&apos;s most respected fashion houses — Charizma, Bin Hameed, Firdous, and more — to bring you collections that are 100% original, fairly priced, and delivered right to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-alabaster py-16">
        <div className="container-shell grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { number: "~100", label: "Happy Customers" },
            { number: "100%", label: "Original Products" },
            { number: "8+", label: "Premium Brands" },
            { number: "COD", label: "Cash on Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl text-brown">{stat.number}</p>
              <p className="mt-2 text-sm text-taupe">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Standards */}
      <section className="section-pad">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold">Our Standards</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">What We Stand For</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "100% Authentic",
                desc: "Every product comes directly from the original Pakistani manufacturer. We never deal in replicas or second-hand goods.",
              },
              {
                title: "Fair Pricing",
                desc: "No inflated middlemen markups. We offer genuine luxury at the most competitive prices in Bangladesh.",
              },
              {
                title: "Quality Assured",
                desc: "From fabric to stitching, every detail is inspected before it reaches you. Our standards are non-negotiable.",
              },
              {
                title: "Cash on Delivery",
                desc: "Pay only when you receive your order. We also accept bKash, Nagad, and Rocket for your convenience.",
              },
              {
                title: "Nationwide Delivery",
                desc: "We deliver across all 64 districts of Bangladesh. Free shipping on orders above ৳5,000.",
              },
              {
                title: "Customer First",
                desc: "Got questions? Our team is available via WhatsApp, phone, or email. We typically respond within hours.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="font-serif text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-alabaster py-16">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Our Partners</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Brands We House</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {brandNames.map((b) => (
              <span key={b} className="rounded-full border border-taupe/20 bg-white px-6 py-3 font-serif text-lg text-taupe shadow-sm transition hover:border-brown hover:text-brown">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-shell text-center">
          <h2 className="font-serif text-3xl sm:text-4xl">Ready to Experience SAH-KHUSH?</h2>
          <p className="mx-auto mt-4 max-w-lg text-taupe">
            Explore our curated collection of premium Pakistani lawn, chiffon, and silk — authentically sourced, carefully delivered.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/products" variant="brown" size="lg">Shop the Collection</Button>
            <Button href="/contact" variant="outline" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
