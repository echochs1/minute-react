import React from "react";
import { Statistic, Slider } from "antd";
import { randomPrompts } from "../../../service/recording/one-min/randomPrompts";
import Clock from "../../../assets/images/clock.svg";
import ButtonRecord from "../main-app/ButtonRecord";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import MicRecorder from 'mic-recorder-to-mp3';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";
import { fbUploadRecording, fbUploadAudioFile, fbGetUrl } from '../../../service/firebase/fbConfig';

// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

// https://github.com/tameemsafi/typewriterjs
import Typewriter from "typewriter-effect";

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
    const [isLoading, setIsLoading] = React.useState(false); // true when assemblyAI/firebase uploading
    const [blobURL, setBlobURL] = React.useState(null); // blob url of recording
    const [assemblyData, setAssemblyData] = React.useState(null); // assembly data of recording
    const [transcription, setTranscription] = React.useState(null); // transcription of recording
    const [audioUrl, setAudioUrl] = React.useState(null); // url of recording


    // new instance of the mic recorder
    const mp3Recorder = new MicRecorder({
        bitRate: 128
    });

    /**
     * @description outer function to handle the start and stop of recording
     */
    const handleButtonRecordClick = () => {
        if(!isRecording) {
            setIsRecording(!isRecording); // start false and then set to true on click
            setCountdownValue(Date.now() + 6 * 10 * 1000); // 60 seconds
            console.log(isRecording);
            console.log(countdownValue);
        }
    }

    // start audio recording with mp3Recorder -> returns Promise
    const startRecording = () => {
        if (isBlocked) {
            // if permissions not granted
            console.log('Permission Denied');
        } else {
            mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
            setTimeout(() => {stopRecording();}, 60000);

        }
    };

    /**
     * @description switching to finished page after 60 seconds
     */
    // TODO: Add some kind of buffering animation while we wait for analysis to complete
    const handleCountdownFinish = (audioFile) => {
        setIsLoading(true);
        // setTimeout(() => {
        //     console.log("loading");
        // }, 15000);
        // renderTimer();
        stopRecording();
        // history("/finished", {state: {name: data.name, prompt: question[0], transcription: data.transcription, assemblyData: data.assemblyData, url: data.url}});
    }

    // stop recording -> calls getMp3() which returns a Promise
    // blob and buffers received as arguments when Promise is resolved
    const stopRecording = () => {
        mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                // Make each file name unique
                const file = new File(buffer, `${Date.now()}.mp3`, {
                    type: blob.type,
                    lastModified: Date.now()
                    });

                //   console.log(file);
                
                // const player = new Audio(URL.createObjectURL(file));
                const  blobURL = URL.createObjectURL(file);
                setBlobURL(blobURL);
                setIsRecording(false);
                // Upload audioFile to Firebase Storage
                fbUploadAudioFile(file);
                // Upload audioFile info to assemblyAI and firebase
                transcribeAudio(file);
            })
            .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
    }

    /**
     * @description once the countdown is finished, we need to
     * transcribe the audio and render the finished page.
     */
    const transcribeAudio = (audioFile) => {
        // Use AssemblyAI to transcribe audioFile
        var current1 = new Date();
        var current2 = new Date();
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
                "transfer-encoding": "chunked-request",
            },
        });
        assembly
            .post("/upload", audioFile)
            .then((res1) => {
                console.log(`URL: ${res1.data['upload_url']}`);         //FIRST LOG URL
                // this.setState({ url: res1.data['upload_url'] });
                const assembly1 = axios.create({
                    baseURL: "https://api.assemblyai.com/v2",
                    headers: {
                        authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                        "content-type": "application/json",
                    },
                });
                // Get audio file download url for firebase now that audio file has been uploaded to storage
                // const downloadUrl = fbSetAudioFileDownloadURL(audioFile.name);
                // this.setState({ url: downloadUrl });
            
                assembly1
                    .post("/transcript", {
                        audio_url: res1.data['upload_url'],
                        disfluencies: true,
                        sentiment_analysis: true,
                    })
                    .then((res2) => {
                        console.log(res2.data.id);                          //SECOND LOG receiving transcript code
                        current1 = Date.now();
                        // console.log(current1.getTime());
                        const assembly2 = axios.create({
                            baseURL: "https://api.assemblyai.com/v2",
                            headers: {
                                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                                "content-type": "application/json",
                            },
                        });
                        setTimeout(() => {
                            assembly2
                            .get(`/transcript/${res2.data.id}`)
                            .then((res3) => {
                                // object storing transcription, sentiment, etc.
                                // console.log(res3.data);
                                current2 = Date.now();
                                console.log(current2 - current1);
                                setAssemblyData(res3.data);
                                setTranscription(res3.data.text);

                                // Push transcription to Firebase database
                                fbUploadRecording(audioFile.name, question[0], res3.data.text);
                                handleFinish({name: audioFile.name, transcription: res3.data.text, assemblyData: res3.data, url: fbGetUrl(audioFile.name)});
                            })
                            .catch((err) => console.error(err));
                        }, 15000);

                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
    }

    const renderTimer = () => {
        console.log(isLoading);
        if(!isLoading) {
            return (
                <div>
                    <div className="timer">
                        {/* <Slider
                            min={0}
                            max={60}
                            defaultValue={60}
                            reverse={true}
                            // handleStyle={{margin: "1rem"}}
                            onChange={handleSliderChange}
                            value={sliderValue}
                        /> */}
                        <div className="clock">
                            <img className="clock-icon" src={Clock} alt="clock" />
                            <Countdown format="mm:ss" value={isRecording ? countdownValue : countdownValue} valueStyle={{ color: "#fff" }} onFinish={handleCountdownFinish} />
                        </div>
                    </div>
                    <div className="question">
                        <h1 className="question-prompt">{question}</h1>
                    </div>
                    <div className="record" onClick={handleButtonRecordClick}>
                        {/* <ButtonRecord question={question} startLoading={() => setIsLoading(true)} handleFinish={(data) => handleCountdownFinish(data)} /> */}
                        <div className='ButtonRecord'>
                            {/* onclick should change state, change icon, change padding bc of icon, and change to disabled */}
                            <button
                                className='record-btn'
                                onClick={isRecording ? null : startRecording}
                                style={isRecording ? { padding: "1rem", cursor: "not-allowed"} : {padding: "1rem 0.8125rem 1rem 1.1875rem"}}>
                                <img src={isRecording ? Mic : Play} alt="Play Button" />
                            </button>
                        </div>
                    </div>
                </div>)
        
        } else {
            return (
                // <div>
                //     <p>Loading...</p>
                // </div>
                <div className="loading-page">
                    <h1 className="question-prompt">
                        <Typewriter
                            options={{
                                strings: ["Getting your audio file...", "Building your recording...", "Writing your transcription...", "Analyzing the data...", "Finding those filler words..."],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                </div>
            )
        }
    }

    return (
        <div className="oneMinPage">
            {renderTimer()}
        </div>
    )
}

export default OneMinPage;