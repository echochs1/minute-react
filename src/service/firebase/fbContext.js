// SOURCE: https://javascript.plainenglish.io/introduction-to-react-context-api-with-firebase-authentication-92a6a3cf116d
import React, {useState, useEffect, createContext} from 'react';
import {auth} from './fbConfig';
// import {signInAnonymously} from 'firebase/auth';

export const FirebaseContext = createContext(); 

export const FirebaseProvider = ({children}) => {
   const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null, isAnonymous:null, photoUrl:null, displayName:null});

    useEffect(() =>{
        auth.onAuthStateChanged(
            authUser => {
                authUser ?
                setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email, isAnonymous:false, photoUrl:authUser.photoURL, displayName:authUser.displayName})
                // For now, just set loggedIn to false as null user until we figure out how to handle anonymous user
                : setAuthUser({loggedIn:false, uid:null, email:null, isAnonymous:false, photoUrl:null, displayName:null});
          },
       );
    }, []);
   return (
      <FirebaseContext.Provider value={{ authUser }}>{children}</FirebaseContext.Provider>
    );
 };