export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using the SAH-KHUSH website (www.sahkhush.com) and placing an order, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
    },
    {
      title: "Products & Authenticity",
      content: "All products sold on SAH-KHUSH are 100% original, sourced directly from authorized Pakistani fashion houses. We guarantee authenticity on every item. Any product found to be inauthentic will be eligible for a full refund.",
    },
    {
      title: "Pricing & Payment",
      content: "All prices are listed in Bangladeshi Taka (BDT) and include applicable taxes unless stated otherwise. We accept Cash on Delivery (COD), bKash, Nagad, and Rocket. Prices may change without prior notice, but confirmed orders will not be affected.",
    },
    {
      title: "How to Order & Advance Payment",
      content: "To confirm your order, simply make an advance payment of the delivery charge via bKash/Nagad. The remaining balance for the product can be paid via Cash on Delivery (COD) after you receive the dress. To secure your high-demand design code from our warehouse, the delivery charge must be paid upfront. If you prefer, you can also pay up to the full product price along with the delivery charge in advance.",
    },
    {
      title: "Delivery Charges & Timelines",
      content: "Inside Dhaka City: ৳70 TK (Delivery in 24–48 hours). Outside Dhaka (All Districts): ৳130 TK (Delivery in 3–5 days). We deliver to all 64 districts in Bangladesh. SAH-KHUSH is not responsible for delays caused by courier services or unforeseen circumstances.",
    },
    {
      title: "Strict Return & Exchange Policy",
      content: "At SAH-KHUSH, we deal strictly in 100% original imported designer brands. Because these items are brought in on demand, we enforce a strict No Change of Mind framework. Returns or exchanges are strictly NOT accepted for subjective reasons, including: \"I changed my mind / I don't like it anymore.\", \"The color looks slightly different than my mobile phone screen.\", \"I chose the wrong design code / I want a different brand instead.\" We only accept responsibility for massive manufacturing defects or wrong item deliveries.",
    },
    {
      title: "Video Proof Requirement",
      content: "To qualify for a valid claim regarding a manufacturing defect, you must provide clear, unedited visual evidence: (1) A continuous, unbroken unboxing video starting before the outer courier flyer is cut open, all the way to laying out the fabric pieces. (2) Any video with cuts, edits, pauses, time-lapses, or that begins after the parcel has been opened will be instantly voided. False or staged videos will not be considered. (3) Any damage claim must be reported on the exact same day you receive the parcel from the courier agent. Late claims will be automatically rejected. (4) Claims will not be accepted once the fabric has been cut, passed to a tailor, washed, or altered in any manner.",
    },
    {
      title: "Refunds",
      content: "Refunds for valid claims are processed within 3–5 business days after the returned item is received and inspected. The amount will be credited to your original payment method or bKash/Nagad. Shipping charges are non-refundable unless the return is due to our error.",
    },
    {
      title: "Products",
      content: "All products sold on SAH-KHUSH are 100% original, sourced directly from authorized Pakistani fashion houses. We guarantee authenticity on every item. All items are sold as unstitched fabric unless explicitly stated otherwise.",
    },
    {
      title: "Intellectual Property",
      content: "All content on this website — including images, logos, text, and design — is the property of SAH-KHUSH and protected by copyright laws. Unauthorized reproduction or distribution is strictly prohibited.",
    },
    {
      title: "Limitation of Liability",
      content: "SAH-KHUSH shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the amount paid for the specific product in question.",
    },
    {
      title: "Governing Law",
      content: "These Terms & Conditions are governed by and construed in accordance with the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.",
    },
    {
      title: "Changes to Terms",
      content: "SAH-KHUSH reserves the right to update these terms at any time. Changes will be effective immediately upon posting on this page. Continued use of the website constitutes acceptance of the revised terms.",
    },
    {
      title: "Contact Us",
      content: "For questions about these Terms & Conditions, reach us at sahkhushofficial@gmail.com or call +880 1627-272342.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brown py-20 text-ivory">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Legal</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/80">
            Please read these terms carefully before using our website or placing an order.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-taupe">
              <strong>Last updated:</strong> January 2025
            </p>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="font-serif text-xl font-semibold text-charcoal">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-taupe">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
