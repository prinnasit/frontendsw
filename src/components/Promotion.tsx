import DentistCatalog from "@/components/DentistCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DentistCatalogHorizontal from "./DentistCatalogHorizontal";

export default async function Promotion() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const dentist = getDentists();
    
    if (session.user.type !== "dentist") {
        return (
            <main className="p-5">
                <h1 className="text-center font-semibold text-4xl text-black">
                    Our Dentists
                </h1>
                <Suspense
                    fallback={
                        <div>
                            <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">
                                Loading...{" "}
                            </p>
                            <div className=" mb-20 ">
                                <LinearProgress />
                            </div>
                        </div>
                    }
                >
                    <DentistCatalogHorizontal dentistsJson={dentist} />
                </Suspense>
            </main>
        );
    } else {
        return null
    }
    
}
