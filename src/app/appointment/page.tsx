import AppointmentList from "@/components/AppointmentList";
import getAppointment from "@/libs/getAppointments";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { redirect } from 'next/navigation';
import { readFile } from "fs";

export default async function MyAppointment() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) return null;
    const appointment = getAppointment(session.user.token);
    const readyAppt = await appointment;
    if(session.user.type === "patient" && session.user.role !== "admin"){  
        if(readyAppt.count > 0){
            redirect(`/appointment/${readyAppt.data[0]._id}`);  
    }
    if(readyAppt.count ==0 ){
        return (
            <div>
                <div className="mt-20 text-black text-center text-3xl text-bold space-y-6">
                    You don't have any appointment
                </div>
                <div className="mt-5 mb-20 text-black text-center text-xl text-light space-y-6">
                    We're waiting you for join us :D
                </div>
            </div>
        )
    }
  }

    return (
        <main className="justify-center items-center p-5">
            <h1 className="lg:text-5xl text-3xl font-semibold font-medium w-fit  text-black bg rounded-lg m-3 py-6 px-10 mx-auto bg-bule-300">
                Appointments
            </h1>
            <Suspense
                fallback={
                    <div>
                        <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">
                            Loading...{" "}
                        </p>
                        <div className="mb-20">
                            <LinearProgress />
                        </div>
                    </div>
                }
            >
                <AppointmentList appointmentJson={appointment} />
            </Suspense>
        </main>
    );
}
