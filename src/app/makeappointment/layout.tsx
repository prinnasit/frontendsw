import { SessionProvider } from "next-auth/react";

export default function AppointmentLayout({children}:{children:React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    );
}