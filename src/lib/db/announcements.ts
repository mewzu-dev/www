import { createServerSupabaseClient } from "@/lib/supabase/server";
import DOMPurify from "isomorphic-dompurify";
import type { Announcement } from "@/types";

interface DbAnnouncementRow {
  id: string;
  title: string;
  content: string;
  type: string;
  start_date: string | null;
  end_date: string | null;
  target_pages: string[];
  priority: number;
  is_active: boolean;
}

function transformAnnouncement(row: DbAnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    content: DOMPurify.sanitize(row.content),
    type: row.type as Announcement["type"],
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    targetPages: row.target_pages,
    priority: row.priority,
    isActive: row.is_active,
  };
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const supabase = await createServerSupabaseClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("priority", { ascending: false });

  if (error) {
    console.warn("getActiveAnnouncements:", error.message);
    return [];
  }
  return (data ?? []).map(transformAnnouncement);
}

export async function getAnnouncementsByPage(
  page: string,
): Promise<Announcement[]> {
  const supabase = await createServerSupabaseClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("priority", { ascending: false });

  if (error) {
    console.warn("getAnnouncementsByPage:", error.message);
    return [];
  }

  // Filter by target pages in application code
  const filtered = (data ?? []).filter((a) => {
    if (!a.target_pages || a.target_pages.length === 0) return true;
    if (a.target_pages.includes("all")) return true;
    return a.target_pages.includes(page);
  });

  return filtered.map(transformAnnouncement);
}
