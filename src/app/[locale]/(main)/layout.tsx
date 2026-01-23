import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Announcements } from "@/components/announcement/announcements";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Announcements page="all" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
