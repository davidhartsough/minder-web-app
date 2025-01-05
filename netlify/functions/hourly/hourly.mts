import webpush from "web-push";
import type { Config } from "@netlify/functions";
import { getUsersToNotify, setNext } from "../../db/xdb";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export default async () => {
  const usersToNotify = await getUsersToNotify();
  for (const {
    id,
    subEndpoint,
    subAuth,
    subP256dh,
    index,
    items,
    sequence,
    tz,
  } of usersToNotify) {
    try {
      const sub = {
        endpoint: subEndpoint,
        keys: {
          auth: subAuth,
          p256dh: subP256dh,
        },
      };
      const reminder = sequence[index];
      await webpush.sendNotification(sub, reminder);
      await setNext(id, index, items, tz);
    } catch (e) {
      console.error(e);
    }
  }
};

export const config: Config = {
  schedule: "@hourly",
};
