import Image from "next/image";
import getDentist from "@/libs/getDentist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function DentistDetailPage({
    params,
}: {
    params: { did: string };
}) {
    const dentistDetail = await getDentist(params.did);
    const session = await getServerSession(authOptions);

    return (
        <main className="text-center p-5">
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
                <h1 className="text-lg font-medium"></h1>
                <div className="flex flex-row my-5 ">
                    <div className="relative h-auto w-1/3 mx-20 rounded-lg overflow-hidden">
                        <Image
                            src={dentistDetail.data.picture}
                            alt="Hospital Image"
                            width={2000}
                            height={2000}
                            objectFit="contain"
                        />
                    </div>
                    <div className="text-xl mx-5 text-gray-800 w-[50%]">
                        {" "}
                        <div className="text-3xl font-bold text-center">
                            Doctor {dentistDetail.data.name}
                        </div>
                        <div className="h-[80] rounded-2xl border-2 border-slate-200 mt-8 ">
                            <table className=" border-separate border-spacing-6">
                                <tbody className=" text-xl mx-10">
                                    <tr>
                                        <td className="font-semibold font-medium pl-5 pr-20 text-left">
                                            Experiences :
                                        </td>
                                        <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5">
                                            {
                                                dentistDetail.data
                                                    .yearsOfExperience
                                            }{" "}
                                            Years
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold font-medium pl-5 pr-20 text-left">
                                            Expertise :
                                        </td>
                                        <td className="border-gray-200 border-2 rounded-full text-gray-800 font-medium text-center items-right px-5">
                                            {
                                                dentistDetail.data
                                                    .areaOfExpertise
                                            }
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            {/* <div className="mx-5">Year Of Experiences: {dentistDetail.data.yearsOfExperience}{" "}</div>
                <div className="mx-5 "> Area Of Expertise: {dentistDetail.data.areaOfExpertise}{" "}</div> */}
                        </div>
                        {session?.user.type === "patient" &&
                            session?.user.role !== "admin" && (
                                <Link
                                    href={`/makeappointment?dentistid=${dentistDetail.data.id}`}
                                >
                                    <button className="bg-orange-400 rounded-full hover:bg-orange-300 text-white font-semibold px-7 py-2 shadow-lg text-white mx-auto text-2xl mt-8">
                                        Select
                                    </button>
                                </Link>
                            )}
                    </div>
                </div>
            </Suspense>
        </main>
    );
}
