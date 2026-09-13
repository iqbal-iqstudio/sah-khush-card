"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Search, Trash2, Download, Upload, UserPlus, Mail, MailX } from "lucide-react";

export default function AdminNewsletterPage() {
  const subscribers = useAdminStore((s) => s.subscribers);
  const removeSubscriber = useAdminStore((s) => s.removeSubscriber);
  const toggleActive = useAdminStore((s) => s.toggleActive);
  const exportSubscribers = useAdminStore((s) => s.exportSubscribers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = subscribers.filter((s) => {
    const matchSearch =
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()));
    const matchFilter =
      filter === "all" ||
      (filter === "active" && s.active) ||
      (filter === "inactive" && !s.active);
    return matchSearch && matchFilter;
  });

  const activeCount = subscribers.filter((s) => s.active).length;

  const handleExport = () => {
    const json = exportSubscribers();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sah-khush-subscribers.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const header = "Email,Name,Date,Active\n";
    const rows = subscribers
      .map((s) => `${s.email},"${s.name || ""}",${new Date(s.date).toLocaleDateString()},${s.active}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sah-khush-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-taupe/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-taupe">Total Subscribers</p>
              <p className="mt-1 text-2xl font-bold text-charcoal">{subscribers.length}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-50 text-purple-600">
              <Mail className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-taupe/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-taupe">Active</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">{activeCount}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-taupe/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-taupe">Unsubscribed</p>
              <p className="mt-1 text-2xl font-bold text-taupe">
                {subscribers.length - activeCount}
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-taupe/10 text-taupe">
              <MailX className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-taupe/30 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brown"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase transition ${
                filter === f
                  ? "bg-brown text-ivory"
                  : "border border-taupe/30 bg-white text-taupe hover:border-brown hover:text-brown"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-full border border-taupe/30 bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-full border border-taupe/30 bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition hover:border-brown hover:text-brown"
          >
            <Download className="h-4 w-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Subscribers table */}
      <div className="overflow-x-auto rounded-2xl border border-taupe/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-taupe/15 bg-alabaster">
              <th className="px-4 py-3 font-medium text-taupe">Email</th>
              <th className="px-4 py-3 font-medium text-taupe">Name</th>
              <th className="px-4 py-3 font-medium text-taupe">Date</th>
              <th className="px-4 py-3 font-medium text-taupe">Status</th>
              <th className="px-4 py-3 font-medium text-taupe text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-taupe">
                  No subscribers found
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="border-b border-taupe/10 transition hover:bg-ivory/50">
                  <td className="px-4 py-3 font-medium text-charcoal">{sub.email}</td>
                  <td className="px-4 py-3 text-charcoal">{sub.name || "—"}</td>
                  <td className="px-4 py-3 text-taupe">
                    {new Date(sub.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        sub.active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-taupe/10 text-taupe"
                      }`}
                    >
                      {sub.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleActive(sub.id)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-taupe transition hover:bg-gold-soft hover:text-brown"
                      >
                        {sub.active ? "Unsubscribe" : "Reactivate"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Remove this subscriber?")) removeSubscriber(sub.id);
                        }}
                        className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-taupe">
        {filtered.length} of {subscribers.length} subscribers
      </p>
    </div>
  );
}
