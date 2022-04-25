// SOURCE: https://travis.media/how-to-use-firebase-with-react/
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, set, update, ref as dbRef, get } from "firebase/database";
import { getStorage, ref as storRef, uploadBytes, downloadBytes, listAll, getDownloadURL } from "firebase/storage";
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

/** REALTIME DATABASE FUNCTIONS */
// UPLOAD FUNCTIONS //
// Upload name, url, prompt, and transcript after each recording
export const fbUploadRecording = (fileName, prompt, transcript) => {
    const audioFile = fileName.split('.')[0];
    // Pass in and add the prompt to uploadData in future
    const uploadData = {
        'audioFile': fileName,
        'prompt': prompt,
        'transcript': transcript
    }
    set(dbRef(db, `users/${auth.currentUser.uid}/recordings/${audioFile}`), uploadData)
    .then(() => {
        console.log("Uploaded prompt and transcript to database for "+fileName);
        fbUploadAudioFileDownloadURL(fileName);
    })
}

// Upload downloadURL for a given audio file
export const fbUploadUrl = (audioFile, url) => {
    const fileName = audioFile.split('.')[0];
    update(dbRef(db, `users/${auth.currentUser.uid}/recordings/${fileName}`), {'url': url})
    .then(() => {
        console.log("Uploaded url to database for "+audioFile);
    })
    .catch((error) => {
        console.log("Error uploading url to database: "+error);
    });
}

// Upload user created goals
export const fbUploadGoal = (goal) => {
    const goalsArr = fbGetAllGoals();
    console.log(goalsArr);
    goalsArr.push(goal);
    set(dbRef(db, `users/${auth.currentUser.uid}/goals`), goalsArr)
    .then(() => {
        console.log("Goal successfully uploaded to database");
    }
    ).catch((error) => {
        console.log("Error uploading goal to database: "+error);
    });
}

// GET FUNCTIONS //
// Get a transcript for an audio file
export const fbGetTranscript = (fileName) => {
    const audioFile = fileName.split('.')[0];
    onValue(dbRef(db, `users/${auth.currentUser.uid}/recordings/${audioFile}/transcript`), (snapshot) => {
        console.log("Transcript for "+ fileName +" successfully retrieved: " + snapshot.val());
        return snapshot.val();
    })
}

// Get the downloadURL for an audio file
export const fbGetUrl = (fileName) => {
    const audioFile = fileName.split('.')[0];
    onValue(dbRef(db, `users/${auth.currentUser.uid}/recordings/${audioFile}/url`), (snapshot) => {
        console.log("URL for "+ fileName +" successfully retrieved: " + snapshot.val());
        return snapshot.val();
    })
}

// Get the user's recordings
// Used in HistoryPage
export const fbGetAllRecordings = () => {
    const recordings = [];
    onValue(dbRef(db, `users/${auth.currentUser.uid}/recordings`), (snapshot) => {
        snapshot.forEach((recording) => {
            const recordingData = {};
            recordingData.audioFile = recording.val().audioFile;
            recordingData.url = recording.val().url;
            recordingData.prompt = recording.val().prompt;
            recordingData.transcript = recording.val().transcript;
            recordings.push(recordingData);
        });
    })
    return recordings;
}

// Retrieve data for a given recording: audioFile name, prompt, transcript, etc
// Used in FinishedPage
export const fbGetRecording = (filename) => {
    const audioFile = filename.split('.')[0];
    const recording = {};
    onValue(dbRef(db, `users/${auth.currentUser.uid}/recordings/${audioFile}`), (snapshot) => {
        const data = snapshot.val();
        recording.audioFile = data.audioFile;
        recording.url = data.url;
        recording.prompt = data.prompt;
        recording.transcript = data.transcript;
        console.log(recording);
    });      
    return recording;
}

// Get all user goals
export const fbGetAllGoals = () => {
    const goals = [];
    onValue(dbRef(db, `users/${auth.currentUser.uid}/goals`), (snapshot) => {
        snapshot.forEach((goal) => {
            const goalData = {};
            goalData.name = goal.val().name;
            goalData.description = goal.val().description;
            goalData.date = goal.val().date;
            goalData.freq = goal.val().freq;
            goals.push(goalData);
        });
    })
    return goals;
}

/** STORAGE FUNCTIONS */
// Upload and Retrieve audio files
export const fbUploadAudioFile = (file) => {
    const storageRef = storRef(storage, `users/${auth.currentUser.uid}/recordings/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded an audio file: ' + file.name);
    });
}

// Called when a recording is uploaded to the database
// Gets the downloadURL for the audio file, then calls fbUploadUrl to upload it to the database
export const fbUploadAudioFileDownloadURL = (fileName) => {
    const storageRef = storRef(storage, `users/${auth.currentUser.uid}/recordings/${fileName}`);
    getDownloadURL(storageRef)
    .then((url) => {
        console.log("Download URL for "+fileName+" successfully uploading: "+url);
        // Update the url in the database
        fbUploadUrl(fileName, url);
    }).catch((error) => {
        console.log("Error uploading download URL for "+fileName+": "+error);
    });
}