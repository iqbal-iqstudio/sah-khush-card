const BRANDS = ["Charizma", "Bin Hameed", "Firdous", "Sapphire", "Elan", "Maria B", "Sana Safinaz", "Alkaram"];

export default function BrandsMarquee() {
  return (
    <section className="border-y border-taupe/15 bg-ivory py-8">
      <p className="container-shell mb-4 text-center text-xs uppercase tracking-[0.3em] text-taupe">Brands We House</p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1, 2, 3].map((g) => (
            <div key={g} className="flex shrink-0 gap-16 whitespace-nowrap px-8">
              {BRANDS.map((b) => (
                <span key={b} className="font-serif text-2xl text-taupe/60 grayscale">{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
