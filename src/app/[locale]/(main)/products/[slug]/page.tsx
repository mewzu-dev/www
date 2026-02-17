import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/lib/db/products";

export const revalidate = 60;

// Lazy load heavy animation component to reduce bundle size
const ProductDetailClient = dynamic(
  () =>
    import("@/components/product/product-detail-client").then(
      (mod) => mod.ProductDetailClient,
    ),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8">
        <div className="min-h-[800px] animate-pulse space-y-4">
          <div className="h-12 w-3/4 bg-muted rounded" />
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
          <div className="h-24 bg-muted rounded" />
        </div>
      </div>
    ),
  },
);

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
