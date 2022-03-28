import React, { useContext } from "react";
import "../App.css";
import app from "./firebaseConfig";
import { FirebaseAuth } from "react-firebaseui";
import { FirebaseContext } from "./firebaseContext";
import { Navigate } from "react-router-dom";

export default function SignIn() {
    //get the user state from the context
    const { user } = useContext(FirebaseContext); 
  
    //this is our config for FirebaseAuth
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        app.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false,
      },
    };
  
  //if user exists or signed in, we redirect the page to home, else display the sign in methods with FirebaseAuth
    return (
      <div>
        {!!user ? (
          <Navigate to={{ pathname: "/" }} />
        ) : (
          <div>
            <p>Please Sign In</p>
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth} />
          </div>
        )}
      </div>
    );
  }