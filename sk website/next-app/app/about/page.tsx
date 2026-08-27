import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Our Story</p>
      <h1 className="mt-2 font-serif text-4xl">About Us</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-taupe">
        SAH-KHUSH curates 100% original imported Pakistani luxury lawn &amp; chiffon, sourced directly from the houses that define South Asian couture and delivered across Bangladesh.
      </p>
      <Link href="/products" className="mt-6 inline-block"><Button variant="brown">Shop the Collection</Button></Link>
    </div>
  );
}
