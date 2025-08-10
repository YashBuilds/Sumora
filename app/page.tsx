import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className='relative w-full'>
      <BgGradient />
      <div className='flex flex-col'>
        <HeroSection />
      </div>  
    </div>
  );
}
