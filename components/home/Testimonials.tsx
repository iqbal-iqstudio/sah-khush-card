"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { name: "Ayesha R.", text: "Finally found original Firdous in BD! The embroidery is even better in person.", rating: 5 },
  { name: "Nusrat K.", text: "Charizma lawn quality is unmatched. Authentic, fast delivery, beautiful packaging.", rating: 5 },
  { name: "Tanveer A.", text: "Bought a Bin Hameed chiffon for my wife’s birthday. She was thrilled.", rating: 5 },
  { name: "Mahmud S.", text: "Stitching service was perfect and on time. Will shop again.", rating: 4 },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % REVIEWS.length);
  const prev = () => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length);
  return (
    <section className="bg-alabaster py-14">
      <div className="container-shell text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Loved by Dhaka</p>
        <h2 className="font-serif text-3xl sm:text-4xl mt-2">What Our Clients Say</h2>
        <div className="relative mx-auto mt-8 max-w-2xl rounded-3xl bg-ivory p-8 shadow-soft">
          <div className="mb-3 flex justify-center text-gold">
            {Array.from({ length: REVIEWS[i].rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="font-serif text-lg leading-relaxed text-charcoal">“{REVIEWS[i].text}”</p>
          <p className="mt-3 text-sm text-taupe">— {REVIEWS[i].name}</p>
          <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe hover:text-brown"><ChevronLeft className="h-6 w-6" /></button>
          <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-brown"><ChevronRight className="h-6 w-6" /></button>
        </div>
      </div>
    </section>
  );
}
