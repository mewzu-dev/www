import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import type { Size, MarketplacePlatform, ProductImageView } from "@/types";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      images:product_images(id, url, alt, view, sort_order),
      external_links:product_external_links(id, platform, url, available, sort_order)
    `,
    )
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    description: product.description,
    scene: product.scene,
    story: product.story,
    baseColor: product.base_color,
    artColor: product.art_color,
    price: product.price,
    material: product.material,
    sizes: product.sizes as Size[],
    featured: product.featured,
    images: (product.images ?? [])
      .sort(
        (a: { sort_order: number }, b: { sort_order: number }) =>
          a.sort_order - b.sort_order,
      )
      .map((img: { url: string; alt: string; view: string }) => ({
        url: img.url,
        alt: img.alt,
        view: img.view as ProductImageView,
      })),
    externalLinks: (product.external_links ?? [])
      .sort(
        (a: { sort_order: number }, b: { sort_order: number }) =>
          a.sort_order - b.sort_order,
      )
      .map(
        (link: {
          platform: string;
          url: string;
          available: boolean;
        }) => ({
          platform: link.platform as MarketplacePlatform,
          url: link.url,
          available: link.available,
        }),
      ),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm initialData={initialData} />
    </div>
  );
}
