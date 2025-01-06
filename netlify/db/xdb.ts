import { shuffle } from "./utils";
import { calcNewPushTime } from "./dt";
import { getXataClient } from "./xata";

const xata = getXataClient();
const db = xata.db.users;

export async function getUserRecord(uid: string) {
  const user = await db.read(uid, ["items", "tz"]);
  if (!user) return null;
  return {
    items: user.items,
    tz: user.tz,
  };
}
export async function createUser(uid: string, items: string[], tz: string) {
  await db.create(uid, { items, tz });
}

export async function updateUser(uid: string, items: string[]) {
  await db.update(uid, {
    items,
    index: 0,
    sequence: shuffle(items),
  });
}
type SubscriptionData = {
  subEndpoint: string;
  subP256dh: string;
  subAuth: string;
};
export async function subUser(
  uid: string,
  { subEndpoint, subP256dh, subAuth }: SubscriptionData
) {
  const user = await getUserRecord(uid);
  if (!user) throw new Error("User not found");
  const { items, tz } = user;
  if (!items) throw new Error("User has no items");
  await db.update(uid, {
    subEndpoint,
    subP256dh,
    subAuth,
    index: 0,
    sequence: shuffle(items),
    pushTime: calcNewPushTime(tz),
  });
}

interface UserRecord {
  id: string;
  index: number;
  items: string[];
  sequence: string[];
  subEndpoint: string;
  subAuth: string;
  subP256dh: string;
  tz: string;
}

export async function getUsersToNotify() {
  const users = await db.filter({ pushTime: { $le: new Date() } }).getMany();
  return users
    .filter(
      (u) => u.subEndpoint && u.subAuth && u.subP256dh && u.items && u.sequence
    )
    .map(
      ({
        id,
        index,
        items,
        sequence,
        subEndpoint,
        subAuth,
        subP256dh,
        tz,
      }) => ({
        id,
        index,
        items,
        sequence,
        subEndpoint,
        subAuth,
        subP256dh,
        tz,
      })
    ) as UserRecord[];
}

type UserUpdates = {
  index: number;
  pushTime: Date;
  sequence?: string[];
};
export async function setNext(
  uid: string,
  index: number,
  items: string[],
  tz: string
) {
  const nextIndex = (index + 1) % items.length;
  const updates: UserUpdates = {
    index: nextIndex,
    pushTime: calcNewPushTime(tz),
  };
  if (nextIndex === 0) {
    updates.sequence = shuffle(items);
  }
  await db.update(uid, updates);
}
