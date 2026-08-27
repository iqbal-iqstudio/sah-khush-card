"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Truck, Zap } from "lucide-react";
import { useCartStore, selectSubtotal } from "@/store/cart-store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatBDT } from "@/lib/utils";

const DELIVERY: Record<string, number> = { inside: 70, outside: 130 };
const EXPRESS_FEE = 50;
const AGENT_NUMBER = "01700-000000";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);

  const [form, setForm] = useState({ name: "", phone: "", address: "", district: "" });
  const [shipDifferent, setShipDifferent] = useState(false);
  const [shipName, setShipName] = useState("");
  const [shipPhone, setShipPhone] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [payMode, setPayMode] = useState<"full" | "cod">("full");
  const [payMethod, setPayMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [trxId, setTrxId] = useState("");
  const [done, setDone] = useState(false);

  const delivery = form.district ? DELIVERY[form.district] : 0;
  const expressFee = method === "express" ? EXPRESS_FEE : 0;
  const total = subtotal + delivery + expressFee;
  const advance = delivery + expressFee;

  const methodLabel = payMethod.charAt(0).toUpperCase() + payMethod.slice(1);
  const areaLabel = form.district === "inside" ? "Inside Dhaka" : form.district === "outside" ? "Outside Dhaka" : "—";
  const deliveryText = form.district ? `${formatBDT(delivery)} (${areaLabel})` : "Select your area";

  if (done) {
    return (
      <div className="container-shell py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brown" />
        <h1 className="font-serif text-3xl mt-4">Booking Confirmed</h1>
        <p className="mt-2 text-taupe">
          {payMode === "full"
            ? `Thank you ${form.name}. We've received your full payment of ${formatBDT(total)} via ${methodLabel}.`
            : `Thank you ${form.name}. Please keep ${formatBDT(total)} ready as Cash on Delivery.`}
        </p>
        <Button href="/products" variant="brown" className="mt-6">Continue Shopping</Button>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="container-shell py-24 text-center"><p className="font-serif text-2xl">Your bag is empty</p><Button href="/products" variant="brown" className="mt-4">Shop Now</Button></div>;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.district) { alert("Please select your district / area."); return; }
    // In production: POST order to backend / trigger mobile-banking checkout.
    useCartStore.setState({ items: [] });
    setDone(true);
  };

  return (
    <div className="container-shell py-10">
      <p className="eyebrow">Secure Checkout</p>
      <h1 className="font-serif text-3xl sm:text-4xl mt-2 mb-2">Checkout</h1>
      <div className="mb-8 flex items-center gap-2 text-sm text-taupe">
        <span className="font-semibold text-brown">1 · Contact</span><span>→</span>
        <span className="font-semibold text-brown">2 · Delivery</span><span>→</span>
        <span className="font-semibold text-brown">3 · Payment</span>
      </div>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Step 1 */}
          <section className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl mb-4">Contact & Delivery</h2>
            <div className="space-y-4">
              <Input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Active Phone Number (01XXXXXXXXX)" pattern="01[0-9]{9}" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Contact Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input type="checkbox" checked={shipDifferent} onChange={(e) => setShipDifferent(e.target.checked)} className="accent-brown" />
                Deliver to a different address
              </label>
              {shipDifferent && (
                <div className="space-y-4">
                  <Input placeholder="Receiver Name" value={shipName} onChange={(e) => setShipName(e.target.value)} />
                  <Input placeholder="Receiver Phone Number" value={shipPhone} onChange={(e) => setShipPhone(e.target.value)} />
                  <Input placeholder="Receiver Delivery Address" value={shipAddress} onChange={(e) => setShipAddress(e.target.value)} />
                </div>
              )}
              <select required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 text-sm outline-none focus:border-brown">
                <option value="">Select Delivery Area…</option>
                <optgroup label="Inside Dhaka"><option value="inside">Inside Dhaka (Gulshan, Banani, Dhanmondi)</option></optgroup>
                <optgroup label="Outside Dhaka"><option value="outside">Outside Dhaka (Chittagong, Sylhet…)</option></optgroup>
              </select>
            </div>
          </section>

          {/* Step 2 */}
          <section className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl mb-4">Delivery Method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setMethod("standard")} className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left ${method === "standard" ? "border-brown bg-alabaster" : "border-taupe/30"}`}>
                <Truck className="h-6 w-6 text-brown" /><div><p className="text-sm font-semibold">Standard</p><p className="text-xs text-taupe">2–4 days · {form.district ? formatBDT(delivery) : "৳70–130"}</p></div>
              </button>
              <button type="button" onClick={() => setMethod("express")} className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left ${method === "express" ? "border-brown bg-alabaster" : "border-taupe/30"}`}>
                <Zap className="h-6 w-6 text-gold" /><div><p className="text-sm font-semibold">Express</p><p className="text-xs text-taupe">1 day · +৳{EXPRESS_FEE}</p></div>
              </button>
            </div>
          </section>

          {/* Step 3 */}
          <section className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl mb-4">Payment</h2>
            <div className="space-y-3">
              <PaymentOption active={payMode === "full"} onClick={() => setPayMode("full")} title="Full Payment" subtitle="Pay the complete amount online now." />
              <PaymentOption active={payMode === "cod"} onClick={() => setPayMode("cod")} title="Cash on Delivery (COD)" subtitle="Pay the full amount when your order arrives." />
            </div>

            <p className="mb-2 mt-5 text-sm font-semibold">Pay via</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "bkash", label: "bKash" },
                { id: "nagad", label: "Nagad" },
                { id: "rocket", label: "Rocket" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id as "bkash" | "nagad" | "rocket")}
                  className={`rounded-xl border-2 py-2.5 text-sm font-medium transition ${
                    payMethod === m.id ? "border-brown bg-alabaster text-brown" : "border-taupe/30 text-charcoal hover:border-brown/50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-alabaster p-3 text-xs text-taupe space-y-2">
              {payMode === "full" ? (
                <>
                  <p className="font-semibold text-charcoal">Payable now: {formatBDT(total)} (full amount)</p>
                  <p>Send via <b className="text-charcoal">{methodLabel}</b> to agent number <b className="text-charcoal">{AGENT_NUMBER}</b>, then enter the Transaction ID below.</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-charcoal">Payable now: {formatBDT(advance)} (delivery charge)</p>
                  <p>Remaining <b className="text-charcoal">{formatBDT(subtotal)}</b> payable on delivery after receiving the product.</p>
                  <p>Send via <b className="text-charcoal">{methodLabel}</b> to agent number <b className="text-charcoal">{AGENT_NUMBER}</b>, then enter the Transaction ID below.</p>
                </>
              )}

              <Input placeholder="Transaction ID" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="text-xs" />
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl mb-4">Summary</h2>
            <div className="max-h-48 space-y-2 overflow-y-auto text-sm">
              {items.map((i) => (
                <div key={i.key} className="flex justify-between gap-2">
                  <span className="truncate">{i.name} ×{i.qty}</span>
                  <span>{formatBDT(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1 border-t border-taupe/20 pt-3 text-sm">
              <div className="flex justify-between"><span className="text-taupe">Subtotal</span><span>{formatBDT(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-taupe">Delivery</span><span>{delivery === 0 ? "Select area" : formatBDT(delivery)}</span></div>
              {expressFee > 0 && <div className="flex justify-between"><span className="text-taupe">Express</span><span>{formatBDT(expressFee)}</span></div>}
              {payMode === "cod" ? (
                <div className="flex justify-between font-semibold text-lg"><span>Pay on Delivery (COD)</span><span>{formatBDT(total)}</span></div>
              ) : (
                <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatBDT(total)}</span></div>
              )}
            </div>
            <Button type="submit" variant="brown" className="mt-4 w-full btn-lg">Place Order</Button>
            <Link href="/cart" className="mt-2 block text-center text-sm text-brown link-underline">← Back to Bag</Link>
          </div>
        </aside>
      </form>
    </div>
  );
}

function PaymentOption({ active, onClick, title, subtitle, badge }: { active: boolean; onClick: () => void; title: string; subtitle: string; badge?: string }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left ${active ? "border-brown bg-alabaster" : "border-taupe/30"}`}>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-taupe">{subtitle}</p>
      </div>
      {badge && <span className="tag-brown">{badge}</span>}
      {active && <CheckCircle2 className="h-5 w-5 text-brown" />}
    </button>
  );
}
