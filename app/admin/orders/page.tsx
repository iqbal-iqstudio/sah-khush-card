"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { formatBDT } from "@/lib/utils";
import type { AdminOrder } from "@/types/admin";
import { Search, Trash2, ChevronDown } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-blue-50 text-blue-600",
  shipped: "bg-purple-50 text-purple-600",
  delivered: "bg-emerald-50 text-emerald-600",
  cancelled: "bg-red-50 text-red-600",
};

export default function AdminOrdersPage() {
  const orders = useAdminStore((s) => s.orders);
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus);
  const deleteOrder = useAdminStore((s) => s.deleteOrder);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Status summary */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase transition ${
              filterStatus === s
                ? "bg-brown text-ivory"
                : "border border-taupe/30 bg-white text-taupe hover:border-brown hover:text-brown"
            }`}
          >
            {s} {s !== "all" ? `(${statusCounts[s] || 0})` : `(${orders.length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-taupe/30 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brown"
        />
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-taupe/10 bg-white py-12 text-center text-taupe">
            No orders found
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-taupe/10 bg-white shadow-sm transition hover:shadow-md"
            >
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-charcoal">{order.customer.name}</p>
                    <p className="text-xs text-taupe">
                      {order.id} · {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="font-semibold text-charcoal">{formatBDT(order.total)}</p>
                  <ChevronDown
                    className={`h-4 w-4 text-taupe transition-transform ${
                      expanded === order.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expanded === order.id && (
                <div className="border-t border-taupe/10 p-4">
                  <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-taupe">Customer</p>
                      <p className="text-sm text-charcoal">{order.customer.name}</p>
                      <p className="text-sm text-charcoal">{order.customer.email}</p>
                      <p className="text-sm text-charcoal">{order.customer.phone}</p>
                      <p className="text-sm text-charcoal">{order.customer.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-taupe">Payment</p>
                      <p className="text-sm text-charcoal">{order.paymentMethod}</p>
                      {order.notes && (
                        <>
                          <p className="mt-2 text-xs font-medium text-taupe">Notes</p>
                          <p className="text-sm text-charcoal">{order.notes}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-taupe mb-2">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-ivory px-3 py-2 text-sm">
                          <div>
                            <span className="font-medium text-charcoal">{item.name}</span>
                            <span className="ml-2 text-taupe">× {item.qty}</span>
                            {item.stitching && (
                              <span className="ml-2 rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-semibold text-brown">
                                Stitched
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-charcoal">
                            {formatBDT(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as AdminOrder["status"])
                      }
                      className="rounded-lg border border-taupe/30 bg-ivory px-3 py-2 text-sm outline-none focus:border-brown"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => {
                        if (confirm("Delete this order?")) deleteOrder(order.id);
                      }}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
