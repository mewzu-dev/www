import { getAnnouncementsByPage } from '@/sanity/lib'
import { AnnouncementBanner } from './announcement-banner'
import { AnnouncementModal } from './announcement-modal'

interface AnnouncementsProps {
  page: string
}

export async function Announcements({ page }: AnnouncementsProps) {
  const announcements = await getAnnouncementsByPage(page)

  const bannerAnnouncements = announcements.filter((a) => a.type === 'banner')
  const modalAnnouncements = announcements.filter((a) => a.type === 'modal')

  return (
    <>
      {bannerAnnouncements.length > 0 && (
        <AnnouncementBanner announcements={bannerAnnouncements} />
      )}
      {modalAnnouncements.length > 0 && (
        <AnnouncementModal announcements={modalAnnouncements} />
      )}
    </>
  )
}
