import { fromZonedTime, toZonedTime } from "date-fns-tz";

// window 1 = 9-14, window 2 = 14-20
// inclusive start and end times
function getRandomTimeInWindow1(): number {
  return 9 + Math.floor(Math.random() * 6);
}
function getRandomTimeInWindow2(start = 14): number {
  return start + Math.floor(Math.random() * (21 - start));
}

/**
 * 2 time frame windows: 9am-2pm and 2pm-8pm
 * Minimum 2 hours time gap between notifications.
 * Assume previous notification was just sent now.
 * If now is in window 1, set schedule for window 2.
 * If now is in window 2, set schedule for window 1 the next day.
 * Picks a random time within the window.
 *
 * @param tz {string} - IANA timezone, ex: "America/Chicago"
 */
export function calcNewPushTime(tz: string): Date {
  const localNow = toZonedTime(new Date(), tz);
  const currHour = localNow.getHours();
  const nextPushTime = new Date(localNow);
  if (currHour < 9) {
    // if before window 1, set to window 1 (9am-2pm) today
    nextPushTime.setHours(getRandomTimeInWindow1(), 0, 0, 0);
  } else if (currHour <= 14) {
    // If in window 1 (9am-2pm), schedule for window 2 (2pm-8pm) today
    // ensure at least 2 hours gap from now
    const minStart = currHour <= 12 ? 14 : currHour + 2;
    nextPushTime.setHours(getRandomTimeInWindow2(minStart), 0, 0, 0);
  } else {
    // if after window 1, set to window 1 the next day
    nextPushTime.setDate(localNow.getDate() + 1);
    nextPushTime.setHours(getRandomTimeInWindow1(), 0, 0, 0);
  }
  return fromZonedTime(nextPushTime, tz);
}
