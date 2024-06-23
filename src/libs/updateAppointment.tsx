
export default async function updateAppointment(appID:string ,dentist:string, appDate:string , token:string) {

    const response = await fetch(`https://backendsw-vercel.vercel.app/api/v1/appointments/${appID}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: appDate, dentist: dentist})
    })
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message)
    }

    return res
}