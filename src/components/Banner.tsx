"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function Banner() {
    //   const covers =['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    //   const [index, setIndex] = useState(0)

    const router = useRouter();

    const { data: session } = useSession();

    const token = session?.user.token;

    const [me, setMe] = useState<any>(null);

    useEffect(() => {
        const fetchMe = async () => {
            if (!token) return null;
            const profile = await getUserProfile(token);
            setMe(profile);
        };
        fetchMe();
    }, []);

    let buttonMessage;
    let path = "/dentist";

    if (session === null) {
        buttonMessage = "Care Your Teeth";
        path = "/api/auth/signin";
    } else if (session.user.role === "admin") {
        buttonMessage = "All Appointment";
        path = "/appointment";
    } else if (session.user.type === "patient") {
        buttonMessage = "Care Your Teeth";
        path = "/dentist";
    } else if (session.user.type === "dentist") {
        buttonMessage = "Your Schedule";
        path = "/schedule";
    }

    return (
        <div className="px-5 lg:px-24 h-[80vh] relative flex flex-row items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img
                    src="/img/cover1.jpg"
                    alt="Cover Image"
                    className="w-full h-full object-cover"
                />
            </div>
            <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 z-30">
                <div className="p-12 bg-white rounded-lg">
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter text-black">
                        Dentnutz
                    </h1>
                    <h2 className="text-3xl text-sky-500 lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter ">
                        Teeth Protector
                    </h2>
                    {session && me ? (
                        <p className="text-lg mt-4 text-slate-600 max-w-xl">
                            Welcome {me.data.name}
                        </p>
                    ) : null}
                    {session == null && (
                        <p className="text-lg mt-4 text-slate-600 max-w-xl">
                            Welcome to our dental booking platform! Your journey
                            to a healthier smile starts here.
                        </p>
                    )}
                    {session?.user.type == "patient" &&
                        session?.user.role !== "admin" && (
                            <p className="text-lg mt-4 text-slate-600 max-w-xl">
                                Taking care of your oral health is an investment
                                in happiness and confidence throughout every
                                stage of life.
                            </p>
                        )}
                    {session?.user.type == "dentist" &&
                        session?.user.role !== "admin" && (
                            <p className="text-lg mt-4 text-slate-600 max-w-xl">
                                We're thrilled to have you join us. Our team is
                                here to ensure you have a seamless experience.
                            </p>
                        )}
                    {session?.user.role == "admin" && (
                        <p className="text-lg mt-4 text-slate-600 max-w-xl">
                            Stay focused and keep up the good work! Your efforts
                            are valued and appreciated by all. Keep pushing
                            forward, you're doing great!
                        </p>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <a
                            onClick={(e)=>{e.stopPropagation(); router.push(path);}}
                            className="rounded-xl bg-orange-400 text-white text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 hover:bg-orange-800  border-2 border-transparent flex gap-1 items-center justify-center"
                        >
                          {buttonMessage}
                        </a>
                        
                        
                    </div>
                </div>
            </main>
        </div>

        // <div className="p-5 m-0 w-screen h-[80vh] relative flex flex-row items-center justify-center"
        // style={{ backgroundColor: 'rgb(247, 238, 221)' }}>

        //     <div className="text-black text-left rounded-lg px-10 py-10 mx-20 z-20 items-center w-2/5" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
        //         <h1 className='text-8xl font-semibold mt-0 mb-0 '>Dentnutz</h1>
        //         <h2 className='text-5xl font-normal mt-0 mb-3 text-sky-400'>Teeth Protector</h2>
        //         {
        //           session && me? <div className='font-semibold text-cyan-800 text-xl mb-2'>Welcome {me.data.name}</div> : null

        //         }
        //         {
        //           session==null && <div className='font-medium text-cyan-800 text-l mb-2'>
        //             Welcome to our dental booking platform! Your journey to a healthier smile starts here.</div>
        //         }
        //         {
        //           session?.user.type=='patient'&& session?.user.role!=='admin' && <div className='font-medium text-cyan-800 text-l mb-2'>
        //             Taking care of your oral health  is an investment
        //             in happiness and confidence throughout every stage of life.</div>
        //         }
        //         {
        //           session?.user.type=='dentist'&& session?.user.role!=='admin'&& <div className='font-medium text-cyan-800 text-l mb-2'>
        //             We're thrilled to have you join us. Our team is here to ensure you have a seamless experience.</div>

        //         }
        //         {
        //           session?.user.role=='admin' && <div className='font-medium text-cyan-800 text-l mb-2'>
        //             Stay focused and keep up the good work! Your efforts are valued and appreciated by all. Keep pushing forward, you're doing great!</div>
        //         }
                // <button className='bg-orange-400 text-white text-2xl font-semibold py-2 px-2 my-5 rounded-full text-center ml-20 drop-shadow-md hover:bg-orange-300 py-3 px-5'
                //     onClick={(e)=>{e.stopPropagation(); router.push(path);}}>
                //     {buttonMessage}
                // </button>
        //     </div>

        //     <div className='flex-grow'>
        //         <Image src='/img/cover1.jpg'  alt='cover' fill={true}  priority={true}  className='object-cover w-[100%] h-[100%]' />
        //     </div>
        // </div>
    );
}
