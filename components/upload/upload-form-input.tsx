"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React, { FormEvent } from "react";

// Corrected the interface name from 'onSumbit' to 'onSubmit'
interface UploadFormInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Show toast when form is submitted
    toast({
      title: "PDF Upload",
      description: "Your file is being processed...",
    });
    
    // Call the original onSubmit function
    onSubmit(e);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button type="submit">Upload your PDF</Button>
      </div>
    </form>
  );
}