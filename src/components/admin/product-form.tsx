"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { deleteProductImage } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImageUpload, type ImageItem } from "./image-upload";
import { Save, Loader2, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { Size, MarketplacePlatform } from "@/types";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface ExternalLinkInput {
  platform: MarketplacePlatform;
  url: string;
  available: boolean;
}

interface ProductFormData {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  scene: string;
  story: string;
  baseColor: string;
  artColor: string;
  price: number;
  material: string;
  sizes: Size[];
  featured: boolean;
  images: ImageItem[];
  externalLinks: ExternalLinkInput[];
}

interface ProductFormProps {
  initialData?: ProductFormData;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function isAuthError(message: string): boolean {
  const authPatterns = ["jwt", "token", "expired", "not authenticated", "unauthorized"];
  return authPatterns.some((p) => message.toLowerCase().includes(p));
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const isDirtyRef = useRef(false);
  const [pendingImageDeletions, setPendingImageDeletions] = useState<string[]>([]);

  const [form, setForm] = useState<ProductFormData>(
    initialData ?? {
      name: "",
      slug: "",
      tagline: "",
      description: "",
      scene: "",
      story: "",
      baseColor: "",
      artColor: "",
      price: 0,
      material: "",
      sizes: [],
      featured: false,
      images: [],
      externalLinks: [],
    },
  );

  const markDirty = useCallback(() => {
    isDirtyRef.current = true;
  }, []);

  // Warn before closing browser tab with unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirtyRef.current) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  function updateField<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) {
    markDirty();
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "name" && !slugManuallyEdited) {
        updated.slug = slugify(value as string);
      }
      return updated;
    });
  }

  function toggleSize(size: Size) {
    markDirty();
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }

  function addExternalLink() {
    markDirty();
    setForm((prev) => ({
      ...prev,
      externalLinks: [
        ...prev.externalLinks,
        { platform: "shopee" as MarketplacePlatform, url: "", available: true },
      ],
    }));
  }

  function removeExternalLink(index: number) {
    markDirty();
    setForm((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index),
    }));
  }

  function updateExternalLink(
    index: number,
    updates: Partial<ExternalLinkInput>,
  ) {
    markDirty();
    setForm((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) =>
        i === index ? { ...link, ...updates } : link,
      ),
    }));
  }

  function handleImageChange(images: ImageItem[]) {
    markDirty();
    updateField("images", images);
  }

  function handleImageRemove(url: string) {
    setPendingImageDeletions((prev) => [...prev, url]);
  }

  function handleCancelClick() {
    if (isDirtyRef.current) {
      setShowCancelDialog(true);
    } else {
      router.push("/admin/products");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation
    if (form.sizes.length === 0) {
      setError("Please select at least one size.");
      return;
    }

    if (form.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    // Validate external link URLs
    for (const link of form.externalLinks) {
      if (link.url && !link.url.startsWith("https://")) {
        setError(`Marketplace link URL must start with https:// (${link.platform})`);
        return;
      }
    }

    setSaving(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const isEditing = !!form.id;

      const productData = {
        name: form.name,
        slug: form.slug,
        tagline: form.tagline,
        description: form.description,
        scene: form.scene,
        story: form.story,
        base_color: form.baseColor,
        art_color: form.artColor,
        price: form.price,
        material: form.material,
        sizes: form.sizes,
        featured: form.featured,
      };

      let productId = form.id;

      if (isEditing) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", form.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select("id")
          .single();
        if (error) throw error;
        productId = data.id;
      }

      // Sync images: delete existing, re-insert
      if (isEditing) {
        await supabase
          .from("product_images")
          .delete()
          .eq("product_id", productId);
      }
      if (form.images.length > 0) {
        const imageRows = form.images.map((img, idx) => ({
          product_id: productId,
          url: img.url,
          alt: img.alt,
          view: img.view,
          sort_order: idx,
        }));
        const { error } = await supabase
          .from("product_images")
          .insert(imageRows);
        if (error) throw error;
      }

      // Sync external links: delete existing, re-insert
      if (isEditing) {
        await supabase
          .from("product_external_links")
          .delete()
          .eq("product_id", productId);
      }
      if (form.externalLinks.length > 0) {
        const linkRows = form.externalLinks.map((link, idx) => ({
          product_id: productId,
          platform: link.platform,
          url: link.url,
          available: link.available,
          sort_order: idx,
        }));
        const { error } = await supabase
          .from("product_external_links")
          .insert(linkRows);
        if (error) throw error;
      }

      // Process pending image deletions from storage (after DB save succeeds)
      for (const url of pendingImageDeletions) {
        try {
          await deleteProductImage(url);
        } catch {
          // Non-critical: orphaned storage file, log but don't block
          console.warn("Failed to delete image from storage:", url);
        }
      }

      isDirtyRef.current = false;
      toast.success("Product saved successfully");
      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save product";
      if (isAuthError(message)) {
        toast.error("Your session has expired. Redirecting to login...");
        router.push("/admin/login?reason=session_expired");
        return;
      }
      setError(message);
      setSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  updateField("slug", e.target.value);
                }}
                required
              />
              {initialData?.slug && form.slug !== initialData.slug && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Changing the slug will break existing links to this product.
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              value={form.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scene">Scene *</Label>
              <Textarea
                id="scene"
                value={form.scene}
                onChange={(e) => updateField("scene", e.target.value)}
                rows={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story">Story *</Label>
              <Textarea
                id="story"
                value={form.story}
                onChange={(e) => updateField("story", e.target.value)}
                rows={2}
                required
              />
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Product Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseColor">Base Color *</Label>
              <Input
                id="baseColor"
                value={form.baseColor}
                onChange={(e) => updateField("baseColor", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artColor">Art Color *</Label>
              <Input
                id="artColor"
                value={form.artColor}
                onChange={(e) => updateField("artColor", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (IDR) *</Label>
              <Input
                id="price"
                type="number"
                min={1}
                value={form.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material">Material *</Label>
              <Input
                id="material"
                value={form.material}
                onChange={(e) => updateField("material", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sizes *</Label>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    form.sizes.includes(size)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.featured}
              onCheckedChange={(checked) => updateField("featured", checked)}
            />
            <Label>Featured product</Label>
          </div>
        </section>

        {/* Images */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Images</h2>
          <ImageUpload
            images={form.images}
            productSlug={form.slug}
            onChange={handleImageChange}
            onPendingDelete={handleImageRemove}
          />
        </section>

        {/* External Links */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Marketplace Links</h2>
            <Button type="button" variant="outline" size="sm" onClick={addExternalLink}>
              <Plus className="mr-1 h-4 w-4" />
              Add Link
            </Button>
          </div>
          {form.externalLinks.map((link, index) => (
            <div key={index} className="flex flex-wrap items-end gap-3 rounded-md border p-3">
              <div className="w-32 space-y-1">
                <Label className="text-xs">Platform</Label>
                <Select
                  value={link.platform}
                  onValueChange={(v) =>
                    updateExternalLink(index, {
                      platform: v as MarketplacePlatform,
                    })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopee">Shopee</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px] space-y-1">
                <Label className="text-xs">URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) =>
                    updateExternalLink(index, { url: e.target.value })
                  }
                  placeholder="https://..."
                  className="h-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={link.available}
                  onCheckedChange={(checked) =>
                    updateExternalLink(index, { available: checked })
                  }
                />
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive"
                onClick={() => removeExternalLink(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </section>

        {/* Submit */}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          {initialData?.slug && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              asChild
              className="ml-auto"
            >
              <a
                href={`/products/${initialData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                View on site
              </a>
            </Button>
          )}
        </div>
      </form>

      {/* Cancel confirmation dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/admin/products")}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
