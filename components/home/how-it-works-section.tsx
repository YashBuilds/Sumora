'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <FileText size={48} className="sm:size-16" strokeWidth={1.5} />
      </motion.div>
    ),
    label: 'Upload your PDF',
    description: 'Drag and drop your PDF or click to upload it instantly.',
  },
  {
    icon: (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <BrainCircuit size={48} className="sm:size-16" strokeWidth={1.5} />
      </motion.div>
    ),
    label: 'AI Analysis',
    description: 'Our advanced AI processes your document in seconds.',
  },
  {
    icon: (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <FileOutput size={48} className="sm:size-16" strokeWidth={1.5} />
      </motion.div>
    ),
    label: 'Get Summary',
    description: 'Receive a clear, concise summary ready to use.',
  },
];


export default function HowItWorksSection() {
  return (
    <MotionSection
      className="relative overflow-hidden bg-gray-50 py-16 sm:py-24 lg:py-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0.14, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Background gradient blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-1/2 aspect-[1155/678] w-[30rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-25 sm:w-[40rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.6%, 60.3% 62.4%, 52.6% 68.6%, 47.5% 58.3%, 45.4% 35.5%, 27.5% 56.8%, 24.9% 17.9%, 0.3% 27.6%, 0% 76.8%, 20.1% 100%, 36.8% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* Section title - Enhanced */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <MotionH1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </MotionH1>
          <MotionH3
            className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Transform any PDF into a digestible summary in just 3 simple steps
          </MotionH3>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch" key={idx}>
              <StepItem {...step} />

              {/* Arrow (desktop only) */}
              {idx < steps.length - 1 && (
                <motion.div
                  className="hidden sm:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <MoveRight
                    size={32}
                    strokeWidth={1.5}
                    className="text-rose-500"
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}



function StepItem({ icon, label, description }: Step) {
  return (
    <motion.div
      className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-white/10 hover:border-rose-500/50 transition-colors group w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 6px 24px rgba(233,81,81,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="flex flex-col gap-4 h-full">
        {/* Icon */}
        <div className="flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-lg sm:text-xl">{label}</h4>
          <MotionP
            className="text-center text-gray-600 text-sm sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            {description}
          </MotionP>
        </div>
      </div>
    </motion.div>
  );
}
