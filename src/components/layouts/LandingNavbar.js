import React, {useState, useContext} from "react";
import { Button, Typography, Avatar } from "antd";
import Logo from './logo-blue-teal.svg';
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, provider } from '../../service/firebase/fbConfig';
import { FirebaseContext } from "../../service/firebase/fbContext";

const LandingNavbar = () => {
    const history = useNavigate();
    
    const handleLogoClick = () => {
        history("/");
    }
    
    const handleAboutClick = () => {
        history("about");
    }
    
    const handleLoginClick = () => {
        fbSignIn();
        history("app/setting");
    }
    
    // FIREBASE AUTH FUNCTIONS
    const authUser = useContext(FirebaseContext);
    const [googleAvatarImg, setGoogleAvatarImg] = useState(null);

    console.log(authUser);
    const fbSignIn = async () => {
        provider.setCustomParameters({ prompt: 'select_account' });
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setGoogleAvatarImg(user.photoURL);
                console.log("Logged in with Google: "+user);
                history('/app/setting');
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
    };

    // trying to display the logged in user's avatar if they are already signed in: correct imgUrl but not displaying
    // fix later
    return (
        <div className="landing-navbar">
            <div className="logo" >
                <img src={Logo} alt="logo" onClick={handleLogoClick}/>
                <h1 onClick={handleLogoClick}>Minute</h1>
            </div>
            <div className="nav-links">
                <Button type="text" onClick={handleAboutClick}><span className="button-text-text text-white">About</span></Button>
                {authUser.loggedIn ?
                (googleAvatarImg ? <Avatar src={googleAvatarImg} /> : <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>)
                : (<Button type="text" onClick={handleLoginClick}><span className="button-text-text text-white">Login</span></Button>)
                }
            </div>
        </div>
    )
}

export default LandingNavbar;