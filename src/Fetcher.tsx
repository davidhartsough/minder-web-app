import { useEffect, useState } from "react";
import { dbGetItems } from "./db";
import Begin from "./Begin";

export default function Fetcher({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<string[] | null>(null);
  useEffect(() => {
    if (loading) {
      dbGetItems().then((_items: string[] | null) => {
        setItems(_items);
        setLoading(false);
      });
    }
  }, [loading]);
  if (loading) return <div className="spinner" />;
  if (!items) return <Begin save={setItems} />;
  return children;
}
