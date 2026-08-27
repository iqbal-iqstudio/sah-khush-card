export default function EditorialBanner() {
  return (
    <section className="container-shell section-pad">
      <div className="grid overflow-hidden rounded-[2rem] bg-brown shadow-lift md:grid-cols-2">
        <div className="flex flex-col justify-center p-10 text-ivory">
          <p className="eyebrow text-gold">Our Philosophy</p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl mt-3">Crafted in Pakistan,<br />Curated in Bangladesh.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ivory/80">
            Every piece is sourced directly from the houses that define South Asian couture — then authenticated and delivered to your door across Bangladesh.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
            <span className="h-px w-8 bg-gold" /> Ethically sourced · 100% authentic
          </span>
        </div>
        <div className="relative min-h-[280px]">
          <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80" alt="Designer at work" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
