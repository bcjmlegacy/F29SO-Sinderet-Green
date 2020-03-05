console.log("Service Worker Loaded....");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("push recieved....");
  self.registration.showNotification(data.title, {
    body: "wowo it bababaababa",
    icon: "/uplink_Logo.png",
    badge: "/uplink_Logo.png"
  });
});
