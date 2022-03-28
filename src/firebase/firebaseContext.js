import React, {useState, useEffect, createContext} from 'react';
import app from './firebaseConfig';

export const FirebaseContext = createContext(); 

export const FirebaseProvider = ({children}) => {
   const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null});

    useEffect(() =>{
       app.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email})
              : app.auth.signInAnonymously()
              .then(app.auth.onAuthStateChanged(anonUser => 
               setAuthUser({loggedIn:false, uid:anonUser.uid, email:null})));
          },
       );
    }, []);
   return (
      <FirebaseContext.Provider value={{ authUser }}>{children}</FirebaseContext.Provider>
    );
 };