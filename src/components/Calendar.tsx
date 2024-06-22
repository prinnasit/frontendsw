"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    CurrentTimeIndicator,
    AppointmentTooltip,
    ViewSwitcher,
    WeekView,
    DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState, useEffect } from "react";
import getAppointments from "@/libs/getAppointments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppointmentItem } from "../../interface";

export default function Calendar() {
    const [data, setData] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: session } = useSession();
    const token = session?.user.token;
    if (!token) return null;
    const router = useRouter();

    useEffect(() => {
        const fetchAppointment = async () => {
            const appointments = await getAppointments(token);
            setData(
                appointments.data
                    .filter(
                        (appointment: AppointmentItem) => !appointment.finished
                    )
                    
                    .map((appointment: AppointmentItem) => ({
                    
                        startDate: appointment.appDate,
                        endDate: new Date(
                            new Date(appointment.appDate).setHours(
                                new Date(appointment.appDate).getHours() + 3
                            )
                        ),
                        title: appointment.userName,
                        appID: appointment._id,
                    }))
            );
        };
        fetchAppointment();
    }, []);

    const Appointment = ({
        children,
        data,
    }: {
        children: React.ReactNode;
        data: {
            startDate: string;
            endDate: string;
            title: string;
            appID: string;
        };
    }) => {
        const { startDate, endDate } = data;
        const date = new Date(startDate);
        const hoursInGMTPlus7 = (date.getUTCHours() + 7) % 24;
        const isAtNine = hoursInGMTPlus7 === 9;
        console.log(hoursInGMTPlus7);
        return (
            <Appointments.Appointment

                data={data}
                draggable={false}
                resources={[]}
                onClick={() => router.push("/appointment/" + data.appID)}
                style={{
                    backgroundColor: isAtNine ? "#4287f5":"#FFAA00"  ,
                    borderRadius: '8px',
                }}
            >
                {children}
            </Appointments.Appointment>
        );
    };
    

    return (
        <div className="max-w-screen-2xl mx-auto m-8 rounded-xl border-2 border-slate-200 hover: border-2 hover:bg-slate-50 shadow-lg hover:border-sky-500 relative">
        <Paper className="rounded-xl">
            <Scheduler data={data}>
                <ViewState defaultCurrentDate={currentDate} />

                <MonthView />
                <WeekView startDayHour={9} endDayHour={18} />
                <DayView startDayHour={9} endDayHour={18} />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <Appointments appointmentComponent={Appointment as any} />
                <AppointmentTooltip />
                <CurrentTimeIndicator updateInterval={1000} />
            </Scheduler>
        </Paper>
        </div>
    );
}
