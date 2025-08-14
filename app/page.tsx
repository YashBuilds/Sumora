import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import DemoSection from "@/components/home/demo-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import Pricing from "@/components/home/pricing";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  console.log('Environment check:', {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    nodeEnv: process.env.NODE_ENV
  });

  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <Pricing />
        <CTASection />
      </div>
    </div>
  );
}