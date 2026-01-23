import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/sanity/lib";
import { ProductDetailClient } from "@/components/product/product-detail-client";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const backImage =
    product.images.find((img) => img.view === "back") || product.images[0];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.description,
      images: [
        {
          url: backImage.url,
          width: 1200,
          height: 1200,
          alt: backImage.alt,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
