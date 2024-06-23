export default async function getReport(id:string,token: string) {
  // await new Promise( (resolve)=> setTimeout(resolve, 1000))
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/reports/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Report");
  }

  return await response.json();
}
