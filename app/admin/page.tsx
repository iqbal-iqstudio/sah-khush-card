"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/admin-store";
import { formatBDT } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  MessageSquare,
  Mail,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  const products = useAdminStore((s) => s.products);
  const orders = useAdminStore((s) => s.orders);
  const messages = useAdminStore((s) => s.messages);
  const subscribers = useAdminStore((s) => s.subscribers);
  const initProducts = useAdminStore((s) => s.initProducts);

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const unreadMessages = messages.filter((m) => !m.read).length;
  const activeSubscribers = subscribers.filter((s) => s.active).length;

  const stats = [
    {
      label: "Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Revenue",
      value: formatBDT(totalRevenue),
      icon: TrendingUp,
      color: "bg-gold-soft text-brown",
    },
    {
      label: "Messages",
      value: unreadMessages > 0 ? `${unreadMessages} new` : messages.length,
      icon: MessageSquare,
      color: "bg-rose-50 text-rose-600",
    },
    {
      label: "Subscribers",
      value: activeSubscribers,
      icon: Mail,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Brands",
      value: [...new Set(products.map((p) => p.brand))].length,
      icon: Users,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const recentOrders = orders.slice(0, 5);
  const recentMessages = messages.filter((m) => !m.read).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-taupe/10 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-taupe">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-charcoal">{stat.value}</p>
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-serif text-lg font-semibold text-charcoal">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-taupe">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-taupe/10 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">{order.customer.name}</p>
                    <p className="text-xs text-taupe">
                      {new Date(order.date).toLocaleDateString()} · {order.items.length} item(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal">{formatBDT(order.total)}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        order.status === "delivered"
                          ? "bg-emerald-50 text-emerald-600"
                          : order.status === "cancelled"
                          ? "bg-red-50 text-red-600"
                          : "bg-gold-soft text-brown"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        <div className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-serif text-lg font-semibold text-charcoal">Unread Messages</h3>
          {recentMessages.length === 0 ? (
            <p className="py-8 text-center text-sm text-taupe">No unread messages</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-xl border border-taupe/10 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-charcoal">{msg.name}</p>
                    <p className="text-xs text-taupe">
                      {new Date(msg.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-taupe">{msg.subject}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-charcoal/70">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
