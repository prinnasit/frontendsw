export default async function deleteReport(id:string,token: string) {

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/reports/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Cannot delete Report");
    }
  
    return await response.json();
  }
  