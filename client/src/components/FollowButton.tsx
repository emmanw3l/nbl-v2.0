import { useEffect, useState } from "react";
import { getDeviceId } from "../utils/deviceId";
import { subscribeToPush } from "../utils/push";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export default function FollowButton({ authorId }: { authorId: number }) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const deviceId = getDeviceId();
    fetch(`${API}/authors/${authorId}/following?deviceId=${deviceId}`)
      .then((r) => r.json())
      .then((d) => setFollowing(d.following))
      .finally(() => setChecked(true));
  }, [authorId]);

async function handleToggle() {
  setLoading(true);
  const deviceId = getDeviceId();
  try {
    if (following) {
      await fetch(`${API}/authors/${authorId}/follow`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
      setFollowing(false);
    } else {
      await Promise.race([
        subscribeToPush(deviceId),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Notification setup timed out")), 8000),
        ),
      ]);
      await fetch(`${API}/authors/${authorId}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
      setFollowing(true);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong enabling notifications — check your browser's notification permissions and try again.");
  } finally {
    setLoading(false);
  }
}

  if (!checked) return null;

  return (
<button
  className={`btn btn-sm rounded-3 ${following ? "btn-outline-secondary" : "btn-outline-dark"}`}
  onClick={handleToggle}
  disabled={loading}
>
  <i className={`bi ${following ? "bi-bell-fill" : "bi-bell"} me-1`} />
  {following ? "Following" : "Follow"}
</button>
  );
}