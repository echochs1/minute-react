import React from "react";
import { useNavigate } from "react-router-dom";
import Fire from "../../../assets/images/fire.svg";
import Topic from "../../../assets/images/topic.svg";

const Record = () => {
    const history = useNavigate();

    const handleOneMinClick = () => {
        history("/one-min");
    }

    const handleTopicClick = () => {
        history("/topic-select");
    }

    return (
        <div className="recordOptionsPage">
            <button className="recordOptionsPage-button recordOptionsPage-button-1" onClick={handleOneMinClick}>
                    <div className="button-icon-img">
                        <img src={Fire} alt="fire" />
                    </div>
                    <div className="button-text">
                        <span className="button-large-text">1 min word challenge</span>
                        <span className="button-small-text">Test your skills on a random topic for a whole minute. Make an elevator pitch, come up with a story, say what's on your mind! We'll do our best pick it apart for you!</span>
                    </div>
            </button>
            <button className="recordOptionsPage-button recordOptionsPage-button-2" onClick={handleTopicClick}>
                <div className="button-icon-img">
                    <img src={Topic} alt="fire" />
                </div>
                <div className="button-text">
                    <span className="button-large-text">Topic selector</span>
                    <span className="button-small-text">Forget about a timer ticking down on you. Select a topic of your own choosing and just go for it! And hey, don’t worry about messing up!</span>
                </div>
            </button>
        </div>
    );
}

export default Record;