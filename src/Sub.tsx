import { useEffect, useState } from "react";
import { post } from "./api-utils";
import { getAppServerKey } from "./utils";

export default function Sub({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        reg.pushManager.getSubscription().then((sub) => {
          setIsSubscribed(sub !== null);
          setLoading(false);
        });
      });
    }
  }, []);
  const subscribe = async () => {
    setLoading(true);
    if (!registration) return;
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: getAppServerKey(),
      });
      // Send subscription to the server
      const uid = localStorage.getItem("uid");
      await post("subscribe", { uid, subscription: subscription.toJSON() });
      setIsSubscribed(true);
    } catch (error) {
      setLoading(false);
      console.error("Failed to subscribe the user:", error);
    }
  };
  if (loading) return <div className="spinner" />;
  if (!isSubscribed) {
    return <button onClick={subscribe}>Get Notifications</button>;
  }
  return children;
}
