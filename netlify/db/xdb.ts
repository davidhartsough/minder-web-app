import { getXataClient } from "./xata";

const xata = getXataClient();

export async function getUserRecord(uid: string) {
  const user = await xata.db.users.read(uid, ["items", "tz"]);
  return user;
}
export async function createUser(uid: string, items: string[], tz: string) {
  await xata.db.users.create(uid, { items, tz });
}

// async function setSequence(uid: string) {
//   // TODO: !
// }
export async function updateUser(uid: string, items: string[]) {
  await xata.db.users.update(uid, { items });
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
  await xata.db.users.update(uid, {
    subEndpoint,
    subP256dh,
    subAuth,
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
  const users = await xata.db.users
    .filter({ pushTime: { $le: new Date() } })
    .getMany();
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
