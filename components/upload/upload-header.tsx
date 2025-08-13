import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { MotionDiv, MotionSpan } from "@/components/common/motion-wrapper";

export default function UploadHeader() {
    return(
        <MotionDiv 
            className="flex flex-col items-center justify-center gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
        >
          <MotionDiv
            className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-br from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Badge
              variant={"secondary"}
              className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
            >
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <p className="text-base">AI-Powered Content Creation</p>
            </Badge>
          </MotionDiv>

          <MotionDiv 
            className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Start Uploading{" "}
            <MotionSpan 
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 px-2">Your PDF's</span>
              <MotionSpan
                className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform skew-y-1"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              />
            </MotionSpan>{" "}
          </MotionDiv>

          <MotionDiv
            className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>Upload your PDF and let our AI do the magic! ✨</p>
          </MotionDiv>
        </MotionDiv>
    )
}