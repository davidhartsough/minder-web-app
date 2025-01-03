import { Context } from "@netlify/functions";
import { errResp, isString, newResp } from "../../db/utils";
import { subUser } from "../../db/xdb";

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return errResp("Method not allowed", 405);
  }
  const { uid, subscription } = await request.json();
  if (
    !uid ||
    !subscription ||
    !isString(uid) ||
    !isString(subscription.endpoint) ||
    !isString(subscription.keys.p256dh) ||
    !isString(subscription.keys.auth)
  ) {
    return errResp("uid and subscription required");
  }
  await subUser(uid, {
    subEndpoint: subscription.endpoint,
    subP256dh: subscription.keys.p256dh,
    subAuth: subscription.keys.auth,
  });
  return newResp({ ok: true });
};
