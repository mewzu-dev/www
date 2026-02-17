"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { RichTextEditor } from "./rich-text-editor";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const TYPE_OPTIONS = [
  {
    value: "banner",
    label: "Banner",
    description: "A thin strip pinned to the top of the page",
  },
  {
    value: "modal",
    label: "Modal",
    description: "A popup dialog that appears after page load",
  },
] as const;

const PAGE_OPTIONS = [
  { value: "all", label: "All Pages" },
  { value: "/", label: "Homepage" },
  { value: "/products", label: "Products" },
  { value: "/about", label: "About" },
  { value: "/contact", label: "Contact" },
] as const;

interface AnnouncementFormData {
  id?: string;
  title: string;
  content: string;
  type: "banner" | "modal";
  startDate: string;
  endDate: string;
  targetPages: string[];
  priority: number;
  isActive: boolean;
}

interface AnnouncementFormProps {
  initialData?: AnnouncementFormData;
}

function isAuthError(message: string): boolean {
  const authPatterns = ["jwt", "token", "expired", "not authenticated", "unauthorized"];
  return authPatterns.some((p) => message.toLowerCase().includes(p));
}

export function AnnouncementForm({ initialData }: AnnouncementFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const isDirtyRef = useRef(false);

  const [form, setForm] = useState<AnnouncementFormData>(
    initialData ?? {
      title: "",
      content: "",
      type: "banner",
      startDate: "",
      endDate: "",
      targetPages: [],
      priority: 0,
      isActive: true,
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

  function updateField<K extends keyof AnnouncementFormData>(
    key: K,
    value: AnnouncementFormData[K],
  ) {
    markDirty();
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePage(page: string) {
    markDirty();
    setForm((prev) => {
      // "All Pages" is mutually exclusive with individual pages
      if (page === "all") {
        return {
          ...prev,
          targetPages: prev.targetPages.includes("all") ? [] : ["all"],
        };
      }
      // Selecting a specific page removes "all"
      const withoutAll = prev.targetPages.filter((p) => p !== "all");
      return {
        ...prev,
        targetPages: withoutAll.includes(page)
          ? withoutAll.filter((p) => p !== page)
          : [...withoutAll, page],
      };
    });
  }

  function handleCancelClick() {
    if (isDirtyRef.current) {
      setShowCancelDialog(true);
    } else {
      router.push("/admin/announcements");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Date validation
    if (form.startDate && form.endDate) {
      if (new Date(form.endDate) <= new Date(form.startDate)) {
        setError("End date must be after start date.");
        return;
      }
    }

    setSaving(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const isEditing = !!form.id;

      const announcementData = {
        title: form.title,
        content: form.content,
        type: form.type,
        start_date: form.startDate || null,
        end_date: form.endDate || null,
        target_pages: form.targetPages,
        priority: form.priority,
        is_active: form.isActive,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("announcements")
          .update(announcementData)
          .eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert(announcementData);
        if (error) throw error;
      }

      isDirtyRef.current = false;
      toast.success("Announcement saved successfully");
      router.push("/admin/announcements");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save announcement";
      if (isAuthError(message)) {
        toast.error("Your session has expired. Redirecting to login...");
        router.push("/admin/login?reason=session_expired");
        return;
      }
      setError(message);
      setSaving(false);
    }
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Internal title for this announcement"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => updateField("content", html)}
            />
            {form.type === "banner" && form.content.length > 150 && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Banner content is long. Consider using a Modal type for better display.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Type *</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              {TYPE_OPTIONS.map(({ value, label, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateField("type", value)}
                  className={`flex-1 rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                    form.type === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  <div className="font-medium">{label}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      form.type === value
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={form.endDate}
                min={form.startDate || undefined}
                onChange={(e) => updateField("endDate", e.target.value)}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Times are in your local timezone ({tz}). Leave empty for no time limit.
          </p>

          <div className="space-y-2">
            <Label>Target Pages</Label>
            <div className="flex flex-wrap gap-2">
              {PAGE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => togglePage(value)}
                  disabled={
                    value !== "all" && form.targetPages.includes("all")
                  }
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40 ${
                    form.targetPages.includes(value)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to show on all pages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority (0-100)</Label>
              <Input
                id="priority"
                type="number"
                min={0}
                max={100}
                value={form.priority}
                onChange={(e) => updateField("priority", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Higher number = shown first. 100 is highest priority.
              </p>
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(checked) => updateField("isActive", checked)}
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save Announcement"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
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
              onClick={() => router.push("/admin/announcements")}
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
