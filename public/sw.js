self.addEventListener("push", function (event) {
  if (event.data) {
    // TODO event.data
    const { body } = event.data.json();
    const options = {
      body,
      icon: "/icon.png",
      badge: "/badge.png",
      vibrate: [50],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification("minder", options));
  }
});

const url = "https://re-minder.netlify.app";

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
