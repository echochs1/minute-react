import React from "react";
import { Button } from "antd";
import Fire from "../../../assets/images/fire.png";
import Topic from "../../../assets/images/topic.png";

const Record = () => {
    return (
        <div className="recordOptionsPage">
            <Button className="recordOptionsPage-button-1" type="primary">
                <div className="button-icon-img">
                    <img src={Fire} alt="fire" />
                </div>
                <div className="button-text">
                    <span className="button-large-text">1 min word challenge</span>
                    <span className="button-small-text">Test your skills on a random topic for a whole minute. Make an elevator pitch, come up with a story, say what's on your mind! We'll do our best pick it apart for you!</span>
                </div>
            </Button>
            {/* <Button className="recordOptionsPage-button-2" type="primary">
                <div className="button-icon-img">
                    <img src={Topic} alt="topic" />
                </div>
                <div className="button-text">
                    <span className="button-large-text">Topic selector</span>
                    <span className="button-small-text">Forget about a timer ticking down on you. Select a topic of your own choosing and just go for it! And hey, don’t worry about messing up!</span>
                </div>
            </Button> */}
        </div>
    );
}

export default Record;