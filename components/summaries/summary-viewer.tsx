'use client';

import { Card, CardContent } from '../ui/card';
import { useState } from 'react';
import { NavigationControls } from './navigation-controls';
import ProgressBar from './progress-bar';
import ContentSection from '@/components/summaries/content-section';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10'>
      <h2 className="text-2xl lg:text-3xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  // Parse the summary into sections
  const sections = summary
    .split('## ')
    .slice(1) // Remove empty before first section
    .map(section => {
      const [title, ...points] = section.split('\n').filter(line => line.trim());
      return {
        title: title ? title.trim() : '',
        points: points
          .map(point => point.replace(/^- /, '').trim())
          .filter(Boolean),
      };
    });

  // Navigation handlers
  const handleNext = () =>
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection(prev => Math.max(prev - 1, 0));

  const handleSectionSelect = (index: number) =>
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));

  return (
    <Card
      className="relative px-2 
        h-[80vh] sm:h-[60vh] lg:h-[70vh] 
        w-full px-[60px]
        overflow-hidden
        bg-gradient-to-br from-background via-background/95 to-rose-300/30
        backdrop-blur-lg shadow-2xl rounded-3xl
        border border-rose-300/10"
    >
      <ProgressBar sections={sections} currentSection={currentSection} />

      <CardContent className="h-full overflow-auto scrollbar-hide pt-12 pb-16 px-4 sm:px-6">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ''} />

          {/* ✅ Pass title and points to ContentSection */}
          <ContentSection
            title={sections[currentSection]?.title || ''}
            points={sections[currentSection]?.points || []}
          />
        </div>
      </CardContent>

      {/* Navigation controls */}
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSectionSelect}
      />
    </Card>
  );
}
