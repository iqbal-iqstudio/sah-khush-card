"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Send, CheckCircle, Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const addMessage = useAdminStore((s) => s.addMessage);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      ...form,
      read: false,
    });
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brown py-20 text-ivory">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Get in Touch</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/80">
            Have a question about an order or a product? We&apos;re here to help — reach us via phone, email, or WhatsApp.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container-shell -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Phone", value: "+880 1627-272342", href: "tel:+8801627272342" },
            { icon: Mail, label: "Email", value: "sahkhushofficial@gmail.com", href: "mailto:sahkhushofficial@gmail.com" },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/8801627272342" },
            { icon: Clock, label: "Hours", value: "Sun–Thu, 10AM–8PM", href: null },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-taupe/10 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold">
                <card.icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-taupe">{card.label}</p>
              {card.href ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="mt-1 block font-medium text-charcoal transition hover:text-brown">
                  {card.value}
                </a>
              ) : (
                <p className="mt-1 font-medium text-charcoal">{card.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-gold">Send a Message</p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl">We&apos;d Love to Hear From You</h2>

            {sent ? (
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
                <CheckCircle className="h-10 w-10 flex-shrink-0 text-emerald-600" />
                <div>
                  <p className="text-lg font-semibold text-emerald-800">Message Sent!</p>
                  <p className="mt-1 text-emerald-600">
                    Thank you for reaching out. We&apos;ll get back to you within a few hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-taupe">Your Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-taupe/30 bg-white px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-taupe">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-taupe/30 bg-white px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-taupe">Phone (optional)</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+880 ..."
                      className="w-full rounded-xl border border-taupe/30 bg-white px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-taupe">Subject *</label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-taupe/30 bg-white px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-taupe">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full rounded-xl border border-taupe/30 bg-white px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-2 focus:ring-brown/10"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brown px-7 py-3.5 text-sm font-medium text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brown-deep hover:shadow-lift"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-taupe/10 bg-alabaster p-8">
              <h3 className="font-serif text-xl font-semibold text-charcoal">Quick Connect</h3>
              <p className="mt-2 text-sm text-taupe">
                Prefer talking to a person? Reach us directly through any of these channels.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="https://wa.me/8801627272342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brown text-ivory">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">WhatsApp</p>
                    <p className="text-sm text-taupe">+880 1627-272342</p>
                  </div>
                </a>
                <a
                  href="tel:+8801627272342"
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brown text-ivory">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Call Us</p>
                    <p className="text-sm text-taupe">+880 1627-272342</p>
                  </div>
                </a>
                <a
                  href="mailto:sahkhushofficial@gmail.com"
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brown text-ivory">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Email</p>
                    <p className="text-sm text-taupe">sahkhushofficial@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 rounded-xl bg-brown/5 p-5">
                <p className="text-sm font-medium text-charcoal">Business Hours</p>
                <div className="mt-2 space-y-1 text-sm text-taupe">
                  <p>Sunday – Thursday: 10:00 AM – 8:00 PM</p>
                  <p>Friday – Saturday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
