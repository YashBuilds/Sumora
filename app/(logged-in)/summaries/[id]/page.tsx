import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import { SummaryHeader } from "@/components/summaries/summary-header";
import BgGradient from "@/components/common/bg-gradient";
import { SourceInfo } from "@/components/summaries/source-info";
import { FileText } from "lucide-react";
import { SummaryViewer } from "@/components/summaries/summary-viewer";

export default async function SummaryPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at,original_file_url } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            />
          </div>

          {file_name && <SourceInfo 
          title={title}
          summaryText={summary_text}
          fileName={file_name}
          createdAt={created_at}
          originalFileUrl={original_file_url}
           />}

     <div className="relative mt-4 sm:mt-8 lg:mt-16">

  {/* ✅ shifted closer to card */}
  <div className="absolute top-2 right-40 flex items-center gap-1 sm:gap-2 
                  text-xs sm:text-sm text-muted-foreground 
                  bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 
                  rounded-full shadow z-10">
    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
    {word_count?.toLocaleString()} words
  </div>

  <div className="relative px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md 
                  border border-rose-100 sm:rounded-3xl shadow-md shadow-rose-300 
                  transition-all duration-300 hover:brightness-105 max-w-xl mx-auto">

    <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-orange-50 
                    to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

    <div className="relative mt-8 sm:mt-6 flex justify-center">
      <SummaryViewer summary={summary_text} />
    </div>
  </div>
</div>



          {/* <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border border-rose-100 sm:rounded-3xl shadow-md shadow-rose-300 transition-all duration-300 hover:brightness-105 max-w-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-orange-50 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />
              <div className="absolute top-2 sm:top-4 sm:right-4 flex items-center gap-2 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              </div>
              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
