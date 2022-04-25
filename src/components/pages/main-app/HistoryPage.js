import React, {useState, useContext, useEffect} from "react";
import { moneyverse } from "../../../assets/images/moneyverse";
import { fbGetAllRecordings } from "../../../service/firebase/fbConfig";
import { FirebaseContext } from "../../../service/firebase/fbContext";
import { Space, Spin } from "antd";

/**
 * 
 * @param {*} arr array of items
 * @returns random index of the array arr
 */
 const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

// TODO: the ui for this page is so wack, the list of recordings is cut off and not scrollable rn
// so need to add some css
const History = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [recordings, setRecordings] = useState(null);
    const {authUser} = useContext(FirebaseContext);

    useEffect(() => {
        setRecordings(fbGetAllRecordings().reverse());
    }, []);

    const renderHistory = () => {
        if (recordings) {
            return (
                <ul className="recordingsList">
                    {recordings.map((recording, index) =>
                        <li key={index} className="recordingItem">
                            <div className="recordingContent">
                                <div className="recordingImage">
                                    <img src={moneyverse[randomIndex(moneyverse)]} alt="fun recording img" />
                                </div>
                                <div className="recordingInfo">
                                    {/* <h3 className="fieldName">{index+1}.</h3> */}
                                    <p className="fieldValue"><b>Topic: </b>{recording.prompt}</p>
                                    <p className="fieldName"><b>Transcription: </b>{recording.transcript}</p>
                                    <audio controls>
                                        <source src={recording.url} type="audio/mpeg" />
                                    </audio>
                                </div>
                            </div>
                            <hr className="recordingLine" size="2px" width="100%" color="#BBD2E7"></hr>
                        </li>
                    )}
                </ul>
            )
        } else {
            return (
                <div>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
            )
        }
    }


    return (
        <div className="historyPage">
            <h1>History</h1>
            {/* <h3>Logged in as: {authUser.email ? authUser.email : "none"}</h3> */}
            {renderHistory()}

        </div>
    );
}

export default History;