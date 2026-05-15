import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import LogoMarquee from "@/components/LogoMarquee";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import FaqSection from "@/components/FaqSection";
import AgencyTabs from "@/components/AgencyTabs";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LogoMarquee speed={30} />
      <BrandsSection />
      <WhatWeDoSection />
      <AgencyTabs />
      <FaqSection />
    </main>
  );
}
