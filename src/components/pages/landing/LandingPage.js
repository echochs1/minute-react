import React from "react";
import { Button } from "antd";
import { AudioFilled } from '@ant-design/icons';
import LandingNavbar from "../../layouts/LandingNavbar";
import backgroundVideo from "./landing-background-comp.mp4";

const LandingPage = () => {
    return (
        <div className="landing">
            <video loop autoPlay muted id="video">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="landing-overlay"></div>
            <div className="landing-header">
                <LandingNavbar />
            </div>
            <div className="landing-hero">
                <span className="med-bold-text text-white text-shadow-dark landing-line-1">Build public speaking confidence in </span>
                <span className="large-bold-text text-teal text-shadow-dark landing-line-2">one minute.</span>
                <Button type="primary" size="large" icon={<AudioFilled />} className="landing-button"><span className="button-primary-text">Start Recording</span></Button>
            </div>
        </div>
    )
}

export default LandingPage;