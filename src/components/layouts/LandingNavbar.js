import React, {useState, useContext} from "react";
import { Button, Typography, Avatar } from "antd";
import Logo from './logo-blue-teal.svg';
import { useNavigate } from "react-router-dom";
import { fbSignIn, fbSignOut } from '../../service/firebase/fbConfig';
import { FirebaseContext } from "../../service/firebase/fbContext";

const LandingNavbar = () => {
    const history = useNavigate();
    
    const handleLogoClick = () => {
        history("/");
    }
    
    const handleAboutClick = () => {
        history("about");
    }

    const handleHowItWorksClick = () => {
        history("how-it-works");
    }
    
    const handleLoginClick = () => {
        fbSignIn();
        history("app/setting");
    }
    
    // FIREBASE AUTH FUNCTIONS
    const authUser = useContext(FirebaseContext);
    // const [googleAvatarImg, setGoogleAvatarImg] = useState(null);

    console.log(authUser);

    // trying to display the logged in user's avatar if they are already signed in: correct imgUrl but not displaying
    // fix later
    return (
        <div className="landing-navbar">
            <div className="logo" >
                <img src={Logo} alt="logo" onClick={handleLogoClick}/>
                <h1 onClick={handleLogoClick}>Minute</h1>
            </div>
            <div className="nav-links">
                <Button type="text" onClick={handleAboutClick}><span className="button-text-text text-white">About Us</span></Button>
                <Button type="text" onClick={handleHowItWorksClick}><span className="button-text-text text-white">How It Works</span></Button>
                {authUser.loggedIn ?
                // (googleAvatarImg ? <Avatar src={googleAvatarImg} /> : <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>)
                <Typography>{authUser.email}</Typography>
                : (<Button type="text" onClick={handleLoginClick}><span className="button-text-text text-white">Login</span></Button>)
                }
            </div>
        </div>
    )
}

export default LandingNavbar;