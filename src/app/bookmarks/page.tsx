import { MainLayout } from "@/components/layout/main-layout";
import { BookmarksSection } from "@/components/sections/bookmarks-section";

export default function BookmarksPage() {
  return (
    <div className="min-h-screen">
      <MainLayout>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <BookmarksSection />
        </div>
      </MainLayout>
    </div>
  );
}
