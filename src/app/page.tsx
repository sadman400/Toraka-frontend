import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedContentSection } from "@/components/sections/featured-content-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainLayout>
        <div className="flex flex-col justify-center items-center gap-9">
          {/* Hero Section */}
          <HeroSection />
          {/* Featured Content Section */}
          <FeaturedContentSection />
        </div>
      </MainLayout>
    </div>
  );
}
