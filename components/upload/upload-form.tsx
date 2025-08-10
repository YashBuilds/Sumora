"use client";

import { generatedPdfSummary } from "@/actions/upload-action";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useToast } from "@/hooks/use-toast";
import { set, z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";

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

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
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
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
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
        return;
      }

      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        toast({
          title: "❌ Something went wrong",
          variant: "destructive",
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "📁 Uploading PDF...",
        description: "We are uploading your PDF! ✨",
      });

      const resp = await startUpload([file]);
      if (!resp) {
        toast({
          title: "❌ Something went wrong",
          variant: "destructive",
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "📁 Processing PDF...",
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      const result = await generatedPdfSummary(resp);
      const { data = null } = result || {};

      if (data) {
        toast({
          title: "📄 Saving PDF...",
          description:
            "Hang tight! Our AI is saving your PDF summary! ✨",
        });
        formRef.current?.reset();
        if(data.summary){
          // save the summary to the database 
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    }
  }; // ✅ this closing brace for handleSubmit stays here

  // ✅ Now we can safely return JSX here
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
} // ✅ closing brace for the component
