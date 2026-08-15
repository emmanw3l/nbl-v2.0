export function getDeviceId(): string {
  let id = localStorage.getItem("nbl-device-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("nbl-device-id", id);
  }
  return id;
}