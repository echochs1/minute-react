// SOURCE: https://javascript.plainenglish.io/introduction-to-react-context-api-with-firebase-authentication-92a6a3cf116d
import React, {useState, useEffect, createContext} from 'react';
import {auth} from './fbConfig';
import {signInAnonymously} from 'firebase/auth';

export const FirebaseContext = createContext(); 

export const FirebaseProvider = ({children}) => {
   const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null, isAnonymous:null, photoUrl:null, displayName:null});

    useEffect(() =>{
        auth.onAuthStateChanged(
            authUser => {
                authUser
                ?
                // (authUser.isAnonymous ? 
                //     setAuthUser({loggedIn:false, uid: authUser.uid, email:null, isAnonymous:true})
                //     : setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email, isAnonymous:false})
                // )
                setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email, isAnonymous:false, photoUrl:authUser.photoURL, displayName:authUser.displayName})
                // TODO: handle anonymous user
                // Right now, signInAnonymously automatically signs the user in anonymously whenever they are logged out..
                // This is a problem bc it will create a new anonymous user everytime they log out and
                // we can only link one anonymous acc to an existing account.
                // Add the anonymous sign in somewhere else, maybe they can record without signing in as a guest user

                // : signInAnonymously(auth)
                //   .then(() => {
                //     auth.onAuthStateChanged(anonUser => 
                //     setAuthUser({loggedIn:false, uid:anonUser.uid, email:null, isAnonymous:true}))
                // })
                // .catch((error) => {
                //     const errorCode = error.code;
                //     const errorMessage = error.message;
                //     console.log("Error: "+errorMessage);
                // });

                // For now, just set loggedIn to false as null user until we figure out how to handle anonymous user
                : setAuthUser({loggedIn:false, uid:null, email:null, isAnonymous:false, photoUrl:null, displayName:null});
          },
       );
    }, []);
   return (
      <FirebaseContext.Provider value={{ authUser }}>{children}</FirebaseContext.Provider>
    );
 };