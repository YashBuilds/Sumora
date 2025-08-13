import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import { SummaryHeader } from "@/components/summaries/summary-header";
import BgGradient from "@/components/common/bg-gradient";
import { SourceInfo } from "@/components/summaries/source-info";
import { FileText } from "lucide-react";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { Suspense } from "react";
import LoadingSummary from "@/app/(logged-in)/summaries/[id]/loading";

export default async function SummaryPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, original_file_url } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <MotionDiv 
      className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          {/* Suspense boundary for header with loading fallback */}
          <Suspense fallback={<LoadingSummary />}>
            <MotionDiv
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <SummaryHeader
                title={title}
                createdAt={created_at}
                readingTime={readingTime}
              />
            </MotionDiv>
          </Suspense>

          {/* Suspense boundary for source info */}
          <Suspense fallback={<LoadingSummary />}>
            {file_name && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <SourceInfo 
                  title={title}
                  summaryText={summary_text}
                  fileName={file_name}
                  createdAt={created_at}
                  originalFileUrl={original_file_url}
                />
              </MotionDiv>
            )}
          </Suspense>

          {/* Main content area with loading fallback */}
          <Suspense fallback={<LoadingSummary />}>
            <MotionDiv 
              className="relative mt-4 sm:mt-8 lg:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Word count badge */}
              <MotionDiv
                className="absolute top-2 right-40 flex items-center gap-1 sm:gap-2 
                          text-xs sm:text-sm text-muted-foreground 
                          bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 
                          rounded-full shadow z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              </MotionDiv>

              {/* Main content card */}
              <MotionDiv
                className="relative px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md 
                          border border-rose-100 sm:rounded-3xl shadow-md shadow-rose-300 
                          transition-all duration-300 hover:brightness-105 max-w-xl mx-auto"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-orange-50 
                              to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

                <MotionDiv 
                  className="relative mt-8 sm:mt-6 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <SummaryViewer summary={summary_text} />
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          </Suspense>
        </div>
      </div>
    </MotionDiv>
  );
}