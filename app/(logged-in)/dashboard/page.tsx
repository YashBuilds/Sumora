import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { hasReachedUploadLimit } from "@/lib/user";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper"; // Import your custom motion components

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  
  if (!userId) {
    return redirect('/sign-in');
  }

  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);

  return (
    <MotionDiv 
      className="min-h-screen"
      initial="hidden"
      animate="show"
      variants={fadeIn}
    >
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      
      <div className="container mx-auto flex flex-col gap-4">
        <MotionDiv 
          className="flex gap-4 mb-8 mt-8 justify-between"
          variants={item}
        >
          <div className="flex flex-col gap-2">
            <MotionH1 
              className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Summaries
            </MotionH1>
            <MotionP 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transform your PDFs into concise, actionable insights
            </MotionP>
          </div>
          
          {!hasReachedLimit && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="link"
                className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
                asChild
              >
                <Link href="/upload" className="flex items-center text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  New Summary
                </Link>
              </Button>
            </MotionDiv>
          )}
        </MotionDiv>

        {hasReachedLimit && (
          <MotionDiv 
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MotionDiv 
              className="bg-rose-50 border border-rose-200 rounded-lg p-5 text-rose-800"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-sm">
                You've reached the limit of {uploadLimit} uploads on the Basic plan.{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center hover:text-rose-900 transition-colors"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{" "}
                for unlimited uploads.
              </p>
            </MotionDiv>
          </MotionDiv>
        )}
        
        {summaries.length === 0 ? ( 
          <MotionDiv
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            <EmptySummaryState />
          </MotionDiv>
        ) : (
          <MotionDiv 
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {summaries.map((summary, index) => (
              <MotionDiv 
                key={summary.id}
                variants={item}
                custom={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SummaryCard summary={summary} />
              </MotionDiv>
            ))}
          </MotionDiv>
        )}
      </div>
    </MotionDiv>
  )
}