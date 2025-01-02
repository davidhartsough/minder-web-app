import { get, post } from "./api-utils";

export function lsGetItems(): string[] | null {
  const items = localStorage.getItem("items");
  if (items) return JSON.parse(items);
  return null;
}
function lsSetItems(items: string[]): void {
  localStorage.setItem("items", JSON.stringify(items));
}

export async function dbGetItems(): Promise<string[] | null> {
  const uid = localStorage.getItem("uid");
  if (!uid) return null;
  const lsItems = lsGetItems();
  if (lsItems) return lsItems;
  const items = (await get(`read?uid=${uid}`)) as string[] | null;
  if (items) lsSetItems(items);
  return items;
}
export async function dbSetItems(items: string[]) {
  const uid = localStorage.getItem("uid");
  if (!uid) return;
  lsSetItems(items);
  await post("update", { uid, items });
}

export async function dbCreateUser(items: string[]) {
  const uid = localStorage.getItem("uid");
  if (!uid) return;
  lsSetItems(items);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  localStorage.setItem("tz", tz);
  await post("create", { uid, items, tz });
}
