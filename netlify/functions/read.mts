import { newResp, errResp } from "../db/utils";
import { getUserRecord } from "../db/xdb";

export default async (req: Request) => {
  const uid = new URL(req.url).searchParams.get("uid");
  if (!uid) return errResp("uid is required");
  const data = await getUserRecord(uid);
  if (!data) return errResp("user not found");
  return newResp(data);
};
