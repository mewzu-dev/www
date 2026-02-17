"use client";

import { useState, useRef } from "react";
import { uploadProductImage } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Loader2, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import type { ProductImageView } from "@/types";

export interface ImageItem {
  id?: string;
  url: string;
  alt: string;
  view: ProductImageView;
}

interface ImageUploadProps {
  images: ImageItem[];
  productSlug: string;
  onChange: (images: ImageItem[]) => void;
  onPendingDelete?: (url: string) => void;
}

export function ImageUpload({
  images,
  productSlug,
  onChange,
  onPendingDelete,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0 || !productSlug) return;

    setUploading(true);
    setUploadError("");
    const failed: string[] = [];

    try {
      const newImages: ImageItem[] = [];
      const totalExisting = images.length;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const viewIndex = totalExisting + i;
        const view: ProductImageView =
          viewIndex === 0 ? "back" : viewIndex === 1 ? "front" : "detail";
        try {
          const url = await uploadProductImage(file, productSlug, view);
          newImages.push({
            url,
            alt: `${productSlug.replace(/-/g, " ")} - ${view} view`,
            view,
          });
        } catch {
          failed.push(file.name);
        }
      }
      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
      if (failed.length > 0) {
        setUploadError(
          `Failed to upload: ${failed.join(", ")}. Please try again.`,
        );
      }
    } catch {
      setUploadError("Upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    const image = images[index];
    // Defer storage deletion until form save
    onPendingDelete?.(image.url);
    onChange(images.filter((_, i) => i !== index));
  }

  function handleUpdate(index: number, updates: Partial<ImageItem>) {
    const updated = images.map((img, i) =>
      i === index ? { ...img, ...updates } : img,
    );
    onChange(updated);
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(updated);
  }

  function handleMoveDown(index: number) {
    if (index >= images.length - 1) return;
    const updated = [...images];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading || !productSlug}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        {!productSlug && (
          <p className="text-xs text-muted-foreground">
            Enter a product name first to enable uploads
          </p>
        )}
      </div>

      {uploadError && (
        <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              className="relative rounded-lg border bg-card p-3 space-y-2"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute top-1 right-1 flex gap-1">
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="rounded-full bg-background/80 p-1 text-foreground hover:bg-background disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index >= images.length - 1}
                        className="rounded-full bg-background/80 p-1 text-foreground hover:bg-background disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <div>
                  <Label className="text-xs">View</Label>
                  <Select
                    value={image.view}
                    onValueChange={(v) =>
                      handleUpdate(index, { view: v as ProductImageView })
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="front">Front</SelectItem>
                      <SelectItem value="detail">Detail</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Alt text</Label>
                  <Input
                    value={image.alt}
                    onChange={(e) => handleUpdate(index, { alt: e.target.value })}
                    className="h-8 text-xs"
                    placeholder="Image description"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
