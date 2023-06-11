importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAsB0DMwabAeZFJ-xrYMhBxX9N0kkE2rTk",
  authDomain: "svelte-40c7a.firebaseapp.com",
  projectId: "svelte-40c7a",
  storageBucket: "svelte-40c7a.appspot.com",
  messagingSenderId: "264995596761",
  appId: "1:264995596761:web:5e9777f5f5ede75ad191c8"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();