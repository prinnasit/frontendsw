export default async function updateAppointmentStatus(appID:string ,status:boolean , token:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${appID}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({finished: status})
    })

    if (response.status == 404) {
        throw new Error("Appointment not found")
    }
    else if(response.status == 418){
        throw new Error("No report found for this appointment")
    }
    else if (!response.ok) {
        throw new Error("Failed to update appointment status")
    }

    return await response.json()
}