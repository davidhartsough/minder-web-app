const api = import.meta.env.API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(path: string, body: any) {
  console.log("body:", body);
  console.log(`${api}/${path}`);
  const resp = await fetch(`${api}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log("resp.status:", resp.status);
  const data = await resp.json();
  console.log("data:", data);
  return data;
}

export async function get(path: string) {
  console.log(`${api}/${path}`);
  const resp = await fetch(`${api}/${path}`);
  console.log("resp.status:", resp.status);
  const data = await resp.json();
  console.log("data:", data);
  return data;
}
