import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function LoadingSkeleton() {
  return (
    <Card className="relative p-2 h-[280px] w-full max-w-lg mx-auto overflow-hidden bg-gradient-to-br from-background via-background/95 to-rose-500/5 rounded-2xl border border-rose-500/20 shadow-sm">

      {/* Animated Loading Bar */}
      <div className="absolute top-0 left-0 right-0 bg-background/90 backdrop-blur-xs pt-1 pb-1.5 border-b border-rose-500/20">
        <div className="px-2 flex gap-1.5">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
            >
              <div
                className={cn(
                  "h-full bg-gradient-to-r from-rose-500/80 to-rose-600 animate-pulse",
                  index === 0 ? "w-full" : index === 1 ? "w-2/3" : "w-1/3"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 pb-20 px-4">

        {/* Document Title Placeholder */}
        <div className="mb-6 flex flex-col items-center">
          <Skeleton className="h-6 w-48 rounded-full bg-rose-500/10 mb-2" />
          <Skeleton className="h-4 w-32 rounded-full bg-rose-500/10" />
        </div>

        {/* Animated Content Placeholders */}
        <div className="space-y-3">

          {/* Key Points Section */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 rounded-full bg-rose-500/10 mb-3" />
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-50/5 to-gray-100/5">
                <Skeleton className="h-5 w-5 rounded-full bg-rose-500/10 mt-0.5 flex-shrink-0" />
                <Skeleton className="h-4 flex-1 rounded-full bg-rose-500/10" />
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="space-y-2 mt-5">
            <Skeleton className="h-5 w-28 rounded-full bg-rose-500/10 mb-3" />
            {[1, 2].map((_, index) => (
              <div key={index} className="p-3 rounded-lg bg-gradient-to-br from-gray-50/5 to-gray-100/5">
                <div className="flex gap-3">
                  <Skeleton className="h-5 w-5 rounded-full bg-rose-500/10 flex-shrink-0" />
                  <Skeleton className="h-4 flex-1 rounded-full bg-rose-500/10" />
                </div>
                <Skeleton className="h-4 w-full rounded-full bg-rose-500/10 mt-2" />
                <Skeleton className="h-4 w-3/4 rounded-full bg-rose-500/10 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/90 backdrop-blur-xs border-t border-rose-500/10">
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-9 rounded-full bg-rose-500/10" />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((_, index) => (
                <Skeleton
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    index === 0 ? "bg-rose-500/80" : "bg-rose-500/20"
                  )}
                />
              ))}
            </div>
            <Skeleton className="h-9 w-9 rounded-full bg-rose-500/10" />
          </div>
        </div>
      </div>
    </Card>
  );
}