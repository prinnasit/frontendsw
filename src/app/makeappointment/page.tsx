"use client";
import DateReserve from "@/components/DateReserve";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import addAppointment from "@/libs/addAppointment";
import { LinearProgress } from "@mui/material";
import { sweetAlert } from "@/components/alert";

export default function AppointmentMaking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const token = session?.user.token;
  if (!token) return null;

  if ((session.user.type === 'dentist') || (session.user.role==="admin")){
    router.push('/');
  }
  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [dentistID, setDentistID] = useState<string | null>(searchParams.get("dentistid"));
  const [loading, setLoading] = useState(true);

  let appDate: string | null = null;

  if (appointmentDate && appointmentTime) {
    const timeString =
    appointmentDate && appointmentTime
            ? dayjs(
                    `${appointmentDate.format(
                        "YYYY-MM-DD"
                    )}T${appointmentTime.format("HH:mm")}`
                )
            : null;
    appDate = dayjs(timeString).format('YYYY-MM-DD HH:mm:ss Z');
  }
  

//   function onTimeChange(value: number | null) {
//     let selectedTime: dayjs.Dayjs | null = null;
//     if (value === 1) {
//         selectedTime = morning;
//     } else if (value === 2) {
//         selectedTime = afternoon;
//     }

//     const timeString =
//         reserveDate && selectedTime
//             ? dayjs(
//                     `${reserveDate.format(
//                         "YYYY-MM-DD"
//                     )}T${selectedTime.format("HH:mm")}`
//                 )
//             : null;

//     setReserveDate(dayjs(timeString));
// }

  const makingAppointment = async () => {
    if (!dentistID) {
      sweetAlert("Incomplete", "Please select dentist", "warning");
      return
    }
    if (!appDate) {
      sweetAlert("Incomplete", "Please select date for appointment", "warning");
      return
    }
    try {
      const appointment = await addAppointment(
        dentistID,
        appDate,
        token
        
      );

      if (appointment) {
        sweetAlert("Successfully", "Appointment booked successfully", "success");
        router.push("/appointment");
      } else {
        sweetAlert("Failed", "Appointment booking failed", "error");
      }

    } catch (error) {
      const err =  error as Error;
      if(err.message === "Appointment date and dentist already exists") {
        sweetAlert("Failed", "Appointment date and dentist already exists", "error");
      } else if(err.message === "Cannot book more than 1 appointment") {
        sweetAlert("Failed", "Cannot book more than 1 appointment", "error");
      } else if(err.message === "Cannot book appointment in the past") {
        sweetAlert("Failed", "Cannot book appointment in the past", "error");
      }
      else{
        //console.log(appointmentDate, appointmentTime, dentistID, appDate )
        sweetAlert("Failed", "Failed to add appointment", "error");
      }
      //console.log(error)
    }
  };

  return (
    <main className="w-[100%] text-center items-center space-y-5 mt-20 mb-20" >
      <div className="font-semibold w-fit rounded-3xl mx-auto my-2 px-14 py-5 text-black space-y-14 justify-center items-center border-2 border-gray-400">
        <div className="text-5xl mt-4" >Create Appointment</div>

          <DateReserve
            onDateChange={(value: Dayjs) => {
              setAppointmentDate(value);
            }} currentDentist= {dentistID}
            currentDate={appointmentDate}
            onDentistChange={(value: string) => {setDentistID(value)}}
            onTimeChange={(value: Dayjs) => {
              setAppointmentTime(value);
            }}
            pushButton={makingAppointment}
            buttonName="Create Appointment"
          />
            
      </div>
    </main>
  );
}
