import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createStaticSupabaseClient } from "@/lib/supabase/static";
import type { Product, ProductImage, ExternalLink } from "@/types";

interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  scene: string;
  story: string;
  base_color: string;
  art_color: string;
  price: number;
  material: string;
  sizes: string[];
  featured: boolean;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    view: string;
    sort_order: number;
  }>;
  external_links: Array<{
    id: string;
    platform: string;
    url: string;
    available: boolean;
    sort_order: number;
  }>;
}

const PRODUCT_SELECT = `
  *,
  images:product_images(id, url, alt, view, sort_order),
  external_links:product_external_links(id, platform, url, available, sort_order)
`;

function transformProduct(row: DbProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    scene: row.scene,
    story: row.story,
    baseColor: row.base_color,
    artColor: row.art_color,
    price: row.price,
    material: row.material,
    sizes: row.sizes as Product["sizes"],
    featured: row.featured,
    images: (row.images ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(
        (img): ProductImage => ({
          url: img.url,
          alt: img.alt,
          view: img.view as ProductImage["view"],
        }),
      ),
    externalLinks: (row.external_links ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(
        (link): ExternalLink => ({
          platform: link.platform as ExternalLink["platform"],
          url: link.url,
          available: link.available,
        }),
      ),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("getAllProducts:", error.message);
    return [];
  }
  return (data ?? []).map(transformProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("getFeaturedProducts:", error.message);
    return [];
  }
  return (data ?? []).map(transformProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data ? transformProduct(data) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  // Uses static client because this runs in generateStaticParams
  // where cookies() is not available
  const supabase = createStaticSupabaseClient();
  const { data, error } = await supabase.from("products").select("slug");

  if (error) {
    console.warn("getAllProductSlugs:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}
