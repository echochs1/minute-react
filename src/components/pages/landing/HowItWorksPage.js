import React from "react";
import LandingNavbar from "../../layouts/LandingNavbar";
import login from "../../../assets/images/how-it-works/login.svg";
import edit from "../../../assets/images/how-it-works/edit.svg";
import mic from "../../../assets/images/how-it-works/mic.svg";
import data from "../../../assets/images/how-it-works/data.svg";

const HowItWorksPage = () => {
    return (
        <div className="how-it-works">
            <div className="landing-header">
                <LandingNavbar />
            </div>
            <div className="how-it-works-content">
                <div className="section1">
                    <h1 className="about-header">How It Works</h1>
                    <p className="about-paragraph"><span className="redHighlight">You record.</span> <span className="goldHighlight">We analyze.</span> <span className="tealHighlight">You learn.</span></p>
                </div>
                <div className="section2">
                    <div className="process process1">
                        <div className="process-image">
                            <img src={login} alt="login icon" />
                        </div>
                        <div className="process-content">
                            <h2 className="process-header">Login</h2>
                            <p className="about-paragraph">With a quick sign in using a Google account, get access to all sorts of public resources! We use Google Firebase to store your recording sessions, goals, and progress!</p>
                        </div>
                    </div>
                    <div className="process process2">
                        <div className="process-image">
                            <img src={edit} alt="edit icon" />
                        </div>
                        <div className="process-content">
                            <h2 className="process-header">Input</h2>
                            <p className="about-paragraph">Once you log in, choose between the iconic one-minute word challenge or write and talk about an input of your own.</p>
                        </div>
                    </div>
                    <div className="process process3">
                        <div className="process-image">
                            <img src={mic} alt="mic icon" />
                        </div>
                        <div className="process-content">
                            <h2 className="process-header">Record</h2>
                            <p className="about-paragraph">One minute can feel like an eternity and yet go by faster than the blink of an eye. Before you record, we ask for microphone permissions for security. Once you finish, we send out your recording to AssemblyAI API to get the transcription.</p>
                        </div>
                    </div>
                    <div className="process process4">
                        <div className="process-image">
                            <img src={data} alt="data icon" />
                        </div>
                        <div className="process-content">
                            <h2 className="process-header">Analyze</h2>
                            <p className="about-paragraph">Get filler words, sentiment analysis, and tips right away! Our algorithm parses out those filler words and analyzes your speech to give you an informed explanation of where you did well and where you can improve.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorksPage;