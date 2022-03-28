import React, {useState, useEffect} from 'react';

export default firebaseAuth = (firebase) => {
    const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null});

    useEffect(() =>{
       const getCurrentUser = firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email})
              : setAuthUser({loggedIn:false, uid:null, email:null});
          },
       );

       return () => {
            getCurrentUser();
       }
    }, []);

    return authUser
}