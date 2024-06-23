export default async function deleteAppointment(id:string,token: string) {

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
  
    return res;
  }
  