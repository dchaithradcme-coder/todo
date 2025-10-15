\window.onload = async () => {
  // Request notification permission
  if ('Notification' in window && Notification.permission !== 'granted') {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Notifications are blocked. Reminders may not work.');
      }
    } catch (err) {
      console.error('Notification permission error:', err);
    }
  }

  // Register service worker and subscribe for push
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw.js');
      console.log('✅ Service Worker registered');

      const readyReg = await navigator.serviceWorker.ready;
      const subscription = await readyReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BD032gsJ_zPYJpno8hxZKg-3JgBZZVuUtelXW9JaCEZLN4mBJ_-ge_KRzrTzcBFphfPjORMFdL3sPpaKZhlKvdY'
        )
      });

      await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('✅ Push subscription sent to backend');
    } catch (err) {
      console.error('❌ Push subscription error:', err);
    }

    // Listen for voice reminders from service worker
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data?.type === 'reminder') {
        const utterance = new SpeechSynthesisUtterance(event.data.text);
        speechSynthesis.speak(utterance);
      }
    });
  }

  // Load saved tasks from backend
  loadTasksFromBackend();
};

// Helper to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}