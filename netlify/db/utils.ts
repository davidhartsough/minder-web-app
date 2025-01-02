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
