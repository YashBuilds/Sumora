import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
          {/* Title & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-xl text-gray-500 text-sm sm:text-base md:text-lg dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>

          {/* Button */}
          <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center sm:w-auto">
            <Button
              size="lg"
              variant="link"
              className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-white hover:text-white transition-all duration-300"
            >
              <Link href="/#pricing" className="flex items-center justify-center w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
