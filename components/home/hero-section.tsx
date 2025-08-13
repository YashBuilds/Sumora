'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ✅ Motion component definitions
const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionSpan = motion.span;

// ✅ Example animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const conciseVariants = { hidden: { scale: 0.9 }, visible: { scale: 1 } };
const conciseHoverVariants = { scale: 1.05 };
const buttonVariants = { scale: 1.05 };

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col items-center justify-center z-0 py-12 sm:py-20 lg:pb-28 px-4 sm:px-8 lg:px-12 max-w-7xl overflow-hidden"
    >
      {/* Badge */}
      <MotionDiv variants={itemVariants}>
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x">
          <Badge
            variant="secondary"
            className="cursor-pointer px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base font-medium bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-1.5 sm:mr-2 text-rose-600 animate-pulse" />
            <span className="text-rose-600">Powered by AI</span>
          </Badge>
        </div>
      </MotionDiv>

      {/* Heading */}
      <MotionH1 className="font-bold py-6 text-center text-3xl sm:text-5xl lg:text-6xl leading-tight break-words max-w-[90vw]">
        <div>
          Transform PDFs into{" "}
          <MotionSpan variants={conciseVariants} className="relative inline-block">
            <MotionSpan
              whileHover={conciseHoverVariants}
              className="relative z-10 px-2 sm:px-3 py-0.5 italic font-extrabold text-rose-600"
            >
              concise
            </MotionSpan>
            <span
              className="absolute inset-0 bg-gradient-to-r from-rose-200/60 via-rose-300/40 to-rose-200/60 -rotate-6 rounded-lg transform -skew-y-3 blur-sm"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 bg-rose-200/30 -rotate-3 rounded-lg transform skew-y-2"
              aria-hidden="true"
            />
            <span
              className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full animate-ping opacity-75"
              aria-hidden="true"
            />
          </MotionSpan>
        </div>
        <div>summaries</div>
      </MotionH1>

      {/* Subheading */}
      <MotionH2
        variants={itemVariants}
        className="text-base sm:text-xl lg:text-2xl text-center px-2 sm:px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Get a beautiful summary reel of the document in seconds.
      </MotionH2>

      {/* Button */}
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant="link"
          className="text-white mt-6 text-sm sm:text-lg lg:text-xl rounded-full px-6 sm:px-10 lg:px-12 py-4 sm:py-6 lg:py-8 lg:mt-16 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex gap-1.5 sm:gap-2 items-center">
            <span>Try Sumora</span>
            <ArrowRight className="animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
