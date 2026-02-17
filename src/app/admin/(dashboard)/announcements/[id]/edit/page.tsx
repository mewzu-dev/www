import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AnnouncementForm } from "@/components/admin/announcement-form";

interface EditAnnouncementPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAnnouncementPage({
  params,
}: EditAnnouncementPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: announcement } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (!announcement) {
    notFound();
  }

  const initialData = {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    type: announcement.type as "banner" | "modal",
    startDate: announcement.start_date
      ? new Date(announcement.start_date).toISOString().slice(0, 16)
      : "",
    endDate: announcement.end_date
      ? new Date(announcement.end_date).toISOString().slice(0, 16)
      : "",
    targetPages: announcement.target_pages ?? [],
    priority: announcement.priority,
    isActive: announcement.is_active,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Announcement</h1>
      <AnnouncementForm initialData={initialData} />
    </div>
  );
}
