console.log("Service Worker Loaded....");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("push recieved....");
  self.registration.showNotification(data.title, {
    body: "wowo it worked"
  });
});
