"use client";

import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-action";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast({
        title: "Error occurred while uploading",
        variant: "destructive",
        description: err.message,
      });
    },
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
    
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file");

      if (!(file instanceof File)) {
        console.error("No valid file selected");
        toast({
          title: "❌ No file selected",
          variant: "destructive",
          description: "Please select a PDF file to upload",
        });
        return;
      }

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast({
          title: "❌ Something went wrong",
          variant: "destructive",
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        return;
      }

      toast({
        title: "📁 Uploading PDF...",
        description: "We are uploading your PDF! ✨",
      });

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse || uploadResponse.length === 0) {
        toast({
          title: "❌ Something went wrong",
          variant: "destructive",
          description: "Please use a different file",
        });
        return;
      }

      toast({
        title: "📁 Processing PDF...",
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      const uploadFileUrl = uploadResponse[0]?.serverData?.fileUrl;
      
      if (!uploadFileUrl) {
        toast({
          title: "❌ Upload failed",
          variant: "destructive",
          description: "Failed to get file URL. Please try again.",
        });
        return;
      }

      const result = await generatePdfSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name,
      });

      if (!result?.success || !result.data) {
        toast({
          title: "❌ Failed to generate summary",
          variant: "destructive",
          description: result?.message || "Please try again with a different file",
        });
        return;
      }

      const { data } = result;

      toast({
        title: "📄 Saving PDF...",
        description: "Hang tight! Our AI is saving your PDF summary! ✨",
      });
      
      if (data.summary) {
        const storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: data.title,
          fileName: file.name,
        });

        if (storeResult.success && storeResult.data?.id) {
          toast({
            title: '✨ Summary Generated',
            description: 'Your PDF has been successfully summarized and saved! ✨',
          });

          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        } else {
          toast({
            title: "❌ Failed to save summary",
            variant: "destructive",
            description: storeResult.message || "Please try again",
          });
        }
      } else {
        toast({
          title: "❌ No summary generated",
          variant: "destructive",
          description: "The PDF could not be processed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error occurred", error);
      toast({
        title: "❌ Something went wrong",
        variant: "destructive",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <UploadFormInput 
        isLoading={isLoading} 
        onSubmit={handleSubmit}
      />
      {isLoading && <LoadingSkeleton />}
    </div>
  );
}