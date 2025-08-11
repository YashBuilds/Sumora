import { FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600">
          No summaries yet
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Upload your first PDF to get started with AI-powered summaries.
        </p>
      </div>
      <Button
        variant="link"
        className="mt-6 text-white bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline hover:scale-105 transition-all duration-300"
        asChild
      >
        <Link href="/upload">
          Create Your First Summary
        </Link>
      </Button>
    </div>
  );
}