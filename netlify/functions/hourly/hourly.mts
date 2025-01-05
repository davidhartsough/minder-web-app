import webpush from "web-push";
import type { Config } from "@netlify/functions";
import { getUsersToNotify, setNext } from "../../db/xdb";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export default async () => {
  console.log("HOURLY. Let's go!");
  const usersToNotify = await getUsersToNotify();
  console.log("usersToNotify.length:", usersToNotify.length);
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
    const sub = {
      endpoint: subEndpoint,
      keys: {
        auth: subAuth,
        p256dh: subP256dh,
      },
    };
    const reminder = sequence[index];
    console.log("TRY:", id.slice(0, 40), reminder);
    try {
      await webpush.sendNotification(sub, reminder);
      console.log("SENT:", id.slice(0, 40), reminder);
      await setNext(id, index, items, tz);
    } catch (e) {
      console.error(e);
    }
  }
};

export const config: Config = {
  schedule: "@hourly",
};
