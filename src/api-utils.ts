const api = import.meta.env.API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(path: string, body: any) {
  const resp = await fetch(`${api}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
}

export async function get(path: string) {
  const resp = await fetch(`${api}/${path}`);
  const data = await resp.json();
  return data;
}
