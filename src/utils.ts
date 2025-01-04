function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export function getASK() {
  const vpk =
    "BN9pUJMkbDVxcF2k79fhXWhqdj_p0iH8FA100FoxffFUYj1AT65odEXD3hNyPQeGIl0ZRgKQusbWDKEiMZsIbsI";
  return urlBase64ToUint8Array(vpk);
}

export function shuffle(items: string[]): string[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
