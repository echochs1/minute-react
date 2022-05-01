import React, { useContext } from "react";
import { Button, Space } from 'antd';
import { FirebaseContext } from "../../../service/firebase/fbContext";
import { redHighlight } from "../../../service/recording/fillerWordDetect";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const HistoryResults = () => {
    const {authUser} = useContext(FirebaseContext);
    const { state } = useLocation();
    const recordingData = state.recordingData;
    const history = useNavigate();

    const handleReturnClick = () => {
        history("/app/history");
    }

    return (
        <div className="historyResults">
            {/* <div className="backbutton">
                <Button type="link" icon={<LeftOutlined />} onClick={() => handleReturnClick}>Back</Button>
            </div> */}
            <div className="finishedResults-title">
                <h1>Results</h1>
            </div>
            <div className="finishedResults-textWrapper">
                <span className="finishedResults-textContent"><b>Topic:</b> {recordingData.prompt}</span>
            </div>
            <hr className="recordingLine" size="2px" width="100%" color="#BBD2E7"></hr>
            <div className="finishedResults-textWrapper">
                <span className="finishedResults-textContent"><b>Text:</b> {redHighlight(recordingData.transcript)}</span>
            </div>
            <hr className="recordingLine" size="2px" width="100%" color="#BBD2E7"></hr>
            {recordingData.url && 
                <audio className="audio-historyresults" controls>
                    <source src={recordingData.url} type="audio/mpeg" />
                </audio>
            }
        </div>
    )
}

export default HistoryResults;