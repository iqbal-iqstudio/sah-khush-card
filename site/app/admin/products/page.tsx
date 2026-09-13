"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDelete from "@/components/admin/AdminConfirmDelete";
import { Plus, Pencil, Trash2, Download, Upload, Package } from "lucide-react";

const BRANDS = ["Charizma", "Bin Hameed", "Firdous", "Sapphire", "Elan", "Maria B", "Sana Safinaz", "Alkaram"];
const FABRICS = ["Lawn", "Chiffon", "Organza", "Silk", "Cotton", "Linen"];
const PIECES = ["1-Piece", "2-Piece", "3-Piece"];
const BADGES = ["", "New Season", "Trending", "Low Stock", "Original"];

export default function AdminProductsPage() {
  const products = useAdminStore((s) => s.products);
  const addProduct = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const exportProducts = useAdminStore((s) => s.exportProducts);
  const importProducts = useAdminStore((s) => s.importProducts);
  const initProducts = useAdminStore((s) => s.initProducts);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [newBrand, setNewBrand] = useState("");
  const [newFabric, setNewFabric] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => { initProducts(); }, [initProducts]);

  const allBrands = [...new Set([...BRANDS, ...products.map((p) => p.brand)])];
  const allFabrics = [...new Set([...FABRICS, ...products.map((p) => p.fabric)])];

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({
      id: `p${Date.now()}`, slug: "", name: "", brand: "Charizma", fabric: "Lawn",
      pieceType: "3-Piece", price: 0, availability: "stock", rating: 0, sold: 0,
      image: "", lifestyle: "", gallery: [], colors: [],
      fabricBreakdown: { shirt: "", dupatta: "", trouser: "", aesthetic: "" },
      description: "", stitchingPrice: 0, badge: "",
    });
    setNewBrand(""); setNewFabric(""); setImageUrl(""); setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p); setForm({ ...p });
    setNewBrand(""); setNewFabric(""); setImageUrl(""); setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.slug) return;
    const data = { ...form };
    if (newBrand.trim()) data.brand = newBrand.trim();
    if (newFabric.trim()) data.fabric = newFabric.trim();
    if (editing) updateProduct(editing.id, data);
    else addProduct(data as Product);
    setModalOpen(false); setEditing(null); setForm({});
  };

  const handleDelete = (id: string) => { deleteProduct(id); setConfirmDelete(null); };

  const handleExport = () => {
    const json = exportProducts();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "sah-khush-products.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) importProducts(data);
      } catch { alert("Invalid JSON file"); }
    };
    reader.readAsText(file); e.target.value = "";
  };

  const setField = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const addImageUrl = () => {
    if (!imageUrl.trim()) return;
    const gallery = form.gallery || [];
    setField("gallery", [...gallery, imageUrl.trim()]);
    if (!form.image) setField("image", imageUrl.trim());
    setImageUrl("");
  };

  const removeGalleryImage = (idx: number) => {
    const gallery = [...(form.gallery || [])]; gallery.splice(idx, 1); setField("gallery", gallery);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 sm:max-w-xs">
          <AdminSearch value={search} onChange={setSearch} placeholder="Search products..." />
        </div>
        <div className="flex gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-taupe/20 bg-white px-4 py-2 text-xs font-medium text-charcoal transition hover:border-gold/40 hover:text-brown">
            <Upload className="h-3.5 w-3.5" /> Import
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-full border border-taupe/20 bg-white px-4 py-2 text-xs font-medium text-charcoal transition hover:border-gold/40 hover:text-brown">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2 text-xs font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift">
            <Plus className="h-3.5 w-3.5" /> Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-taupe/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-taupe/10 bg-alabaster">
              <th className="px-4 py-3 font-medium text-taupe">Product</th>
              <th className="px-4 py-3 font-medium text-taupe">Brand</th>
              <th className="px-4 py-3 font-medium text-taupe">Fabric</th>
              <th className="px-4 py-3 font-medium text-taupe">Price</th>
              <th className="px-4 py-3 font-medium text-taupe">Status</th>
              <th className="px-4 py-3 font-medium text-taupe">Label</th>
              <th className="px-4 py-3 font-medium text-taupe text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-taupe">No products found</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="border-b border-taupe/10 transition hover:bg-ivory/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-charcoal line-clamp-1">{p.name}</p>
                      <p className="text-xs text-taupe">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-charcoal">{p.brand}</td>
                <td className="px-4 py-3 text-charcoal">{p.fabric}</td>
                <td className="px-4 py-3 font-medium text-charcoal">{formatBDT(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    p.availability === "stock" ? "bg-emerald-50 text-emerald-600" :
                    p.availability === "stockout" ? "bg-red-50 text-red-600" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {p.availability === "stockout" ? "Stock Out" : p.availability}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.badge ? (
                    <span className="inline-block rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">{p.badge}</span>
                  ) : <span className="text-taupe text-xs">—</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-blue-50 hover:text-blue-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    {confirmDelete === p.id ? (
                      <AdminConfirmDelete onConfirm={() => handleDelete(p.id)} onCancel={() => setConfirmDelete(null)} />
                    ) : (
                      <button onClick={() => setConfirmDelete(p.id)} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-taupe">{filtered.length} of {products.length} products</p>

      <AdminModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? "Edit Product" : "Add Product"}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Name *</label>
              <input value={form.name || ""} onChange={(e) => setField("name", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Slug *</label>
              <input value={form.slug || ""} onChange={(e) => setField("slug", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Brand</label>
              <select value={BRANDS.includes(form.brand || "") ? form.brand : "__custom"} onChange={(e) => { if (e.target.value === "__custom") { setField("brand", newBrand || ""); } else { setField("brand", e.target.value); setNewBrand(""); } }} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30">
                {allBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                <option value="__custom">Other (type below)</option>
              </select>
              {!BRANDS.includes(form.brand || "") && (
                <input value={newBrand || form.brand || ""} onChange={(e) => { setNewBrand(e.target.value); setField("brand", e.target.value); }} placeholder="Enter brand name" className="mt-2 w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Fabric</label>
              <select value={FABRICS.includes(form.fabric || "") ? form.fabric : "__custom"} onChange={(e) => { if (e.target.value === "__custom") { setField("fabric", newFabric || ""); } else { setField("fabric", e.target.value); setNewFabric(""); } }} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30">
                {allFabrics.map((f) => <option key={f} value={f}>{f}</option>)}
                <option value="__custom">Other (type below)</option>
              </select>
              {!FABRICS.includes(form.fabric || "") && (
                <input value={newFabric || form.fabric || ""} onChange={(e) => { setNewFabric(e.target.value); setField("fabric", e.target.value); }} placeholder="Enter fabric name" className="mt-2 w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Piece Type</label>
              <select value={form.pieceType || "3-Piece"} onChange={(e) => setField("pieceType", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30">
                {PIECES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Price (৳)</label>
              <input type="number" value={form.price || 0} onChange={(e) => setField("price", Number(e.target.value))} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Compare Price (৳)</label>
              <input type="number" value={form.compareAtPrice || 0} onChange={(e) => setField("compareAtPrice", Number(e.target.value))} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Availability</label>
              <select value={form.availability || "stock"} onChange={(e) => setField("availability", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30">
                <option value="stock">In Stock</option>
                <option value="preorder">Pre-order</option>
                <option value="stockout">Stock Out</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Label</label>
              <select value={form.badge || ""} onChange={(e) => setField("badge", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30">
                {BADGES.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Images (URL)</label>
            <div className="flex gap-2">
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image URL..." className="flex-1 rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }} />
              <button onClick={addImageUrl} type="button" className="rounded-xl bg-brown px-4 py-2.5 text-sm font-medium text-ivory transition hover:bg-brown-deep">Add</button>
            </div>
            {form.gallery && form.gallery.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {form.gallery.map((g, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-taupe/20">
                    <img src={g} alt="" className="h-20 w-full object-cover" />
                    <button onClick={() => removeGalleryImage(i)} className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-charcoal/60 text-white opacity-0 transition group-hover:opacity-100">
                      <span className="text-xs">×</span>
                    </button>
                    {i === 0 && <span className="absolute bottom-0 left-0 bg-brown px-1.5 py-0.5 text-[8px] text-ivory">Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Description</label>
            <textarea rows={3} value={form.description || ""} onChange={(e) => setField("description", e.target.value)} className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setModalOpen(false); setEditing(null); }} className="rounded-full border border-taupe/30 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown">Cancel</button>
            <button onClick={handleSave} disabled={!form.name || !form.slug} className="rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-50">
              {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
