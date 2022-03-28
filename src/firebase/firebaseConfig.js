// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJ_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// FIREBASE SOURCES to create a Firebase Context:
// https://dev.to/dchowitz/react-firebase-a-simple-context-based-authentication-provider-1ool
// https://javascript.plainenglish.io/introduction-to-react-context-api-with-firebase-authentication-92a6a3cf116d
// https://medium.com/swlh/using-firebase-with-react-context-afed094f7927

export default app;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);

// class Firebase {
//   constructor() {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }
//     this.auth = firebase.auth();
//     this.db = firebase.database();
//     this.analytics = firebase.analytics();
//   }

//   // *** Anonymous Auth ***
//   doCreateAnonymousUser = () => {
//     this.auth.signInAnonymously();
//   }
//   // *** Auth API ***
//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doPasswordUpdate = password =>
//     this.auth.currentUser.updatePassword(password);

//   // *** Merge Auth and DB User API ***
//   onAuthUserListener = (next, fallback) =>
//     this.auth.onAuthStateChanged(authUser => {
//       if (authUser) {
//         this.user(authUser.uid)
//           .once('value')
//           .then(snapshot => {
//             const dbUser = snapshot.val();

//             // default empty roles
//             if (!dbUser.roles) {
//               dbUser.roles = {};
//             }

//             // merge auth and db user
//             authUser = {
//               uid: authUser.uid,
//               email: authUser.email,
//               emailVerified: authUser.emailVerified,
//               providerData: authUser.providerData,
//               ...dbUser,
//             };

//             next(authUser);
//           });
//       } else {
//         fallback();
//       }
//     });

//   // *** User API ***
//   user = uid => this.db.ref(`users/${uid}`);

//   users = () => this.db.ref('users');

//   // *** Message API ***
//   message = uid => this.db.ref(`messages/${uid}`);

//   messages = () => this.db.ref('messages');

//   // *** Post API ***
//   post = uid => this.db.ref(`posts/${uid}`);
// }