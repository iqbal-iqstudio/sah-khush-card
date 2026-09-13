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

function Filters({ local, setLocal, onClose, allBrands, allFabrics, allColors }: { local: LocalFilters; setLocal: (l: LocalFilters) => void; onClose?: () => void; allBrands: string[]; allFabrics: string[]; allColors: { label: string; hex: string }[] }) {
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
              <button key={c.label} onClick={() => setLocal({ ...local, colors: toggle(local.colors, c.label) })}
                title={c.label}
                className={`h-7 w-7 rounded-full border-2 transition ${local.colors.has(c.label) ? "border-brown ring-2 ring-gold/40" : "border-taupe/20 hover:border-taupe/50"}`}
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
  const search = params.get("search");
  if (search) {
    const q = search.toLowerCase();
    out = out.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  const sort = params.get("sort");
  if (sort) local = { ...local, sort };
  if (local.brands.size) out = out.filter((p) => local.brands.has(p.brand));
  if (local.fabrics.size) out = out.filter((p) => local.fabrics.has(p.fabric));
  if (local.colors.size) {
    const COLOR_BUCKETS: { label: string; match: (r: number, g: number, b: number) => boolean }[] = [
      { label: "Red", match: (r, g, b) => r > 150 && g < 80 && b < 80 },
      { label: "Maroon", match: (r, g, b) => r > 80 && r < 180 && g < 60 && b < 60 },
      { label: "Pink", match: (r, g, b) => r > 180 && g < 120 && b > 100 && b < 180 },
      { label: "Orange", match: (r, g, b) => r > 200 && g > 80 && g < 170 && b < 80 },
      { label: "Gold", match: (r, g, b) => r > 150 && g > 120 && g < 200 && b < 100 && Math.abs(r - g) < 80 },
      { label: "Yellow", match: (r, g, b) => r > 180 && g > 170 && b < 80 },
      { label: "Green", match: (r, g, b) => g > 120 && r < g && b < g },
      { label: "Teal", match: (r, g, b) => g > 100 && b > 100 && r < 80 },
      { label: "Blue", match: (r, g, b) => b > 150 && r < b && g < b },
      { label: "Navy", match: (r, g, b) => b > r && b > g && r < 60 && g < 80 && b < 100 },
      { label: "Purple", match: (r, g, b) => r > 80 && b > 120 && g < 80 },
      { label: "White", match: (r, g, b) => r > 230 && g > 230 && b > 230 },
      { label: "Ivory", match: (r, g, b) => r > 210 && g > 200 && b > 180 && r < 240 },
      { label: "Beige", match: (r, g, b) => r > 180 && g > 160 && b > 120 && r > b },
      { label: "Brown", match: (r, g, b) => r > 80 && g > 40 && g < 120 && b < 80 && r > g },
      { label: "Black", match: (r, g, b) => r < 60 && g < 60 && b < 60 },
    ];
    const hexToRgb = (hex: string) => { const h = hex.replace("#", ""); return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) }; };
    const matchesBucket = (hex: string, label: string) => {
      const { r, g, b } = hexToRgb(hex);
      const bucket = COLOR_BUCKETS.find((b) => b.label === label);
      return bucket ? bucket.match(r, g, b) : false;
    };
    out = out.filter((p) => p.colors.some((c) => [...local.colors].some((label) => matchesBucket(c.hex, label))));
  }
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

  const COLOR_BUCKETS: { label: string; hex: string; match: (r: number, g: number, b: number) => boolean }[] = [
    { label: "Red", hex: "#DC2626", match: (r, g, b) => r > 150 && g < 80 && b < 80 },
    { label: "Maroon", hex: "#7F1D1D", match: (r, g, b) => r > 80 && r < 180 && g < 60 && b < 60 },
    { label: "Pink", hex: "#EC4899", match: (r, g, b) => r > 180 && g < 120 && b > 100 && b < 180 },
    { label: "Orange", hex: "#F97316", match: (r, g, b) => r > 200 && g > 80 && g < 170 && b < 80 },
    { label: "Gold", hex: "#C6A664", match: (r, g, b) => r > 150 && g > 120 && g < 200 && b < 100 && Math.abs(r - g) < 80 },
    { label: "Yellow", hex: "#EAB308", match: (r, g, b) => r > 180 && g > 170 && b < 80 },
    { label: "Green", hex: "#16A34A", match: (r, g, b) => g > 120 && r < g && b < g },
    { label: "Teal", hex: "#0D9488", match: (r, g, b) => g > 100 && b > 100 && r < 80 },
    { label: "Blue", hex: "#2563EB", match: (r, g, b) => b > 150 && r < b && g < b },
    { label: "Navy", hex: "#1B2A4A", match: (r, g, b) => b > r && b > g && r < 60 && g < 80 && b < 100 },
    { label: "Purple", hex: "#7C3AED", match: (r, g, b) => r > 80 && b > 120 && g < 80 },
    { label: "White", hex: "#FAFAF9", match: (r, g, b) => r > 230 && g > 230 && b > 230 },
    { label: "Ivory", hex: "#FFFDF9", match: (r, g, b) => r > 210 && g > 200 && b > 180 && r < 240 },
    { label: "Beige", hex: "#E7D8B8", match: (r, g, b) => r > 180 && g > 160 && b > 120 && r > b },
    { label: "Brown", hex: "#92400E", match: (r, g, b) => r > 80 && g > 40 && g < 120 && b < 80 && r > g },
    { label: "Black", hex: "#1A1A1A", match: (r, g, b) => r < 60 && g < 60 && b < 60 },
  ];

  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
  };

  const bucketColor = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    for (const bucket of COLOR_BUCKETS) {
      if (bucket.match(r, g, b)) return bucket;
    }
    return null;
  };

  const colorBucketMap = new Map<string, { label: string; hex: string }>();
  products.forEach((p) => p.colors.forEach((c) => {
    const bucket = bucketColor(c.hex);
    if (bucket && !colorBucketMap.has(bucket.label)) {
      colorBucketMap.set(bucket.label, { label: bucket.label, hex: bucket.hex });
    }
  }));
  const allColors = [...colorBucketMap.values()].sort((a, b) => a.label.localeCompare(b.label));

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
