import { Card } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { MotionDiv } from "@/components/common/motion-wrapper";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <MotionDiv 
      className="flex items-start gap-2 sm:gap-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 mt-1" />
      
      <div className="flex-1 min-w-0">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate">
            {title || formatFileName(fileUrl)}
          </h3>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true
            })}
          </p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <MotionDiv
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <span
        className={cn(
          'px-3 py-1 text-xs font-medium rounded-full capitalize',
          status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        )}
      >
        {status}
      </span>
    </MotionDiv>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <MotionDiv
        className="relative h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-full">
          <MotionDiv 
            className="absolute top-2 right-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <DeleteButton summaryId={summary.id} />
          </MotionDiv>

          <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <SummaryHeader
                fileUrl={summary.original_file_url}
                title={summary.title}
                createdAt={summary.created_at}
              />
              <MotionDiv
                className="text-gray-600 line-clamp-1 text-sm sm:text-base pl-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {summary.summary_text}
              </MotionDiv>
              
              <div className="flex justify-between items-center mt-2 sm:mt-4">
                <StatusBadge status={summary.status} />
              </div>
            </div>
          </Link>
        </Card>
      </MotionDiv>
    </MotionDiv>
  );
}