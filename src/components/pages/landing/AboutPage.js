import React from "react";
import LandingNavbar from "../../layouts/LandingNavbar";
import section2Photo from "../../../assets/images/about_photos/about-me.jpg";
import andy from "../../../assets/images/about_photos/andy.png";
import ashley from "../../../assets/images/about_photos/ashley.png";
import elliot from "../../../assets/images/about_photos/elliot.png";
import myka from "../../../assets/images/about_photos/myka.png";
import becca from "../../../assets/images/about_photos/becca.png";
import jack from "../../../assets/images/about_photos/jack.png";

const AboutPage = () => {
    return (
        <div className="about">
            <div className="landing-header">
                <LandingNavbar />
            </div>
            <div className="about-content">
                <div className="section1">
                    <h1 className="about-header">Building Public Speaking Confidence</h1>
                    <p className="about-paragraph about-mission">Our mission is to <span className="redHighlight">expand</span> the world of feasible public speaking solutions. We provide young adults a platform where they can <span className="redHighlight">enhance</span> their skills to become more comfortable at effectively communicating. In one minute, we <span className="redHighlight">empower</span> the voices of leaders across all backgrounds.</p>
                </div>
                <div className="section2">
                    <div className="section2-content">
                        <h1 className="about-header">Our Team</h1>
                        <p className="about-paragraph">Hello there! We're <span>Boston University students</span> passionate about public speaking. Coming from vastly different backgrounds, we're united by a concerning problem that's growing in America — the decrease in <span className="redHighlight">public speaking confidence</span> and increase in filler words!</p>
                        <p className="about-paragraph">As fourth year computer science students, we know the struggle of preparing for class presentations and internship interviews. At BU and all throughout our primary and secondary education experience, we realized that there's no public speaking class. Furthermore, there's a significant lack of accessible and available public speaking solutions. Student organizations including mock trial aren't our thing, and apps today demand VR headsets and coaches that are <span className="redHighlight">simply not feasible</span> for the average college student.</p>
                    </div>
                    <div className="section2-image">
                        <div className="friends">
                            <img src={andy} alt="andy" />
                            <h3 className="friend-name">Andy Vo</h3>
                            <p className="friend-description">Team Lead, SWE, UXD</p>
                        </div>
                        <div className="friends">
                            <img src={ashley} alt="ashley" />
                            <h3 className="friend-name">Ashley Kim</h3>
                            <p className="friend-description">Software Engineer</p>
                        </div>
                        <div className="friends">
                            <img src={elliot} alt="elliot" />
                            <h3 className="friend-name">Elliot Cho</h3>
                            <p className="friend-description">Software Engineer</p>
                        </div>
                        <div className="friends">
                            <img src={myka} alt="myka" />
                            <h3 className="friend-name">Myka Kugaya</h3>
                            <p className="friend-description">Software Engineer</p>
                        </div>
                        <div className="friends">
                            <img src={becca} alt="becca" />
                            <h3 className="friend-name">Becca Chang</h3>
                            <p className="friend-description">Software Engineer</p>
                        </div>
                        <div className="friends">
                            <img src={jack} alt="jack" />
                            <h3 className="friend-name">Jack Guinta</h3>
                            <p className="friend-description">Software Engineer</p>
                        </div>
                    </div>
                </div>
                <div className="section3">
                    <div className="section3-content">
                        <h1 className="about-header">Our story</h1>
                        <p className="about-paragraph">The premise of our solution was inspired by the <span className="redHighlight">one-minute word challenge</span>, a game where you pick a random topic your friends yell at you, try to talk about it for as long as possible — ideally up to a minute — until you say your first filler word. You can see how this gets very competitive.</p>
                        <p className="about-paragraph">Through countless interviews, sprints, and cups of coffee, we've built a product that we hope marks the beginning of accessible and feasible public speaking solutions.</p>
                    </div>
                    <div className="section3-image">
                        <img src={section2Photo} alt=""></img>
                    </div>
                </div>
                <div className="section4">
                    <div className="section4-content">
                        <h1 className="about-header">Our Thanks</h1>
                        <p className="about-paragraph">We're grateful for the support of our friends and family, the Boston University community, and the Boston University students who have made this possible.</p>
                        <p className="about-paragraph">We'd like to give the biggest shoutout to BU SPARK!, Ziba Cranmer, James Grady, Richard Kasperowski, and all of our mentors.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;