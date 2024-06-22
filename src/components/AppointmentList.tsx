import dayjs from "dayjs";
import Link from "next/link";
import { AppointmentJson } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default async function AppointmentList({
    appointmentJson,
}: {
    appointmentJson: Promise<AppointmentJson>;
}) {
    const appointmentJsonReady = await appointmentJson;
    const session = await getServerSession(authOptions);
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap p-5">
                {appointmentJsonReady.data.map((appointmentItem) => (
                    <div
                        className="w-full xl:w-1/2 p-4 transition ease-in-out hover:scale-105"
                        key={appointmentItem._id}
                    >
                        <Link href={`/appointment/${appointmentItem._id}`}>
                            <div
                                className="bg-white rounded-xl border-2 border-slate-200 hover: border-2 hover:bg-slate-50 shadow-lg hover:border-sky-500 relative"
                                key={appointmentItem._id}
                            >
                                {/* <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
                            <button className="text-base text-blue-500 mt-5 text-right" name="Edit Appointment">Edit</button>
              </Link> */}
                                <table className=" border-separate border-spacing-6">
                                    <tbody className="font-semibold md:text-xl text-sm lg:text-2xl mx-10">
                                        <tr>
                                            <td className="text-gray-800 pl-5 xl:pr-16">
                                                Name :{" "}
                                            </td>
                                            <td className="border-gray-200 border-2 rounded-full text-gray-800 text-center items-right px-5 py-2">
                                                {appointmentItem.userName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-800 pl-5 xl:pr-16">
                                                Dentist :{" "}
                                            </td>
                                            <td className="border-gray-200 border-2 rounded-full text-gray-800 text-center items-right px-5 py-2">
                                                {appointmentItem.dentist?.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-800 pl-5 xl:pr-16">
                                                Date :{" "}
                                            </td>
                                            <td className="border-gray-200 border-2 rounded-full text-gray-800 text-center items-right px-5 py-2">
                                                {" "}
                                                {dayjs(appointmentItem.appDate).utcOffset('+07:00').format("DD / MM / YYYY - HH:mm")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {appointmentItem.finished === false ? (
                                    <div className="text-lg font-medium absolute right-5 top-5 bg-emerald-400 p-3 rounded-3xl">
                                        {" "}
                                    </div>
                                ) : (
                                    <div className="text-lg font-medium absolute right-5 top-5 bg-zinc-300 p-3 rounded-3xl">
                                        {" "}
                                    </div>
                                )}
                                {session?.user.type !== "dentist" && (
                                    <Link
                                        href={`/appointment/${appointmentItem._id}/update`}
                                    >
                                        <div className="text-base text-sky-500 m-5 mt-0 text-right font-semibold">
                                            Edit
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
