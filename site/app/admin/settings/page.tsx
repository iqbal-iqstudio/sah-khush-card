"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { InputField } from "@/components/admin/AdminForm";
import { Save, RotateCcw, Store } from "lucide-react";

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
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal">Store Information</h3>
            <p className="text-xs text-taupe">Manage your store details</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Store Name" value={form.storeName} onChange={(e) => setField("storeName", e.target.value)} />
            <InputField label="Store Email" type="email" value={form.storeEmail} onChange={(e) => setField("storeEmail", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Phone" value={form.storePhone} onChange={(e) => setField("storePhone", e.target.value)} />
            <InputField label="WhatsApp Number" value={form.whatsappNumber} onChange={(e) => setField("whatsappNumber", e.target.value)} placeholder="8801XXXXXXXXX" />
          </div>
          <InputField label="Store Address" value={form.storeAddress} onChange={(e) => setField("storeAddress", e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Save className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-charcoal">Shipping & Payment</h3>
            <p className="text-xs text-taupe">Configure delivery and currency</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Free Shipping Threshold (৳)" type="number" value={form.freeShippingThreshold} onChange={(e) => setField("freeShippingThreshold", Number(e.target.value))} />
          <InputField label="Currency" value={form.currency} onChange={(e) => setField("currency", e.target.value)} />
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
