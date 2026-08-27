import { products } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export default function SummerEdit() {
  const hot = products.slice(0, 8);
  return (
    <section className="container-shell py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Hot This Week</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2">The Summer Edit</h2>
        </div>
        <Button href="/products" variant="outline" size="sm">View All</Button>
      </div>
      <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-2">
        {hot.map((p) => (
          <div key={p.id} className="w-[260px] shrink-0 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
