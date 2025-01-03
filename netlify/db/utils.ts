// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function newResp(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
export function errResp(message: string, status = 400) {
  return newResp({ error: message }, status);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
  return typeof value === "string" && value.length > 0;
}

export function shuffle(items: string[]): string[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
