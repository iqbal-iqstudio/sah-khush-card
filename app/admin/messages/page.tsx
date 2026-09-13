"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Search, Trash2, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";

export default function AdminMessagesPage() {
  const messages = useAdminStore((s) => s.messages);
  const markRead = useAdminStore((s) => s.markRead);
  const deleteMessage = useAdminStore((s) => s.deleteMessage);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter((m) => !m.read).length;
  const selectedMsg = messages.find((m) => m.id === selected);

  const handleOpen = (id: string) => {
    setSelected(id);
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.read) markRead(id);
  };

  if (selectedMsg) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-2 text-sm text-taupe transition hover:text-brown"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to messages
        </button>
        <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {selectedMsg.subject}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-taupe">
                <span className="font-medium text-charcoal">{selectedMsg.name}</span>
                <span>&lt;{selectedMsg.email}&gt;</span>
                {selectedMsg.phone && <span>{selectedMsg.phone}</span>}
              </div>
              <p className="mt-1 text-xs text-taupe">
                {new Date(selectedMsg.date).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-ivory p-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-charcoal">
              {selectedMsg.message}
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
              className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-2.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift"
            >
              <Mail className="h-4 w-4" />
              Reply via Email
            </a>
            <button
              onClick={() => {
                if (confirm("Delete this message?")) {
                  deleteMessage(selectedMsg.id);
                  setSelected(null);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-taupe/30 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brown"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase transition ${
                filter === f
                  ? "bg-brown text-ivory"
                  : "border border-taupe/30 bg-white text-taupe hover:border-brown hover:text-brown"
              }`}
            >
              {f} {f === "unread" ? `(${unreadCount})` : f === "all" ? `(${messages.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-taupe/10 bg-white py-12 text-center text-taupe">
            No messages found
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpen(msg.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition hover:shadow-md ${
                msg.read
                  ? "border-taupe/10 bg-white"
                  : "border-gold/30 bg-gold-soft/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
                      msg.read
                        ? "bg-taupe/10 text-taupe"
                        : "bg-gold text-brown"
                    }`}
                  >
                    {msg.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${msg.read ? "text-charcoal" : "text-charcoal font-semibold"}`}>
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <span className="h-2 w-2 rounded-full bg-gold" />
                      )}
                    </div>
                    <p className="text-xs text-taupe">{msg.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-taupe">
                    {new Date(msg.date).toLocaleDateString()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this message?")) deleteMessage(msg.id);
                    }}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-taupe transition hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 pl-13 text-sm text-charcoal/60">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
