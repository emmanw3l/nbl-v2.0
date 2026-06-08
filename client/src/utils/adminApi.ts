// src/utils/adminApi.ts

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export async function adminFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json();

  if (res.status === 401) {
    // Token expired or invalid — send back to login
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Request failed");

  return data as T;
}