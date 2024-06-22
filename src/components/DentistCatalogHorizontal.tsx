import Link from "next/link";
import Card from "./Card";
import { DentistJson } from "../../interface";

export default async function DentistCatalogHorizontal({
    dentistsJson,
}: {
    dentistsJson: Promise<DentistJson>;
}) {
    const dentistsJsonReady = await dentistsJson;

    return (
        <div className="container mx-auto overflow-x-scroll whitespace-nowrap">
            <div className="flex flex-nowrap justify-start">
                {dentistsJsonReady.data.map((dentistItem) => (
                    <Link
                        href={`/dentist/${dentistItem._id}`}
                        className="lg:ml-10 mx-5 mb-10 mt-10 transition ease-in-out hover:scale-105 inline-block"
                    >
                        <Card
                            key={dentistItem._id}
                            dentistName={dentistItem.name}
                            imgSrc={dentistItem.picture}
                            areaOfExpertise={dentistItem.areaOfExpertise}
                            yearsOfExperience={dentistItem.yearsOfExperience}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
