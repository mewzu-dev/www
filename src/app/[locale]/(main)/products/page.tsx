import type { Metadata } from "next";
import { ProductsPageClient } from "@/components/product/products-page-client";
import { getAllProducts } from "@/lib/db/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete collection of hand-drawn cat adventures on quality apparel.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ProductsPageClient products={products} />;
}
