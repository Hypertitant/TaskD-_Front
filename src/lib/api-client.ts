import "server-only";

export async function apiPost(path: string, body: unknown): Promise<Response> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not defined");

  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}
