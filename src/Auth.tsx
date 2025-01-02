import { useState } from "react";
import Login from "./Login";

export default function Auth({ children }: { children: React.ReactNode }) {
  const [uid, setUID] = useState(localStorage.getItem("uid"));
  if (!uid) return <Login setUID={setUID} />;
  return children;
}
