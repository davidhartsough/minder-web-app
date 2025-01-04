import { Context } from "@netlify/functions";
import { newResp, errResp } from "../../db/utils";
import { getUserRecord } from "../../db/xdb";

export default async (request: Request, context: Context) => {
  const uid = new URL(request.url).searchParams.get("uid");
  if (!uid) return errResp("uid is required");
  console.log("uid:", uid);
  const data = await getUserRecord(uid);
  if (!data) return errResp("user not found");
  return newResp(data);
};
