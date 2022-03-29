import React, {useState, useEffect, createContext} from 'react';
import {auth} from './fbConfig';

export const FirebaseContext = createContext(); 

export const FirebaseProvider = ({children}) => {
   const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null});

    useEffect(() =>{
        // const auth = getAuth(app);
        auth.onAuthStateChanged(
            authUser => {
                authUser
                ? setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email})
                //   : auth.signInAnonymously(auth)
                //   .then(() => {app.auth.onAuthStateChanged(anonUser => 
                // setAuthUser({loggedIn:false, uid:anonUser.uid, email:null}))});
                : setAuthUser({loggedIn:false, uid:null, email:null});
          },
       );
    }, []);
   return (
      <FirebaseContext.Provider value={{ authUser }}>{children}</FirebaseContext.Provider>
    );
 };