export default function FaqsPage() {
  const faqs = [
    { q: "Are the products original?", a: "Yes. Every piece is 100% original, sourced directly from the brand." },
    { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available nationwide across Bangladesh." },
    { q: "What is the return policy?", a: "Easy 7-day returns on unused items in original packaging." },
    { q: "Can I get stitching done?", a: "Yes, custom stitching is available at checkout for most lawn pieces." },
  ];
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Help Center</p>
      <h1 className="mt-2 font-serif text-4xl">FAQs</h1>
      <div className="mt-6 max-w-2xl space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-2xl border border-taupe/10 bg-white p-5 shadow-soft">
            <p className="font-semibold">{f.q}</p>
            <p className="mt-1 text-sm text-taupe">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
