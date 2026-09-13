"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
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

function Filters({ local, setLocal, onClose, allBrands, allFabrics, allColors }: { local: LocalFilters; setLocal: (l: LocalFilters) => void; onClose?: () => void; allBrands: string[]; allFabrics: string[]; allColors: { name: string; hex: string }[] }) {
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
        {allBrands.map((b) => (
          <label key={b} className="flex items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={local.brands.has(b)} onChange={() => setLocal({ ...local, brands: toggle(local.brands, b) })} className="accent-brown" /> {b}
          </label>
        ))}
      </div>
      <div className="border-b border-taupe/10 pb-5">
        <h4 className="mb-2 text-sm font-semibold">Fabric</h4>
        {allFabrics.map((f) => (
          <label key={f} className="flex items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={local.fabrics.has(f)} onChange={() => setLocal({ ...local, fabrics: toggle(local.fabrics, f) })} className="accent-brown" /> {f}
          </label>
        ))}
      </div>
      {allColors.length > 0 && (
        <div className="border-b border-taupe/10 pb-5">
          <h4 className="mb-2 text-sm font-semibold">Color</h4>
          <div className="flex flex-wrap gap-2">
            {allColors.map((c) => (
              <button key={c.name} onClick={() => setLocal({ ...local, colors: toggle(local.colors, c.name) })}
                title={c.name}
                className={`h-7 w-7 rounded-full border-2 transition ${local.colors.has(c.name) ? "border-brown ring-2 ring-gold/40" : "border-taupe/20 hover:border-taupe/50"}`}
                style={{ backgroundColor: c.hex }} />
            ))}
          </div>
          {local.colors.size > 0 && (
            <p className="mt-2 text-[11px] text-taupe">{[...local.colors].join(", ")}</p>
          )}
        </div>
      )}
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

function applyFilters(list: Product[], params: URLSearchParams, local: LocalFilters): Product[] {
  let out = list.slice();
  const brand = params.get("brand");
  if (brand) out = out.filter((p) => p.brand === brand);
  const fabric = params.get("fabric");
  if (fabric) out = out.filter((p) => p.fabric === fabric);
  const sort = params.get("sort");
  if (sort) local = { ...local, sort };
  if (local.brands.size) out = out.filter((p) => local.brands.has(p.brand));
  if (local.fabrics.size) out = out.filter((p) => local.fabrics.has(p.fabric));
  if (local.colors.size) out = out.filter((p) => p.colors.some((c) => local.colors.has(c.name)));
  if (local.min != null) out = out.filter((p) => p.price >= local.min!);
  if (local.max != null) out = out.filter((p) => p.price <= local.max!);
  if (local.sort === "price-asc") out.sort((a, b) => a.price - b.price);
  else if (local.sort === "price-desc") out.sort((a, b) => b.price - a.price);
  else if (local.sort === "newest") out.reverse();
  out.sort((a, b) => (a.availability === "stockout" ? 1 : 0) - (b.availability === "stockout" ? 1 : 0));
  return out;
}

export default function ProductsClient() {
  const router = useRouter();
  const params = useSearchParams();
  const products = useAdminStore((s) => s.products);
  const initProducts = useAdminStore((s) => s.initProducts);
  const [local, setLocal] = useState<LocalFilters>({ brands: new Set(), fabrics: new Set(), colors: new Set(), min: null, max: null, sort: params.get("sort") || "featured" });
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => { initProducts(); }, [initProducts]);

  const allBrands = [...new Set(products.map((p) => p.brand))].sort();
  const allFabrics = [...new Set(products.map((p) => p.fabric))].sort();
  const allColorsMap = new Map<string, string>();
  products.forEach((p) => p.colors.forEach((c) => { if (!allColorsMap.has(c.name)) allColorsMap.set(c.name, c.hex); }));
  const allColors = [...allColorsMap.entries()].map(([name, hex]) => ({ name, hex })).sort((a, b) => a.name.localeCompare(b.name));

  const filtered = useMemo(() => applyFilters(products, new URLSearchParams(params.toString()), local), [params, local, products]);

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
            <Filters local={local} setLocal={setLocal} allBrands={allBrands} allFabrics={allFabrics} allColors={allColors} />
            <button onClick={syncUrl} className="mt-6 w-full rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift">
              Show {filtered.length} Results
            </button>
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-taupe">{filtered.length} pieces</p>
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
            <Filters local={local} setLocal={setLocal} onClose={() => { syncUrl(); setSheetOpen(false); }} allBrands={allBrands} allFabrics={allFabrics} allColors={allColors} />
            <Button variant="brown" className="mt-6 w-full" onClick={() => { syncUrl(); setSheetOpen(false); }}>Show {filtered.length} Results</Button>
          </div>
        </div>
      )}
    </div>
  );
}
