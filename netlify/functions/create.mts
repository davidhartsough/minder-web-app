import { newResp, errResp, isString } from "../db/utils";
import { createUser } from "../db/xdb";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return errResp("Method not allowed", 405);
  }
  const { uid, items, tz } = await req.json();
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
