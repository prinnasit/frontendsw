export default async function getReports(token: string) {

  const response = await fetch(
    "https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports",
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Reports");
  }

  return await response.json();
}
