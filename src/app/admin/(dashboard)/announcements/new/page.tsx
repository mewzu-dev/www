import { AnnouncementForm } from "@/components/admin/announcement-form";

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Announcement</h1>
      <AnnouncementForm />
    </div>
  );
}
