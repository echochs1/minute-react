import React from "react";
import { Button } from "antd";
import { AudioOutlined } from '@ant-design/icons';
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

                <span className="large-bold-text text-blue">Build public speaking confidence in one minute.</span>
                <p>This is the landing page!</p>
                <Button type="primary" size="large" icon={<AudioOutlined />} className="landing-button">Start Recording</Button>
            </div>
        </div>
    )
}

export default LandingPage;