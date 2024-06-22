export {default} from 'next-auth/middleware'

export const config = {
    matcher: ["/makeappointment", "/appointment/:path*", "/myaccount", "/report/:path*", "/deleteReport", "/schedule"]
}