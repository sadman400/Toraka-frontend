import { MainLayout } from "@/components/layout/main-layout";
import BrowseSection from "@/components/sections/browse-section";

export default function BrowsePage() {
  return (
    <div className="min-h-screen">
      <MainLayout>
        <div className="w-full flex justify-center">
          <BrowseSection />
        </div>
      </MainLayout>
    </div>
  );
}
