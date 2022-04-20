import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fbGetUrl } from "../../../service/firebase/fbConfig";

const Finished = () => {
    // TODO: Add some kind of buffering animation while we wait for analysis to complete
    // Get the transcription and assembly data from ButtonRecord.js
    const location = useLocation();
    const history = useNavigate();
    const [url, setUrl] = useState(null);
    const prompt = location.state.prompt;
    const transcription = location.state.transcription;

    // assemblyAI full results in location.state.assemblyData
    console.log(location.state.name);

    // alsdfkjasldfkaj it's currently not setting the audio file url bc of async issues so the audio player
    // here doesn't work. the one on achievement page works though.
    useEffect(() => {
        setUrl(fbGetUrl(location.state.name));
    }, [url]);

    const handleHomeClick = () => {
        history("/app/history");
    }

    const handleRecordClick = () => {
        history("/one-min");
    }
    
    // Display highlighted filler words in the transcription
    return (
        <div className="finishedPage">
            <h1>Congrats! You did it!</h1>
            <div>
                <h3 className="fieldName">Prompt: </h3>
                <p className="fieldValue">{prompt}</p>
            </div>
            <audio controls>
                <source src={url} type="audio/mpeg" />
            </audio>
            <div>
                <h3 className="fieldName">Audio Transcription: </h3>
                <p className="fieldValue">{location.state.transcription}</p>
            </div>
            
            <button onClick={handleRecordClick}>Generate another prompt</button>
            <br></br>
            <button onClick={handleHomeClick}>Return to app</button>
        </div>
    );
}

export default Finished;