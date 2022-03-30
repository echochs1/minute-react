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
        history("/about");
    }

    const handleLoginClick = () => {
        history("/login");
    }

    return (
        <div className="landing-navbar">
            <div className="logo" >
                <img src={Logo} alt="logo"/>
                <h1>Minute</h1>
            </div>
            <div className="nav-links">
                <Button type="text" onClick={handleAboutClick}>About</Button>
                <Button type="text" onClick={handleLoginClick}>Login</Button>
            </div>
        </div>
    )
}

export default LandingNavbar;