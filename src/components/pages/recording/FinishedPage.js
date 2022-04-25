import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fbGetRecording, fbGetUrl } from "../../../service/firebase/fbConfig";
import {Space, Spin} from 'antd';
import { parseDisfluencies, redHighlight } from "../../../service/recording/fillerWordDetect";

const Finished = () => {
    const location = useLocation();
    const history = useNavigate();
    const [recordingData, setRecordingData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // setRecordingData({name: location.state.name, prompt: location.state.prompt, transcript: location.state.transcript, url:fbGetUrl(location.state.name)});
        setRecordingData(fbGetRecording(location.state.name));
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);   // sleep for 5 seconds before fetching the recoding to ensure url has been uploaded
    }, []);

    // Display highlighted filler words in the transcription
    // const renderTranscription = () => {
    //     if (recordingData) {
    //         const transcription = recordingData.transcript;
    //     }
    // }

    const handleHomeClick = () => {
        history("/app");
    }

    const handleRecordClick = () => {
        history("/one-min");
    }

    const renderResults = () => {
        console.log(isLoading);
        if(!isLoading && recordingData) {
            return (
                <div className="finishedResults">
                    <div className="finishedResults-title">
                        <h1>Results</h1>
                    </div>
                    <div className="finishedResults-textWrapper">
                        <span className="finishedResults-textContent"><b>Topic:</b> {recordingData.prompt}</span>
                    </div>
                    <div className="finishedResults-textWrapper">
                        <span className="finishedResults-textContent"><b>Text:</b> {redHighlight(recordingData.transcript)}</span>
                    </div>
                    
                    {recordingData.url && 
                        <audio controls>
                            <source src={recordingData.url} type="audio/mpeg" />
                        </audio>
                    }
                    <br></br>
                    <button onClick={handleRecordClick}>Generate another prompt</button>
                    <br></br>
                    <button onClick={handleHomeClick}>Return to app</button>

                    {/* <div>
                        <h3>{typeof(recordingData.transcript)}</h3>
                        <h3>{parseDisfluencies(recordingData.transcript).stringSplit}</h3>
                        <h3>{redHighlight(recordingData.transcript)}</h3>
                    </div> */}
                </div>
            )
        } else {
            return (
                <div className="loadingResults">
                    <h1 className="question-prompt">Congrats! You did it!</h1>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
            )
        }
    }
    
    return (
        <div className="finishedPage">
            {renderResults()}
        </div>
    );
}

export default Finished;