"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";

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
  
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast({
        title: 'Error occurred while uploading',
        variant: 'destructive',
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        title: '❌ Something went wrong',
        variant: 'destructive',
        description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
      });
      return;
    }

    toast({
      title: '📁 Uploading PDF...',
      description: 'We are uploading your PDF! ✨',
    });

    // schema with zod
    // upload the file to uploadthing

    const resp = await startUpload([file]);
    if (!resp) {
      toast({
        title: '❌ Something went wrong',
        variant: 'destructive',
        description: "Please use a different file",
      });
      return;
    }

    toast({
      title: '📁 Processing PDF...',
      description: 'Hang tight! Our AI is reading through your document! ✨',
    });
    // parse the pdf using lang chain
    // summarize the pdf using AI
    // save the summary to the database
    // redirect to the [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}