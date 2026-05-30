import Nav from "@/components/Nav";
import UxCaseStudy from "@/components/UxCaseStudy";
import WebDesignSection from "@/components/WebDesignSection";
import SkillSection from "@/components/SkillSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <UxCaseStudy />
      <WebDesignSection />
      <SkillSection />
      <Footer />
    </main>
  );
}
