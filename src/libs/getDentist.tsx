
export default async function getDentist(id:string) {
    await new Promise( (resolve)=> setTimeout(resolve, 1000))
    const response = await fetch(`https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/dentists/${id}`, {
        method: 'GET'
    })
    if (!response.ok) {
        throw new Error("Failed to fetch dentist")
    }

    return await response.json()
}