import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackagesSection from "@/components/sections/PackagesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import BookingSection from "@/components/sections/BookingSection";
import GallerySection from "@/components/sections/GallerySection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PackagesSection />
        <WhyChooseUsSection />
        <BookingSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
