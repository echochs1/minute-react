import React from "react";
import { useLocation } from "react-router-dom";
import DataVisualization from "./DataVisualization";

const Finished = () => {
    // TODO: Add some kind of buffering animation while we wait for analysis to complete
    // Get the transcription and assembly data from ButtonRecord.js
    const location = useLocation();

    // assemblyAI full results in location.state.assemblyData
    console.log(location.state);
    
    // Display highlighted filler words in the transcription
    return (
        <div className="finishedPage">
            <h1>Congrats! You did it!</h1>
            <div>
                <h3>Prompt: </h3>
                <p>{location.state.prompt}</p>
            </div>
            <div style={{display:'inline'}}>
                <h3>Audio Transcription: </h3>
                <p>{location.state.transcription}</p>
            </div>
        </div>
    );
}

export default Finished;