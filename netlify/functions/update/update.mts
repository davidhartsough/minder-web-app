import { newResp, errResp, isString } from "../../db/utils";
import { updateUser } from "../../db/xdb";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return errResp("Method not allowed", 405);
  }
  const { uid, items } = await req.json();
  console.log("uid:", uid);
  console.log("items:", items);
  if (
    !uid ||
    !items ||
    !isString(uid) ||
    !Array.isArray(items) ||
    items.some((i: any) => !isString(i))
  ) {
    return errResp("Bad request", 400);
  }
  await updateUser(uid, items);
  return newResp({ ok: true });
};
