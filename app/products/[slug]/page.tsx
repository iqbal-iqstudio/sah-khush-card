import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/mock-products";
import ProductDetail from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Product Not Found" };
  return {
    title: p.name,
    description: p.description,
    openGraph: { images: [p.image], title: p.name, description: p.description },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
