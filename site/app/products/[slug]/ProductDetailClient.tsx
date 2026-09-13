"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";
import ProductDetail from "@/components/product/ProductDetail";
import type { Product } from "@/types/product";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const products = useAdminStore((s) => s.products);
  const initProducts = useAdminStore((s) => s.initProducts);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.slug === slug);
      setProduct(found || null);
      setLoading(false);
    }
  }, [slug, products]);

  if (loading) {
    return (
      <div className="container-shell py-20 text-center">
        <p className="text-taupe">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-shell py-20 text-center">
        <p className="font-serif text-2xl">Product Not Found</p>
        <button onClick={() => router.push("/products")} className="mt-4 text-brown link-underline">Back to Products</button>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
