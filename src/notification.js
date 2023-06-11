import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {sessionStore} from '../src/lib/stores/sessionStore';
import {notificationStore} from '../src/lib/stores/notificationStore';
import {API_URL} from './lib/global'
import { get } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyAsB0DMwabAeZFJ-xrYMhBxX9N0kkE2rTk",
  authDomain: "svelte-40c7a.firebaseapp.com",
  projectId: "svelte-40c7a",
  storageBucket: "svelte-40c7a.appspot.com",
  messagingSenderId: "264995596761",
  appId: "1:264995596761:web:5e9777f5f5ede75ad191c8"
};

const notificationToken = {
  retrieved: false,
  token: ''
}

const saveToken = async (jwt) => {
  if(!notificationToken.retrieved) return;
  console.log('saving token')
  const res = await fetch(API_URL + '/set_notification_token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify({
        notificationToken: notificationToken.token
      })
  });

  console.log(res);
}

sessionStore.subscribe((value) => {
  if(!value.loggedIn) return;
  saveToken(value.jwt);
})


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
        console.log('token', token)
        notificationToken.retrieved = true;
        notificationToken.token = token;

        onMessage(messaging, (payload) => {
          if (!get(sessionStore).loggedIn) {
            return;
          }
          const notificationRef = get(notificationStore); 
          notificationRef.showNotification = true;
          notificationStore.set(notificationRef);
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