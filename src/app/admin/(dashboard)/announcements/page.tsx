import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { DeleteAnnouncementButton } from "@/components/admin/delete-announcement-button";

export default async function AnnouncementsListPage() {
  const supabase = await createServerSupabaseClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("priority", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button asChild>
          <Link href="/admin/announcements/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Announcement
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!announcements || announcements.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No announcements yet. Create your first announcement.
                </TableCell>
              </TableRow>
            )}
            {announcements?.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">
                  {announcement.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{announcement.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={announcement.is_active ? "default" : "secondary"}
                  >
                    {announcement.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{announcement.priority}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {announcement.start_date
                    ? new Date(announcement.start_date).toLocaleDateString()
                    : "—"}{" "}
                  →{" "}
                  {announcement.end_date
                    ? new Date(announcement.end_date).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/admin/announcements/${announcement.id}/edit`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <DeleteAnnouncementButton
                      announcementId={announcement.id}
                      announcementTitle={announcement.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
