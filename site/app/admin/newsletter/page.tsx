"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminFilterPills from "@/components/admin/AdminFilterPills";
import AdminConfirmDelete from "@/components/admin/AdminConfirmDelete";
import { StatCard } from "@/components/admin/AdminCards";
import { Trash2, Download, UserPlus, Mail, MailX } from "lucide-react";

export default function AdminNewsletterPage() {
  const subscribers = useAdminStore((s) => s.subscribers);
  const removeSubscriber = useAdminStore((s) => s.removeSubscriber);
  const toggleActive = useAdminStore((s) => s.toggleActive);
  const exportSubscribers = useAdminStore((s) => s.exportSubscribers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Subscribers" value={subscribers.length} icon={Mail} color="bg-purple-50 text-purple-600" />
        <StatCard label="Active" value={activeCount} icon={UserPlus} color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Unsubscribed" value={subscribers.length - activeCount} icon={MailX} color="bg-taupe/10 text-taupe" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 sm:max-w-xs">
          <AdminSearch value={search} onChange={setSearch} placeholder="Search subscribers..." />
        </div>
        <AdminFilterPills
          active={filter}
          onChange={setFilter}
          pills={[
            { label: "All", value: "all", count: subscribers.length },
            { label: "Active", value: "active", count: activeCount },
            { label: "Inactive", value: "inactive", count: subscribers.length - activeCount },
          ]}
        />
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="inline-flex items-center gap-2 rounded-full border border-taupe/20 bg-white px-4 py-2 text-xs font-medium text-charcoal transition hover:border-gold/40 hover:text-brown">
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-full border border-taupe/20 bg-white px-4 py-2 text-xs font-medium text-charcoal transition hover:border-gold/40 hover:text-brown">
            <Download className="h-3.5 w-3.5" /> JSON
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-taupe/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-taupe/10 bg-alabaster">
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
                <td colSpan={5} className="px-4 py-12 text-center text-taupe">No subscribers found</td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="border-b border-taupe/10 transition hover:bg-ivory/50">
                  <td className="px-4 py-3 font-medium text-charcoal">{sub.email}</td>
                  <td className="px-4 py-3 text-charcoal">{sub.name || "—"}</td>
                  <td className="px-4 py-3 text-taupe">{new Date(sub.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${sub.active ? "bg-emerald-50 text-emerald-600" : "bg-taupe/10 text-taupe"}`}>
                      {sub.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleActive(sub.id)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-taupe transition hover:bg-gold-soft hover:text-brown">
                        {sub.active ? "Unsubscribe" : "Reactivate"}
                      </button>
                      {confirmDeleteId === sub.id ? (
                        <AdminConfirmDelete
                          onConfirm={() => { removeSubscriber(sub.id); setConfirmDeleteId(null); }}
                          onCancel={() => setConfirmDeleteId(null)}
                        />
                      ) : (
                        <button onClick={() => setConfirmDeleteId(sub.id)} className="grid h-8 w-8 place-items-center rounded-lg text-taupe transition hover:bg-red-50 hover:text-red-600">
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
        {filtered.length} of {subscribers.length} subscribers
      </p>
    </div>
  );
}
