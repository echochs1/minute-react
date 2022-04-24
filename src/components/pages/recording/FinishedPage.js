import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fbGetRecording, fbGetUrl } from "../../../service/firebase/fbConfig";
import {Space, Spin} from 'antd';

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
                <div className="finishResults">
                    <div>
                        <h3 className="fieldName">Prompt: </h3>
                        <p className="fieldValue">{recordingData.prompt}</p>
                    </div>
                    {recordingData.url && 
                        <audio controls>
                            <source src={recordingData.url} type="audio/mpeg" />
                        </audio>
                    }
                    <div>
                        <h3 className="fieldName">Audio Transcription: </h3>
                        <p className="fieldValue">{recordingData.transcript}</p>
                    </div>
                    
                    <button onClick={handleRecordClick}>Generate another prompt</button>
                    <br></br>
                    <button onClick={handleHomeClick}>Return to app</button>
                </div>
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
        <div className="finishedPage">
            <h1>Congrats! You did it!</h1>
            {renderResults()}
        </div>
    );
}

export default Finished;