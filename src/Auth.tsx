import { useState, ReactNode } from "react";
import Login from "./Login";

export default function Auth({ children }: { children: ReactNode }) {
  const [uid, setUID] = useState(localStorage.getItem("uid"));
  if (!uid) return <Login setUID={setUID} />;
  return children;
}
