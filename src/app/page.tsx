import HeroSection from "@/components/HeroSection";
import WebDesignSection from "@/components/WebDesignSection";
import UxCaseStudy from "@/components/UxCaseStudy";
import SkillSection from "@/components/SkillSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main>
      <Preloader />
      <HeroSection />
      <UxCaseStudy />
      <WebDesignSection />
      <SkillSection />
      <Footer />
    </main>
  );
}
