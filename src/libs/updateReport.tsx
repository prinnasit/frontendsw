export default async function updateReport(treatment:string, prescribe:string , recommend:string, reportID:string,  token:string) {

    const response = await fetch(`https://backendsw-vercel.vercel.app/api/v1/reports/${reportID}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({treatment:treatment, prescribed_medication:prescribe , recommendations:recommend})
    })

    if (!response.ok) {
        throw new Error("Failed to update appointment")
    }

    return await response.json()
}