import dynamic from "next/dynamic";
import { getAnnouncementsByPage } from "@/sanity/lib";

// Lazy load announcement components only when needed
const AnnouncementBanner = dynamic(
  () => import("./announcement-banner").then((mod) => mod.AnnouncementBanner),
  {
    loading: () => <div className="h-12" />, // Reserve space to prevent CLS
  },
);

const AnnouncementModal = dynamic(() =>
  import("./announcement-modal").then((mod) => mod.AnnouncementModal),
);

interface AnnouncementsProps {
  page: string;
}

export async function Announcements({ page }: AnnouncementsProps) {
  const announcements = await getAnnouncementsByPage(page);

  const bannerAnnouncements = announcements.filter((a) => a.type === "banner");
  const modalAnnouncements = announcements.filter((a) => a.type === "modal");

  return (
    <>
      {bannerAnnouncements.length > 0 && (
        <AnnouncementBanner announcements={bannerAnnouncements} />
      )}
      {modalAnnouncements.length > 0 && (
        <AnnouncementModal announcements={modalAnnouncements} />
      )}
    </>
  );
}
