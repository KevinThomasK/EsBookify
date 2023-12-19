if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}  


const firebaseConfig = {
  apiKey: "AIzaSyBxgoJ5FuFAzS0H1yZPn1f8O-kxe_j0hfU",
  authDomain: "esbookify.firebaseapp.com",
  projectId: "esbookify",
  storageBucket: "esbookify.appspot.com",
  messagingSenderId: "883569973998",
  appId: "1:883569973998:web:5d60a9b695fd24d118b1ff",
  measurementId: "G-2BGZN4N3BW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
})      

// function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       const app = initializeApp(firebaseConfig);
//       const messaging = getMessaging(app)
//       getToken(messaging, { vapidKey: "BLo2zSSNmc5EKOaQV3mgHBCck-33cvrLat65JKtqOAHevf0vXcl3DHTHCJcPsZRfF60QDksJ6jaij8Qi0H5BrKg" })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("currentToken", currentToken);
//           } else {
//             console.log("cannot get Token");
//           }
//         })
//     } else {
//       console.log("Do not have Permission");
//     }
//   })
// }
// requestPermission();
