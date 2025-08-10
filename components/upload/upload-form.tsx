'use client';

import UploadFormInput from "@/components/upload/upload-form-input";

export default function UploadForm(){
    const handleSubmit = () => {
        console.log('submitted')
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl">
           <UploadFormInput onSumbit= {handleSubmit} />
        </div>
    )
}