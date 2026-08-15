// src/controllers/push.ts  (subscribeToPushEndpoint from earlier, for reference)
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Ensure a Prisma client is available even if a shared instance file is missing
const prisma = new PrismaClient();

export async function subscribeToPushEndpoint(req: Request, res: Response) {
  const { deviceId, subscription } = req.body;
  await prisma.pushSubscription.upsert({
    where: { deviceId },
    update: {
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
    create: {
      deviceId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  });
  res.status(200).json({ ok: true });
}