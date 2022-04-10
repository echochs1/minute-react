import React from "react";
import { Statistic, Slider } from "antd";
import { randomPrompts } from "../../../service/recording/one-min/randomPrompts";
import Clock from "../../../assets/images/clock.svg";
import ButtonRecord from "../main-app/ButtonRecord";
import { useNavigate } from "react-router-dom";

const { Countdown } = Statistic;

/**
 * 
 * @param {*} arr array of items
 * @returns random index of the array arr
 */
const randomIndex = (arr) => { 
    return Math.floor(Math.random() * arr.length);
}

const OneMinPage = (props) => {
    const question = React.useState(randomPrompts[randomIndex(randomPrompts)]); // question generated upon load
    const [isRecording, setIsRecording] = React.useState(false); // is recording state
    const [countdownValue, setCountdownValue] = React.useState(0); // countdown value
    const [sliderValue, setSliderValue] = React.useState(60); // slider value
    const [isUploading, setIsUploading] = React.useState(false); // is uploading state while assemblyAI is processing
    
    /**
     * @description outer function to handle the start and stop of recording
     */
    const handleButtonRecordClick = () => {
        setIsRecording(!isRecording); // start false and then set to true on click
        setCountdownValue(Date.now() + 6 * 10 * 1000); // 60 seconds
        console.log(isRecording);
        console.log(countdownValue);
    }
    
    const handleSliderChange = () => {
        setSliderValue(countdownValue);
    }
    
    const history = useNavigate();

    /**
     * @description switching to finished page after 60 seconds
     */
    // TODO: Add some kind of buffering animation while we wait for analysis to complete
    const handleCountdownFinish = (data) => {
        history("/finished", {state: {prompt: question[0], transcription: data.transcription, assemblyData: data.assemblyData}});
    }

    return (
        <div className="oneMinPage">
            <div className="timer">
                <Slider
                    min={0}
                    max={60}
                    defaultValue={60}
                    reverse={true}
                    // handleStyle={{margin: "1rem"}}
                    onChange={handleSliderChange}
                    value={sliderValue}
                />
                <div className="clock">
                    <img className="clock-icon" src={Clock} alt="clock" />
                    <Countdown format="mm:ss" value={isRecording ? countdownValue : countdownValue} valueStyle={{color: "#fff"}} onFinish={handleCountdownFinish} />
                </div>
            </div>
            <div className="question">
                <h1 className="question-prompt">{question}</h1>
            </div>
            <div className="record" onClick={handleButtonRecordClick}>
                <ButtonRecord question={question} handleFinish={(data) => handleCountdownFinish(data)}/>
            </div>
        </div>
    )
}

export default OneMinPage;