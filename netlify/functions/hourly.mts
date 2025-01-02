import { sendNotification, setVapidDetails } from "web-push";
import type { Config } from "@netlify/functions";
import { getUsersToNotify } from "../db/xdb";

setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export default async () => {
  const usersToNotify = await getUsersToNotify();
  for (const user of usersToNotify) {
    try {
      const sub = {
        endpoint: user.subEndpoint,
        keys: {
          auth: user.subAuth,
          p256dh: user.subP256dh,
        },
      };
      const reminder = user.sequence[user.index];
      await sendNotification(sub, reminder);
      // TODO: update user record!
    } catch (e) {
      console.error(e);
    }
  }
};

export const config: Config = {
  schedule: "@hourly",
};
