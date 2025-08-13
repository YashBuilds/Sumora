import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasReachedUploadLimit } from "@/lib/user";
import { MotionDiv } from "@/components/common/motion-wrapper";

export const maxDuration = 60;

export default async function Page() {
  const user = await currentUser();

  if(!user?.id) {
    redirect('/sign-in');
  }

  const userId = user.id;

  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if(hasReachedLimit){
    redirect('/dashboard');
  }

  return (
    <MotionDiv 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <MotionDiv
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UploadHeader />
          </MotionDiv>
          
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-md"
          >
            <UploadForm />
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}