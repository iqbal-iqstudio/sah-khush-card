"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAdminStore } from "@/store/admin-store";

const FALLBACK_SLIDES = [
  {
    eyebrow: "The Charizma Edit",
    title: "Summer Lawn, Reimagined",
    copy: "Pure imported lawn with hand-finished embroidery. Limited premium slots.",
    cta: "Shop the Look",
    href: "/products?brand=Charizma",
    image: "/slide1.jpg",
  },
  {
    eyebrow: "Luxury Chiffon '24",
    title: "Intricate. Ethereal. Yours.",
    copy: "Resham and zari embroidery crafted for soirées and weddings.",
    cta: "Explore Formal Wear",
    href: "/products?fabric=Chiffon",
    image: "/s2.jpg",
  },
  {
    eyebrow: "Raw Silk Couture",
    title: "Substance Meets Splendour",
    copy: "Premium, substantial weaves for the woman who commands a room.",
    cta: "Discover Silk",
    href: "/products?fabric=Silk",
    image: "/s3.jpg",
  },
];

const DURATION = 6000;

export default function Hero() {
  const storeSlides = useAdminStore((s) => s.slides);
  const initSlides = useAdminStore((s) => s.initSlides);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    initSlides();
  }, [initSlides]);

  const slides = storeSlides.length > 0 ? storeSlides : FALLBACK_SLIDES;

  const next = () => { setDir(1); setI((p) => (p + 1) % slides.length); };
  const prev = () => { setDir(-1); setI((p) => (p - 1 + slides.length) % slides.length); };
  const go = (idx: number) => { setDir(idx > i ? 1 : -1); setI(idx); };

  useEffect(() => {
    if (paused || slides.length === 0) return;
    const t = setInterval(() => { setDir(1); setI((p) => (p + 1) % slides.length); }, DURATION);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  useEffect(() => {
    if (i >= slides.length) setI(0);
  }, [slides.length, i]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1 }),
  };

  const slide = slides[i];
  if (!slide) return null;

  return (
    <section
      className="relative -mt-16 h-screen min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="popLayout" custom={dir}>
        <motion.div
          key={i}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          dragSnapToOrigin
          onDragEnd={(e, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
        >
          <Image src={slide.image} alt={slide.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/80 via-brown-deep/25 to-brown-deep/40" />
          <motion.div
            key={`t-${i}`}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            className="container-shell absolute inset-0 flex items-end pb-24 text-ivory"
          >
            <div className="max-w-2xl">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow text-gold"
              >
                {slide.eyebrow}
              </motion.p>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl leading-[1.05] mt-4 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-7xl"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-md text-base text-ivory/85"
              >
                {slide.copy}
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7"
              >
                <Button href={slide.href} variant="gold" size="lg">{slide.cta}</Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/30 bg-brown-deep/30 text-ivory backdrop-blur transition hover:border-gold hover:bg-gold hover:text-brown sm:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/30 bg-brown-deep/30 text-ivory backdrop-blur transition hover:border-gold hover:bg-gold hover:text-brown sm:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-6 hidden items-center gap-2 text-ivory/70 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-ivory/50" />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_: any, idx: number) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => go(idx)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-7 bg-gold" : "w-2 bg-ivory/40 hover:bg-ivory/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
