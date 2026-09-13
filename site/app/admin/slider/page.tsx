"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import type { HomeSlide } from "@/types/admin";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDelete from "@/components/admin/AdminConfirmDelete";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";

export default function AdminSliderPage() {
  const slides = useAdminStore((s) => s.slides);
  const initSlides = useAdminStore((s) => s.initSlides);
  const addSlide = useAdminStore((s) => s.addSlide);
  const updateSlide = useAdminStore((s) => s.updateSlide);
  const deleteSlide = useAdminStore((s) => s.deleteSlide);
  const moveSlide = useAdminStore((s) => s.moveSlide);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HomeSlide | null>(null);
  const [form, setForm] = useState<Partial<HomeSlide>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { initSlides(); }, [initSlides]);

  const openAdd = () => {
    setEditing(null);
    setForm({ id: `slide-${Date.now()}`, eyebrow: "", title: "", copy: "", cta: "Shop Now", href: "/products", image: "" });
    setModalOpen(true);
  };

  const openEdit = (s: HomeSlide) => { setEditing(s); setForm({ ...s }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.title || !form.image) return;
    if (editing) updateSlide(editing.id, form);
    else addSlide(form as HomeSlide);
    setModalOpen(false); setEditing(null); setForm({});
  };

  const handleDelete = (id: string) => { deleteSlide(id); setConfirmDelete(null); };
  const setField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-taupe">Manage the homepage hero slider. {slides.length} slide(s).</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2 text-xs font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift">
          <Plus className="h-3.5 w-3.5" /> Add Slide
        </button>
      </div>

      <div className="space-y-4">
        {slides.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-taupe/10 bg-white py-16">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-taupe/5 text-taupe/30"><ImageIcon className="h-7 w-7" /></div>
            <p className="mt-3 font-serif text-lg text-charcoal">No slides yet</p>
            <p className="text-sm text-taupe">Add your first hero slide.</p>
          </div>
        ) : slides.map((slide, idx) => (
          <div key={slide.id} className="rounded-2xl border border-taupe/10 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex gap-4 p-4">
              <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl bg-alabaster">
                {slide.image ? (
                  <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-taupe"><ImageIcon className="h-8 w-8" /></div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-brown/80 px-2 py-0.5 text-[10px] font-bold text-ivory">#{idx + 1}</span>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-gold">{slide.eyebrow}</p>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">{slide.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-taupe">{slide.copy}</p>
                  <p className="mt-1 text-xs text-taupe">CTA: <span className="font-medium text-charcoal">{slide.cta}</span> → {slide.href}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => moveSlide(slide.id, -1)} disabled={idx === 0} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-alabaster disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button onClick={() => moveSlide(slide.id, 1)} disabled={idx === slides.length - 1} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-alabaster disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => openEdit(slide)} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-blue-50 hover:text-blue-600"><Pencil className="h-4 w-4" /></button>
                {confirmDelete === slide.id ? (
                  <AdminConfirmDelete onConfirm={() => handleDelete(slide.id)} onCancel={() => setConfirmDelete(null)} />
                ) : (
                  <button onClick={() => setConfirmDelete(slide.id)} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? "Edit Slide" : "Add Slide"} maxWidth="max-w-lg">
        <div className="space-y-4">
          {form.image && (
            <div className="relative h-40 overflow-hidden rounded-xl bg-alabaster">
              <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Image URL or Path *</label>
            <input value={form.image || ""} onChange={(e) => setField("image", e.target.value)} placeholder="/slide1.jpg or https://..." className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Eyebrow (small label above title)</label>
            <input value={form.eyebrow || ""} onChange={(e) => setField("eyebrow", e.target.value)} placeholder="The Charizma Edit" className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Title *</label>
            <input value={form.title || ""} onChange={(e) => setField("title", e.target.value)} placeholder="Summer Lawn, Reimagined" className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Description</label>
            <textarea rows={2} value={form.copy || ""} onChange={(e) => setField("copy", e.target.value)} placeholder="Breathable, vibrant, perfect for Dhaka summers." className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Button Text</label>
              <input value={form.cta || ""} onChange={(e) => setField("cta", e.target.value)} placeholder="Shop Now" className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Button Link</label>
              <input value={form.href || ""} onChange={(e) => setField("href", e.target.value)} placeholder="/products" className="w-full rounded-xl border border-taupe/20 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setModalOpen(false); setEditing(null); }} className="rounded-full border border-taupe/30 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown">Cancel</button>
            <button onClick={handleSave} disabled={!form.title || !form.image} className="rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-50">
              {editing ? "Save Changes" : "Add Slide"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
