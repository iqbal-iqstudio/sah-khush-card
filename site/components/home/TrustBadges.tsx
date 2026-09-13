import { ShieldCheck, Banknote, Truck, BadgeCheck } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "100% Original Guarantee" },
  { icon: Banknote, label: "Cash on Delivery" },
  { icon: Truck, label: "Bangladesh-Wide Delivery" },
  { icon: BadgeCheck, label: "Trusted Shop" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-taupe/10 bg-alabaster/60">
      <div className="container-shell grid grid-cols-2 gap-y-5 gap-x-4 py-8 md:grid-cols-4">
        {BADGES.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-3 text-center text-sm font-medium text-brown">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft">
              <b.icon className="h-5 w-5 text-gold" />
            </span>
            <span className="leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
