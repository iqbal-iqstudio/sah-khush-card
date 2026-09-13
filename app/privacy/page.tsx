export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: "When you use SAH-KHUSH, we may collect personal information including your name, email address, phone number, delivery address, and payment method details. We also collect non-personal data such as browser type, device information, and website usage patterns through cookies.",
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to process and fulfill orders, communicate order updates, provide customer support, send promotional offers (with your consent), improve our website and services, and ensure fraud prevention and security.",
    },
    {
      title: "Information Sharing",
      content: "We do not sell, rent, or trade your personal information to third parties. Your data is shared only with delivery partners (for order fulfillment), payment processors (for transaction verification), and legal authorities (when required by law).",
    },
    {
      title: "Cookies & Tracking",
      content: "SAH-KHUSH uses cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser. Disabling cookies may affect certain website functionalities.",
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Data Retention",
      content: "We retain your personal information for as long as your account is active or as needed to provide services. Order information is retained for 2 years for accounting and legal purposes. You may request deletion of your data by contacting us.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can update your details through your account settings or by contacting our support team. You may also opt out of marketing communications at any time.",
    },
    {
      title: "Third-Party Links",
      content: "Our website may contain links to third-party websites (social media, payment gateways). We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.",
    },
    {
      title: "Children's Privacy",
      content: "SAH-KHUSH does not knowingly collect personal information from children under 13. If we become aware that a child has provided us with personal data, we will take steps to delete it immediately.",
    },
    {
      title: "Policy Updates",
      content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
    },
    {
      title: "Contact Us",
      content: "For any questions about this Privacy Policy or to exercise your data rights, contact us at sahkhushofficial@gmail.com or call +880 1627-272342.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brown py-20 text-ivory">
        <div className="container-shell text-center">
          <p className="eyebrow text-gold">Legal</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/80">
            Your privacy matters to us. Learn how we collect, use, and protect your information.
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
