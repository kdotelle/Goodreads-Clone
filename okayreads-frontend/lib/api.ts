import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit) {
  const session = await getSession();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session?.accessToken}`,
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`API request failed with status ${res.status}`);
  return res.json();
}

export async function getShelves() {
  return apiFetch("api/shelves");
}
