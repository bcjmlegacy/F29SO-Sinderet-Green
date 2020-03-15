console.log("Service Worker Loaded....");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log(data);
  console.log("push recieved....");

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/uplink_Logo.png",
    badge: "/uplink_Logo.png"
  });
});
