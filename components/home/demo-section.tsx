// 'use client';

// import { Pizza } from 'lucide-react';
// import { 
//   MotionDiv, 
//   MotionSection, 
//   MotionH3 
// } from '@/components/common/motion-wrapper';
// import { SummaryViewer } from '@/components/summaries/summary-viewer';

// const DEMO_SUMMARY = `## Quick Overview
// [... your existing summary content ...]`;

// export default function DemoSection() {
//   return (
//     <MotionSection
//       className="relative"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ staggerChildren: 0.3, delayChildren: 0.2 }}
//     >
//       <MotionDiv className="py-10 sm:py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Background Gradient */}
//         <MotionDiv
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 0.3, scale: 1 }}
//           transition={{ duration: 2, ease: "easeOut" }}
//         >
//           <div
//             className="relative left-1/2 aspect-[1155/678] w-[30rem] sm:w-[50rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30"
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.6%, 60.3% 62.4%, 52.6% 68.6%, 47.5% 58.3%, 45.4% 35.5%, 27.5% 56.8%, 24.9% 17.9%, 100% 27.6%, 76.8% 76.1%, 97.7% 74.1%)"
//             }}
//           />
//         </MotionDiv>

//         <MotionDiv 
//           className="flex flex-col items-center text-center space-y-4"
//           initial="hidden"
//           whileInView="visible"
//         >
//           {/* Icon */}
//           <MotionDiv
//             className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4"
//             initial={{ opacity: 0, scale: 0, rotate: -180 }}
//             whileInView={{ 
//               opacity: 1, 
//               scale: 1, 
//               rotate: 0,
//               transition: { type: "spring", damping: 12, stiffness: 100, duration: 1 } 
//             }}
//             whileHover={{ scale: 1.1, rotate: 10 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Pizza className="w-6 h-6 text-rose-500" />
//           </MotionDiv>
          
//           {/* Heading */}
//           <MotionDiv className="text-center mb-10 sm:mb-16">
//             <MotionH3
//               className="font-bold text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto px-2 sm:px-6"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { type: "spring", damping: 20, stiffness: 80, duration: 0.8 } 
//               }}
//             >
//               Watch how Sumora transforms{" "}
//               <MotionDiv
//                 className="inline-block bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ 
//                   opacity: 1,
//                   transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } 
//                 }}
//               >
//                 this Next.js course PDF
//               </MotionDiv>{" "}
//               into an easy-to-read summary!
//             </MotionH3>
//           </MotionDiv>
          
//           {/* Summary Viewer */}
//           <MotionDiv
//             className="flex justify-center items-center w-full px-1 sm:px-4 lg:px-6"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ 
//               opacity: 1, 
//               y: 0,
//               transition: { type: "spring", damping: 20, stiffness: 60, duration: 1, delay: 0.4 } 
//             }}
//           >
//             <SummaryViewer summary={DEMO_SUMMARY} />
//           </MotionDiv>
//         </MotionDiv>
//       </MotionDiv>
//     </MotionSection>
//   );
// }

'use client';

import { Pizza } from 'lucide-react';
import { 
  MotionDiv, 
  MotionSection, 
  MotionH3 
} from '@/components/common/motion-wrapper';
import { SummaryViewer } from '@/components/summaries/summary-viewer';

const DEMO_SUMMARY = `## Quick Overview
- Comprehensive Next.js course from fundamentals to deployment
- Perfect for React developers building production apps
- Theory and hands-on practical examples included
- Real-world projects and best practices covered

## Document Details
- 150+ pages of detailed Next.js documentation
- Step-by-step guides for scalable web applications
- Code examples and implementation patterns
- Performance optimization and deployment strategies
- Latest Next.js 13+ features with App Router

## Getting Started
- Install Next.js using create-next-app command
- Understanding the project structure and file organization
- Setting up development environment and dependencies
- Creating your first pages and components
- Running development server and build processes

## Core Concepts
- File-based routing system for seamless navigation
- Data fetching methods: getStaticProps, getServerSideProps
- API routes for full-stack development capabilities
- Styling options: CSS Modules, Styled Components, Tailwind
- Image and font optimization for better performance

## Pro Tips
- Use Image component for optimized loading
- Implement error boundaries for better UX
- Use dynamic imports for code splitting
- Configure proper caching strategies
- Leverage TypeScript for fewer runtime errors

## Key Terms to Know
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- App Router (Next.js 13+)
- Server Components

## Bottom Line
- Next.js is the go-to framework for production React apps
- Built-in optimizations and developer experience
- Opens doors to high-paying development opportunities`;

export default function DemoSection() {
  return (
    <MotionSection
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.3, delayChildren: 0.2 }}
    >
      <MotionDiv className="py-10 sm:py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Background Gradient */}
        <MotionDiv
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ 
            opacity: 0.3, 
            scale: 1,
            transition: { 
              duration: 2, 
              ease: [0.16, 1, 0.3, 1] // Using cubic-bezier instead of string
            }
          }}
        >
          <div
            className="relative left-1/2 aspect-[1155/678] w-[30rem] sm:w-[50rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.6%, 60.3% 62.4%, 52.6% 68.6%, 47.5% 58.3%, 45.4% 35.5%, 27.5% 56.8%, 24.9% 17.9%, 100% 27.6%, 76.8% 76.1%, 97.7% 74.1%)"
            }}
          />
        </MotionDiv>

        <MotionDiv className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <MotionDiv
            className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { 
                type: "spring", 
                damping: 12, 
                stiffness: 100, 
                duration: 1 
              } 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <Pizza className="w-6 h-6 text-rose-500" />
          </MotionDiv>
          
          {/* Heading */}
          <MotionDiv className="text-center mb-10 sm:mb-16">
            <MotionH3
              className="font-bold text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto px-2 sm:px-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 80, 
                  duration: 0.8 
                } 
              }}
            >
              Watch how Sumora transforms{" "}
              <MotionDiv
                className="inline-block bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.5, 
                    ease: [0.16, 1, 0.3, 1] 
                  } 
                }}
              >
                this Next.js course PDF
              </MotionDiv>{" "}
              into an easy-to-read summary!
            </MotionH3>
          </MotionDiv>
          
          {/* Summary Viewer */}
          <MotionDiv
            className="flex justify-center items-center w-full px-1 sm:px-4 lg:px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 60, 
                duration: 1, 
                delay: 0.4 
              } 
            }}
          >
            <SummaryViewer summary={DEMO_SUMMARY} />
          </MotionDiv>
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  );
}