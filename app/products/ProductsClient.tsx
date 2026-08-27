"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, brands, fabrics } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";

interface LocalFilters {
  brands: Set<string>;
  fabrics: Set<string>;
  colors: Set<string>;
  min: number | null;
  max: number | null;
  sort: string;
}

const colorList = (() => {
  const map = new Map<string, string>();
  for (const p of products) for (const c of p.colors) if (!map.has(c.name)) map.set(c.name, c.hex);
  return Array.from(map, ([name, hex]) => ({ name, hex }));
})();

function applyFilters(list: Product[], params: URLSearchParams, local: LocalFilters): Product[] {
  let out = list.slice();
  const brand = params.get("brand");
  if (brand) out = out.filter((p) => p.brand === brand);
  const fabric = params.get("fabric");
  if (fabric) out = out.filter((p) => p.fabric === fabric);
  if (local.brands.size) out = out.filter((p) => local.brands.has(p.brand));
  if (local.fabrics.size) out = out.filter((p) => local.fabrics.has(p.fabric));
  if (local.colors.size) out = out.filter((p) => p.colors.some((c) => local.colors.has(c.name)));
  if (local.min != null) out = out.filter((p) => p.price >= local.min!);
  if (local.max != null) out = out.filter((p) => p.price <= local.max!);
  const sort = params.get("sort") || local.sort;
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  else if (sort === "newest") out.reverse();
  return out;
}

function Filters({ local, setLocal, onClose }: { local: LocalFilters; setLocal: (l: LocalFilters) => void; onClose?: () => void }) {
  const toggle = (set: Set<string>, key: string) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">Filters</h3>
        {onClose && <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>}
      </div>
      <div className="border-b border-taupe/10 pb-5">
        <h4 className="mb-2 text-sm font-semibold">Brand</h4>
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={local.brands.has(b)} onChange={() => setLocal({ ...local, brands: toggle(local.brands, b) })} className="accent-brown" /> {b}
          </label>
        ))}
      </div>
      <div className="border-b border-taupe/10 pb-5">
        <h4 className="mb-2 text-sm font-semibold">Fabric</h4>
        {fabrics.map((f) => (
          <label key={f} className="flex items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={local.fabrics.has(f)} onChange={() => setLocal({ ...local, fabrics: toggle(local.fabrics, f) })} className="accent-brown" /> {f}
          </label>
        ))}
      </div>
      <div className="border-b border-taupe/10 pb-5">
        <h4 className="mb-2 text-sm font-semibold">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colorList.map((c) => {
            const active = local.colors.has(c.name);
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-pressed={active}
                onClick={() => setLocal({ ...local, colors: toggle(local.colors, c.name) })}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${active ? "border-brown bg-alabaster font-medium" : "border-taupe/30 hover:border-taupe/60"}`}
              >
                <span className="h-4 w-4 rounded-full border border-taupe/20" style={{ backgroundColor: c.hex }} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border-b border-taupe/10 pb-5">
        <h4 className="mb-2 text-sm font-semibold">Price (৳)</h4>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={local.min ?? ""} onChange={(e) => setLocal({ ...local, min: e.target.value ? +e.target.value : null })} className="w-full rounded-lg border border-taupe/30 px-2 py-1.5 text-sm" />
          <span className="text-taupe">–</span>
          <input type="number" placeholder="Max" value={local.max ?? ""} onChange={(e) => setLocal({ ...local, max: e.target.value ? +e.target.value : null })} className="w-full rounded-lg border border-taupe/30 px-2 py-1.5 text-sm" />
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold">Sort</h4>
        <select value={local.sort} onChange={(e) => setLocal({ ...local, sort: e.target.value })} className="w-full rounded-lg border border-taupe/30 px-3 py-2 text-sm">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default function ProductsClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [local, setLocal] = useState<LocalFilters>({ brands: new Set(), fabrics: new Set(), colors: new Set(), min: null, max: null, sort: params.get("sort") || "featured" });
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(products, new URLSearchParams(params.toString()), local), [params, local]);

  const syncUrl = useCallback(() => {
    const q = new URLSearchParams(params.toString());
    q.delete("sort");
    if (local.sort !== "featured") q.set("sort", local.sort);
    router.replace(`/products?${q.toString()}`, { scroll: false });
  }, [local.sort, params, router]);

  return (
    <div className="container-shell py-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow">Collection</p>
          <h1 className="font-serif text-3xl sm:text-4xl mt-2">All Pieces</h1>
        </div>
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSheetOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-taupe/10 bg-white p-5 shadow-soft">
            <Filters local={local} setLocal={setLocal} />
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-taupe">{filtered.length} pieces · {formatBDT(5000)} – {formatBDT(25000)}+</p>
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-taupe">No pieces match these filters yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setSheetOpen(false)} />
          <div className="absolute bottom-0 left-0 w-full rounded-t-3xl bg-ivory p-6 shadow-lift">
            <Filters local={local} setLocal={setLocal} onClose={() => { syncUrl(); setSheetOpen(false); }} />
            <Button variant="brown" className="mt-6 w-full" onClick={() => { syncUrl(); setSheetOpen(false); }}>Show {filtered.length} Results</Button>
          </div>
        </div>
      )}
    </div>
  );
}
