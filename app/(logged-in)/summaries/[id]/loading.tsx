import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

// Skeleton component
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/80', className)}
      {...props}
    />
  );
}

// Header Skeleton Component
function HeaderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-5 w-40 rounded-full" />
      </div>
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}

// Content Skeleton Component
function ContentSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i % 2 === 0 ? 'w-full' : 'w-11/12')}
        />
      ))}
    </div>
  );
}

// Gradient Background Component
function BgGradient({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 overflow-hidden opacity-50',
        'bg-gradient-to-br from-rose-400 via-rose-300 to-orange-200',
        className
      )}
      {...props}
    />
  );
}

// Main Loading Component
export default function LoadingSummary() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient />
      
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col gap-8">
            <HeaderSkeleton />
          </div>
        </div>

        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100/30">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-30 rounded-3xl" />
            
            {/* Icon */}
            <div className="absolute top-4 right-4 text-rose-300/20">
              <FileText className="h-8 w-8" />
            </div>
            
            <div className="relative">
              <ContentSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}