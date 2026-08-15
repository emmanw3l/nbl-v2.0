// client/src/utils/deviceId.ts
const DEFAULT_FOLLOWED_AUTHOR_ID = 20; 

export function getDeviceId(): string {
  let id = localStorage.getItem("nbl-device-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("nbl-device-id", id);
    autoFollowDefaultAuthor(id);
  }
  return id;
}

async function autoFollowDefaultAuthor(deviceId: string) {
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
  try {
    await fetch(`${API}/authors/${DEFAULT_FOLLOWED_AUTHOR_ID}/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    });
  } catch {
    
  }
}