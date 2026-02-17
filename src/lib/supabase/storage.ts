import { createBrowserSupabaseClient } from "./client";

const BUCKET = "product-images";

export async function uploadProductImage(
  file: File,
  productSlug: string,
  view: string,
): Promise<string> {
  const supabase = createBrowserSupabaseClient();
  const ext = file.name.split(".").pop();
  const path = `${productSlug}/${view}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: true,
    contentType: file.type,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function deleteProductImage(url: string): Promise<void> {
  const supabase = createBrowserSupabaseClient();
  const path = url.split(`/storage/v1/object/public/${BUCKET}/`)[1];
  if (path) {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw error;
  }
}
