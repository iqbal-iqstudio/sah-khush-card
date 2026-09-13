import { products } from "@/data/mock-products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
