"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { formatBDT } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Plus, Pencil, Trash2, X, Download, Upload, Search } from "lucide-react";

const BRANDS = ["Charizma", "Bin Hameed", "Firdous"];
const FABRICS = ["Lawn", "Chiffon", "Organza", "Silk"];
const PIECES = ["1-Piece", "2-Piece", "3-Piece"];

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

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({
      id: `p${Date.now()}`,
      slug: "",
      name: "",
      brand: "Charizma",
      fabric: "Lawn",
      pieceType: "3-Piece",
      price: 0,
      availability: "stock",
      rating: 4.5,
      sold: 0,
      image: "",
      lifestyle: "",
      gallery: [],
      colors: [],
      fabricBreakdown: { shirt: "", dupatta: "", trouser: "", aesthetic: "" },
      description: "",
      stitchingPrice: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.slug) return;
    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct(form as Product);
    }
    setModalOpen(false);
    setEditing(null);
    setForm({});
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  const handleExport = () => {
    const json = exportProducts();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sah-khush-products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          importProducts(data);
        }
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-taupe/30 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brown"
          />
        </div>
        <div className="flex gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-taupe/30 bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown">
            <Upload className="h-4 w-4" />
            Import
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-taupe/30 bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto rounded-2xl border border-taupe/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-taupe/15 bg-alabaster">
              <th className="px-4 py-3 font-medium text-taupe">Product</th>
              <th className="px-4 py-3 font-medium text-taupe">Brand</th>
              <th className="px-4 py-3 font-medium text-taupe">Fabric</th>
              <th className="px-4 py-3 font-medium text-taupe">Price</th>
              <th className="px-4 py-3 font-medium text-taupe">Status</th>
              <th className="px-4 py-3 font-medium text-taupe text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-taupe">
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-taupe/10 transition hover:bg-ivory/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
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
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        p.availability === "stock"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {p.availability}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {confirmDelete === p.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="rounded-lg border border-taupe/30 px-3 py-1.5 text-xs font-medium text-taupe transition hover:border-taupe"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(p.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-taupe">
        {filtered.length} of {products.length} products
      </p>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-lift">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => { setModalOpen(false); setEditing(null); }}
                className="grid h-8 w-8 place-items-center rounded-full border border-taupe/20 transition hover:border-brown hover:text-brown"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Name *</label>
                  <input
                    value={form.name || ""}
                    onChange={(e) => setField("name", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Slug *</label>
                  <input
                    value={form.slug || ""}
                    onChange={(e) => setField("slug", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Brand</label>
                  <select
                    value={form.brand || "Charizma"}
                    onChange={(e) => setField("brand", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  >
                    {BRANDS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Fabric</label>
                  <select
                    value={form.fabric || "Lawn"}
                    onChange={(e) => setField("fabric", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  >
                    {FABRICS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Piece Type</label>
                  <select
                    value={form.pieceType || "3-Piece"}
                    onChange={(e) => setField("pieceType", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  >
                    {PIECES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Price (৳)</label>
                  <input
                    type="number"
                    value={form.price || 0}
                    onChange={(e) => setField("price", Number(e.target.value))}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Compare Price (৳)</label>
                  <input
                    type="number"
                    value={form.compareAtPrice || 0}
                    onChange={(e) => setField("compareAtPrice", Number(e.target.value))}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Stitching Price (৳)</label>
                  <input
                    type="number"
                    value={form.stitchingPrice || 0}
                    onChange={(e) => setField("stitchingPrice", Number(e.target.value))}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Image URL</label>
                  <input
                    value={form.image || ""}
                    onChange={(e) => setField("image", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-taupe">Availability</label>
                  <select
                    value={form.availability || "stock"}
                    onChange={(e) => setField("availability", e.target.value)}
                    className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                  >
                    <option value="stock">In Stock</option>
                    <option value="preorder">Pre-order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-taupe">Description</label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) => setField("description", e.target.value)}
                  className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => { setModalOpen(false); setEditing(null); }}
                  className="rounded-full border border-taupe/30 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.name || !form.slug}
                  className="rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-50"
                >
                  {editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
