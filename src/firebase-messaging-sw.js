// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  apiKey: "AIzaSyAKf_7vnJNeeGfnrS99RvZ-WaE4ge68JFM",
  authDomain: "smart-home-7c688.firebaseapp.com",
  databaseURL: "https://smart-home-7c688-default-rtdb.firebaseio.com",
  projectId: "smart-home-7c688",
  storageBucket: "smart-home-7c688.appspot.com",
  messagingSenderId: "286107129751",
  appId: "1:286107129751:web:0849376c5b6457428416d2",
  measurementId: "G-9CHLQNDEN7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
