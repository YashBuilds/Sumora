import HeroSection from '@/components/home/hero-section';
import BgGradient from '@/components/common/bg-gradient';
import DemoSection from '@/components/home/demo-section';

export default function Home() {
  return (
    <div className='relative w-full'>
      <BgGradient />
      <div className='flex flex-col'>
        <HeroSection />
        <DemoSection />
      </div>
      {/* <HowItWorkSection />
      <PricingSection />
      <CTA /> */} 
    </div>
  );
}



