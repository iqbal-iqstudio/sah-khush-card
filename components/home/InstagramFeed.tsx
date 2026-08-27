import { Instagram } from "lucide-react";

const POSTS = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80",
  "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=500&q=80",
];

export default function InstagramFeed() {
  return (
    <section className="container-shell py-14">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">@sahkhush.bd</p>
        <h2 className="font-serif text-3xl sm:text-4xl mt-2">Styled by Our Community</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {POSTS.map((src, i) => (
          <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-xl bg-alabaster">
            <img src={src} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
            <div className="absolute inset-0 grid place-items-center bg-charcoal/40 opacity-0 transition group-hover:opacity-100 text-ivory"><Instagram className="h-6 w-6" /></div>
          </a>
        ))}
      </div>
    </section>
  );
}
