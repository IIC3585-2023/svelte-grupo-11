import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAsB0DMwabAeZFJ-xrYMhBxX9N0kkE2rTk",
  authDomain: "svelte-40c7a.firebaseapp.com",
  projectId: "svelte-40c7a",
  storageBucket: "svelte-40c7a.appspot.com",
  messagingSenderId: "264995596761",
  appId: "1:264995596761:web:5e9777f5f5ede75ad191c8"
};

if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("./src/firebase-messaging-sw.js").then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
      const app = initializeApp(firebaseConfig);

      const getTokenForPushNotifications = async () => {
        console.log("get token")
        const messaging = getMessaging();
        const token = await getToken(messaging, {
            serviceWorkerRegistration: registration,
            vapidKey: 'BKJK0j7GfFOjFkfcI8CSmuu5YEc2OfpWFgIaLKHpMTmrfDXC8xlIaCu55-PWCYY_3niWhmFo8l2Pa0ZRSXHWhbk'
        });
        console.log(token)
        onMessage(messaging, (payload) => {
          console.log("mensaje recibido", payload)
        })
        return token;
      };

      getTokenForPushNotifications();
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} 
else {
  console.error("Service workers are not supported.");
}