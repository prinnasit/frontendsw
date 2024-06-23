export default async function getAppointment(id:string,token: string) {

  const response = await fetch(
    `https://backendsw-vercel.vercel.app/api/v1/appointments/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Appointment");
  }

  return await response.json();
}
