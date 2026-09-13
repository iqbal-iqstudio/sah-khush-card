"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Save, RotateCcw } from "lucide-react";

export default function AdminSettingsPage() {
  const settings = useAdminStore((s) => s.settings);
  const updateSettings = useAdminStore((s) => s.updateSettings);
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const setField = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setForm({ ...settings });
    setSaved(false);
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
        <h3 className="mb-6 font-serif text-lg font-semibold text-charcoal">Store Information</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Store Name</label>
              <input
                value={form.storeName}
                onChange={(e) => setField("storeName", e.target.value)}
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Store Email</label>
              <input
                type="email"
                value={form.storeEmail}
                onChange={(e) => setField("storeEmail", e.target.value)}
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Phone</label>
              <input
                value={form.storePhone}
                onChange={(e) => setField("storePhone", e.target.value)}
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">WhatsApp Number</label>
              <input
                value={form.whatsappNumber}
                onChange={(e) => setField("whatsappNumber", e.target.value)}
                placeholder="8801XXXXXXXXX"
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-taupe">Store Address</label>
            <input
              value={form.storeAddress}
              onChange={(e) => setField("storeAddress", e.target.value)}
              className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
        <h3 className="mb-6 font-serif text-lg font-semibold text-charcoal">Shipping & Payment</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">
                Free Shipping Threshold (৳)
              </label>
              <input
                type="number"
                value={form.freeShippingThreshold}
                onChange={(e) => setField("freeShippingThreshold", Number(e.target.value))}
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-taupe">Currency</label>
              <input
                value={form.currency}
                onChange={(e) => setField("currency", e.target.value)}
                className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-brown"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="inline-flex items-center gap-2 rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
        {hasChanges && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-taupe/30 px-5 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
