import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { MotionDiv } from "@/components/common/motion-wrapper";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <form
          className="flex flex-col gap-6"
          onSubmit={onSubmit}
          ref={ref}
        >
          <MotionDiv
            className="flex justify-end items-center gap-1.5"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Input
              id="file"
              type="file"
              name="file"
              accept="application/pdf"
              required
              className={cn(
                isLoading && 'opacity-50 cursor-not-allowed',
                "transition-all duration-300 hover:shadow-md"
              )}
              disabled={isLoading}
            />
          </MotionDiv>

          <Button
            disabled={isLoading}
            className={cn(
              "relative overflow-hidden transition-transform duration-200",
              "hover:scale-105 active:scale-95",
              isLoading && "cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
                <MotionDiv
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </>
            ) : (
              'Upload your PDF'
            )}
          </Button>
        </form>
      </MotionDiv>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;