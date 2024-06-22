  "use client";
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import updateAppointment from "@/libs/updateAppointment";
import updateAppointmentStatus from "@/libs/updateAppointmentStatus";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import dayjs from "dayjs";
import { confirmAlert, sweetAlert } from "@/components/alert";

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);
  const [hasReport, setHasReport] = useState<boolean>(false);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  useEffect(() => {
    const fetchAppointment = async () => {
      const appointment = await getAppointment(params.aid, token);
      setAppointmentDetail(appointment);
      if (appointment.data && appointment.data.report) {
        appointment.data.report.length > 0 ? setHasReport(true) : setHasReport(false);
      }
    };
    fetchAppointment();
  }, []);

  const router = useRouter();

  const finishAppointment = async () => {
    confirmAlert("Are you sure?", "finish this appointment", "warning", async () => {
      try{await updateAppointmentStatus(params.aid, true, token);
      sweetAlert("Successfully", "Appointment finished", "success")
      router.push("/appointment")
      }
      catch(error){
        const err =  error as Error;
        if(err.message === "Appointment not found") {
          sweetAlert("Failed", "Appointment not found", "error");
        } else if(err.message === "No report found for this appointment") {
          sweetAlert("Failed", "No report found for this appointment", "error");
        } else if(err.message === "Failed to update appointment status") {
          sweetAlert("Failed", "Failed to finish the appointment", "error");
        }
      }
    })
  }

  const cancelAppointment = async () => {
    confirmAlert("Are you sure?", "Cancel this appointment", "warning", async () => {
      try{
        await deleteAppointment(appointmentDetail.data._id, token);
        sweetAlert("Successfully", "Appointment canceled", "success")
        router.push("/")
      }
      catch(e){
        let error = e as Error;
        sweetAlert("Failed", error.message, "error");
      }
    })
  }

  if (!appointmentDetail) return (<div>
      <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
      <div className=" mb-20 "><LinearProgress/></div>
    </div>);
  return (
    <main className=" mt-5 mb-20">
      <h1 className="text-center font-semibold text-4xl mb-10 "> Patient Appointments</h1>
        <div className="relative font-medium w-fit rounded-3xl mx-auto my-2 px-10 py-5 text-black space-y-8 justify-center  border-gray-300 border-2 text-center "
          key={appointmentDetail.data._id}>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Patient : {appointmentDetail.data.userName}</div>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Dentist : Doctor {appointmentDetail.data.dentist?.name}</div>
          <div className="text-2xl font-medium mt-3 ml-5 text-left">Appointment Date : {dayjs(appointmentDetail.data.appDate).format('DD / MM / YYYY - HH:mm')}</div>
          {/* <div className="text-lg font-medium absolute right-4 top-[-18px] bg-green-300 p-2 rounded-3xl">{appointmentDetail.data.finished === false? "active" : "Finished"}</div> */}
          {appointmentDetail.data.finished === false? <div className="text-lg font-medium absolute right-5 top-[-10px] bg-emerald-400 p-3 rounded-3xl"> </div> : <div className="text-lg font-medium absolute right-5 top-[-10px] bg-zinc-300 p-3 rounded-3xl"> </div>}
          <div className="text-right">
          { appointmentDetail.data.finished === true ? null :
            ((session.user.type==='patient'&& session.user.role!=="admin") || (session.user.role==="admin"))?
            <div>
            <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
            <button
              className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-3 py-2 shadow-sm text-white inline"
              name="Edit Appointment"
            >
              Edit Appointment
            </button>
          </Link>
          <button onClick={cancelAppointment} className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Cancel
        </button>
        </div>
            : !hasReport ? 
            <div>
            <button onClick={(e)=>{e.stopPropagation(); router.push(`../report/create?apptId=${appointmentDetail.data._id}`)}}
              className="text-base text-blue-500 mt-5 text-right font-medium mr-5">
                Create Report
            </button>
            </div> :  
            <div>
            <button onClick={(e)=>{e.stopPropagation(); router.push(`../report/${appointmentDetail.data.report[0]._id}/update`)}}
              className="text-base text-blue-500 mt-5 text-right font-medium mr-5">
                Update Report
            </button>
              <button onClick={finishAppointment} className="text-base text-blue-500 mt-5 text-right font-medium">
                Finish
            </button>
            </div>
          }
            </div>
          </div>
    </main>
  );
}
