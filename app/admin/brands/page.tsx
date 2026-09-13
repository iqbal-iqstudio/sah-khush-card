"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Plus, Trash2, X, ArrowUp, ArrowDown, GripVertical } from "lucide-react";

export default function AdminBrandsPage() {
  const brands = useAdminStore((s) => s.brands);
  const initBrands = useAdminStore((s) => s.initBrands);
  const addBrand = useAdminStore((s) => s.addBrand);
  const deleteBrand = useAdminStore((s) => s.deleteBrand);
  const moveBrand = useAdminStore((s) => s.moveBrand);

  const [newName, setNewName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    initBrands();
  }, [initBrands]);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    if (brands.some((b) => b.name.toLowerCase() === name.toLowerCase())) {
      alert("Brand already exists");
      return;
    }
    addBrand({ id: `brand-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name });
    setNewName("");
  };

  const handleDelete = (id: string) => {
    deleteBrand(id);
    setConfirmDelete(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-taupe">
          Manage the "Brands We House" marquee on the homepage. {brands.length} brand(s).
        </p>
      </div>

      {/* Add brand */}
      <div className="flex gap-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter brand name..."
          className="flex-1 rounded-lg border border-taupe/30 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brown sm:max-w-xs"
        />
        <button
          onClick={handleAdd}
          disabled={!newName.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add Brand
        </button>
      </div>

      {/* Preview marquee */}
      <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
        <p className="mb-3 text-xs font-medium text-taupe">Preview</p>
        <div className="overflow-hidden rounded-xl bg-alabaster py-4">
          <div className="flex w-max animate-marquee">
            {[0, 1, 2, 3].map((g) => (
              <div key={g} className="flex shrink-0 gap-12 whitespace-nowrap px-6">
                {brands.map((b) => (
                  <span key={`${g}-${b.id}`} className="font-serif text-xl text-taupe/60 grayscale">
                    {b.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands list */}
      <div className="rounded-2xl border border-taupe/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-taupe/15 bg-alabaster">
                <th className="w-10 px-4 py-3"></th>
                <th className="px-4 py-3 font-medium text-taupe">#</th>
                <th className="px-4 py-3 font-medium text-taupe">Brand Name</th>
                <th className="px-4 py-3 font-medium text-taupe text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-taupe">
                    No brands yet. Add your first brand.
                  </td>
                </tr>
              ) : (
                brands.map((brand, idx) => (
                  <tr key={brand.id} className="border-b border-taupe/10 transition hover:bg-ivory/50">
                    <td className="px-4 py-3 text-taupe">
                      <GripVertical className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3 text-taupe">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-charcoal">{brand.name}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => moveBrand(brand.id, -1)}
                          disabled={idx === 0}
                          className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-alabaster disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveBrand(brand.id, 1)}
                          disabled={idx === brands.length - 1}
                          className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-alabaster disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        {confirmDelete === brand.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(brand.id)}
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
                            onClick={() => setConfirmDelete(brand.id)}
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
      </div>
    </div>
  );
}
