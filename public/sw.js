self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: '🔔 Task Reminder',
    body: 'You have a new reminder!',
    icon: 'https://via.placeholder.com/100'
  };

  // Show the notification
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon
  });

  // Send message to all open clients for voice reminder
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'reminder',
        text: data.body
      });
    });
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});