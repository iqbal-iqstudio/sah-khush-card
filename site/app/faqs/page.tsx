"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    title: "Orders & Payment",
    items: [
      {
        q: "How do I place an order?",
        a: "To confirm your order, simply make an advance payment of the delivery charge via bKash/Nagad. The remaining balance for the product can be paid via Cash on Delivery (COD) after you receive the dress.",
      },
      {
        q: "Do I have to pay in advance?",
        a: "Yes, the delivery charge must be paid upfront via bKash/Nagad to secure your order. You can also choose to pay the full product price in advance if you prefer.",
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes! The remaining product balance is collected at your doorstep by the delivery agent via Cash on Delivery (COD).",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can modify or cancel your order within 2 hours of placing it by contacting us via WhatsApp or phone. After that, the order may already be dispatched.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bKash, Nagad, Rocket, and Cash on Delivery (COD).",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "Do you deliver all over Bangladesh?",
        a: "Yes, we deliver to all 64 districts across Bangladesh.",
      },
      {
        q: "How much is the delivery charge?",
        a: "Inside Dhaka City: ৳70 TK (Delivery in 24–48 hours). Outside Dhaka (All Districts): ৳130 TK (Delivery in 3–5 days).",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you'll receive a tracking link via WhatsApp or SMS. You can also contact us directly with your order ID.",
      },
      {
        q: "What if my package arrives damaged?",
        a: "You must report any damage on the exact same day you receive the parcel. Please provide a continuous, unedited unboxing video as proof. See our Return Policy section for full details.",
      },
    ],
  },
  {
    title: "Products & Authenticity",
    items: [
      {
        q: "Are the products 100% original?",
        a: "Absolutely. Every piece is sourced directly from the original Pakistani brand houses — Charizma, Bin Hameed, Firdous, Sapphire, Elan, and more. We never deal in replicas.",
      },
      {
        q: "What types of clothing do you sell?",
        a: "We specialize in Pakistani luxury lawn, chiffon, and silk collections — including unstitched suits, ready-to-wear pieces, and formal wear for women.",
      },
      {
        q: "Can I request a specific design or color?",
        a: "While we can't guarantee specific designs, we do take requests for upcoming collections. Contact us on WhatsApp and we'll try our best to source what you're looking for.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We enforce a strict No Change of Mind framework. Returns are only accepted for massive manufacturing defects or wrong item deliveries. Subjective reasons like changed mind, color differences on screen, or wrong design selection are not valid grounds for return.",
      },
      {
        q: "What counts as a valid return?",
        a: "Only massive manufacturing defects or receiving the wrong item. You must provide a continuous, unedited unboxing video as proof, and report the issue on the same day of delivery.",
      },
      {
        q: "What is the unboxing video requirement?",
        a: "You must record a single, continuous, break-less unboxing video starting before the outer courier flyer is opened, all the way to laying out the fabric. No cuts, edits, pauses, or time-lapses allowed. The video must begin before the parcel is opened.",
      },
      {
        q: "When must I report a damage claim?",
        a: "Any damage claim must be reported on the exact same day you receive the parcel from the courier agent. Late claims will be automatically rejected.",
      },
      {
        q: "Can I return after cutting or tailoring the fabric?",
        a: "No. Claims will not be accepted once the fabric has been cut, passed to a tailor, washed, or altered in any manner.",
      },
      {
        q: "How long does a refund take?",
        a: "Refunds for valid claims are processed within 3–5 business days after we receive the returned item. The amount will be credited to your original payment method or bKash/Nagad.",
      },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        q: "Do I need an account to place an order?",
        a: "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and view order history.",
      },
      {
        q: "How can I contact customer support?",
        a: "You can reach us via WhatsApp (+880 1627-272342), phone, or email (sahkhushofficial@gmail.com). We're available Sunday–Thursday, 10AM–8PM.",
      },
      {
        q: "Do you have a physical store?",
        a: "Currently, we operate online only. However, we're working on opening a showroom in Dhaka soon. Follow us on social media for updates!",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition ${open ? "border-brown/30 bg-brown/5" : "border-taupe/10 bg-white"} shadow-sm`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-5 text-left">
        <span className="font-medium text-charcoal pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-taupe transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-taupe">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brown py-20 text-ivory">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Help Center</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/80">
            Everything you need to know about shopping with SAH-KHUSH. Can&apos;t find your answer? Contact us directly.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-pad">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl space-y-12">
            {FAQ_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <h2 className="mb-4 font-serif text-2xl text-charcoal">{cat.title}</h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-alabaster py-16">
        <div className="container-shell text-center">
          <h2 className="font-serif text-2xl sm:text-3xl">Still Have Questions?</h2>
          <p className="mx-auto mt-3 max-w-md text-taupe">
            Our team is ready to help. Reach out and we&apos;ll get back to you within hours.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/8801627272342" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift">
              WhatsApp Us
            </a>
            <a href="mailto:sahkhushofficial@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-brown px-6 py-3 text-sm font-medium text-brown transition-all hover:-translate-y-0.5 hover:bg-brown hover:text-ivory">
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
