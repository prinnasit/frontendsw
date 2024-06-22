"use client"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function reportLayout({children}:{children:React.ReactNode}) {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user.role == "admin") {
    router.push('/');
  }
  
  return (
      <div className="mt-10">
          {children}
      </div>
  );
}