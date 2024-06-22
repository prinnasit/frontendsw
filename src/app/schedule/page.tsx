'use client'
import Calendar from "@/components/Calendar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Schedule() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return null
  }
  if (session.user.role !== "admin" && session.user.type === "patient") { 
    router.push("/")
  }

  return (
    <main className="justify-center items-center">
        <div className="lg:text-5xl text-3xl font-medium w-fit font-semibold text-black bg rounded-lg m-3 py-6 px-10 mx-auto bg-bule-300">{session.user.role !== "admin" ? "Your Schedule" : "All Schedule"}</div>
        <Calendar />
    </main>
    
  );
}