import { cn } from '@/lib/utils';

interface Section {
  title: string;
  points: string[];
}

export default function ProgressBar({
  sections,
  currentSection,
}: {
  sections: Array<Section>;
  currentSection: number;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 
      bg-background/80 backdrop-blur-xs pt-2 px-2 border-b
      border-rose-300/20">
      <div className="pt-1 flex gap-1.5">
        {sections.map((_, index) => (
          <div 
            key={index}
            className="h-1.5 flex-1 rounded-full
            bg-rose-500/10 overflow-hidden"
          >
            <div
              className={cn(
                'h-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500',
                index === currentSection
                  ? 'w-full'
                  : currentSection > index
                  ? 'w-full opacity-40'
                  : 'w-0'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}