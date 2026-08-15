// src/lib/push.ts
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:itsasecretyoudintknow@gmail.com", 
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default webpush;