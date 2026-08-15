import prisma from "../config/db";
import webpush from "./push"; // adjust this path if your webpush setup file is named/located differently

export async function notifyFollowers(
  authorId: number,
  payload: { title: string; body: string; url: string },
) {
  const follows = await prisma.follow.findMany({ where: { authorId } });
  if (follows.length === 0) return;

  const subs = await prisma.pushSubscription.findMany({
    where: { deviceId: { in: follows.map((f) => f.deviceId) } },
  });

  await Promise.allSettled(
    subs.map((sub) =>
      webpush
        .sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify(payload),
        )
        .catch(async (err) => {
          if (err.statusCode === 410) {
            await prisma.pushSubscription.delete({ where: { deviceId: sub.deviceId } });
          }
        }),
    ),
  );
}