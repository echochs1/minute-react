import React from "react";
import { Button } from "antd";
import Logo from './logo-blue-teal.svg';
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
    const history = useNavigate();

    const handleLogoClick = () => {
        history("/");
    }

    const handleAboutClick = () => {
        history("about");
    }

    const handleLoginClick = () => {
        history("app");
    }

    return (
        <div className="landing-navbar">
            <div className="logo" >
                <img src={Logo} alt="logo" onClick={handleLogoClick}/>
                <h1 onClick={handleLogoClick}>Minute</h1>
            </div>
            <div className="nav-links">
                <Button type="text" onClick={handleAboutClick}><span className="button-text-text text-white">About</span></Button>
                <Button type="text" onClick={handleLoginClick}><span className="button-text-text text-white">Login</span></Button>
            </div>
        </div>
    )
}

export default LandingNavbar;