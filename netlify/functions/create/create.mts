import { Context } from "@netlify/functions";
import { newResp, errResp, isString } from "../../db/utils";
import { createUser } from "../../db/xdb";

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return errResp("Method not allowed", 405);
  }
  const { uid, items, tz } = await request.json();
  console.log("uid:", uid);
  console.log("items:", items);
  console.log("tz:", tz);
  if (
    !uid ||
    !items ||
    !tz ||
    !isString(uid) ||
    !Array.isArray(items) ||
    !isString(tz) ||
    items.some((i: any) => !isString(i))
  ) {
    return errResp("Bad request", 400);
  }
  await createUser(uid, items, tz);
  return newResp({ ok: true });
};
