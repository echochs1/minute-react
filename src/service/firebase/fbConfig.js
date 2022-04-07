// SOURCE: https://travis.media/how-to-use-firebase-with-react/
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, set, ref as dbRef } from "firebase/database";
import { getStorage, ref as storRef, uploadBytes, downloadBytes } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, linkWithCredential } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJ_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);

// AUTH FUNCTIONS
export const fbSignIn = async () => {
    if(!auth.currentUser) {
        // const isAnon = auth.currentUser.isAnonymous ? true : false;
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Logged in with Google: "+user);
            // Check if the user was signed in anonymously, if so link the account
            // if(isAnon) {
            //     linkWithCredential(auth.currentUser, credential)
            //     .then((usercred) => {
            //         const user = usercred.user;
            //         console.log("Anonymous account successfully upgraded", user);
            //     }).catch((error) => {
            //         console.log("Error upgrading anonymous account", error);
            //     });
            // }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error with Google log-in: "+errorMessage);
        });
    }
};

export const fbSignOut = () => {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        console.log("logged out");
    }).catch((error) => {
        console.log("Error logging out: "+error);
    });
}

// REALTIME DATABASE FUNCTIONS
// Get and Post transcripts and results
export const fbGetData = (path) => {
    onValue(dbRef(db, 'users/'+ auth.currentUser.uid +'/'+ path), (snapshot) => {
        console.log("Data successfully retrieved: " + snapshot.val());
    })
}

export const fbSetData = (data, path) => {
    set(dbRef(db, 'users/'+ auth.currentUser.uid +'/'+ path), data)
    .then(() => {
        console.log("Data successfully saved!");
    })
}

// STORAGE FUNCTIONS
// Upload audio files
export const fbUploadAudioFile = (file) => {
    const storageRef = storRef(storage, 'recordings/' + auth.currentUser.email +'/'+ file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded an audio file to ' + snapshot.ref.fullPath);
    });
}

// export const fbGetAudioFile = (fileName) => {
//     const storageRef = storRef(storage, 'audio/' + auth.currentUser.uid + '/' + fileName);
//     return downloadBytes(storageRef);
// }