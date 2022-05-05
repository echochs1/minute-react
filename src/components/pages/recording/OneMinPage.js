// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js
// https://github.com/tameemsafi/typewriterjs

import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import { randomPrompts } from "../../../service/recording/one-min/randomPrompts";
import Clock from "../../../assets/images/clock.svg";
import { useNavigate } from "react-router-dom";
import MicRecorder from 'mic-recorder-to-mp3';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";
import { fbUploadRecording, fbUploadAudioFile } from '../../../service/firebase/fbConfig';
import axios from 'axios';
import Typewriter from "typewriter-effect";
import { MonkeyLearn } from "monkeylearn";


const { Countdown } = Statistic;

/**
 * 
 * @param {*} arr array of items
 * @returns random index of the array arr
 */
const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

const OneMinPage = () => {
    const question = useState(randomPrompts[randomIndex(randomPrompts)]); // question generated upon load
    const [isRecording, setIsRecording] = useState(false); // is recording state
    const [countdownValue, setCountdownValue] = useState(0); // countdown value
    const [isUploading, setisUploading] = useState(false); // true when assemblyAI/firebase uploading
    const [blobURL, setBlobURL] = useState(null); // blob url of recording
    const [isBlocked, setIsBlocked] = useState(false); // true when recording is blocked (permission issue)
    const [assemblyData, setAssemblyData] = useState(null); // assembly data of recording
    const [transcription, setTranscription] = useState(null); // transcription of recording
    const [audioUrl, setAudioUrl] = useState(null); // url of recording
    const [keywordClassification, setKeywordClassification] = useState(null);
    const [profanityClassification, setProfanityClassification] = useState(null);


    // new instance of the mic recorder
    const [mp3Recorder, setmp3Recorder] = useState(
        new MicRecorder({ bitRate: 128 })
    );

    const history = useNavigate();

    useEffect(() => {
        // check if the user has granted the permission to record audio
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log("Permission Granted");
                setIsBlocked(false);
            },
            () => {
                console.log("Permission Denied");
                setIsBlocked(true);
            }
        );
    }, [])

    /**
     * @description start audio recording with mp3Recorder -> returns Promise
     */
    const startRecording = () => {
        if (!isRecording && !isBlocked) {
            setIsRecording(!isRecording); // start false and then set to true on click
            setCountdownValue(Date.now() + 6 * 10 * 1000); // 60 seconds
            mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    };

    /**
     * @description stops recording after 60 seconds
     */
    // TODO: Add some kind of buffering animation while we wait for analysis to complete
    const handleCountdownFinish = () => {
        setisUploading(true);
        stopRecording();
    }

    // stop recording -> calls getMp3() which returns a Promise
    // blob and buffers received as arguments when Promise is resolved
    const stopRecording = () => {
        mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                // Make each file name unique
                const dateNow = Date.now();
                const name = `${dateNow}.mp3`;
                const file = new File(buffer, name, {
                    type: blob.type,
                    lastModified: dateNow
                });

                // Upload audioFile to Firebase Storage
                fbUploadAudioFile(file);

                const blobURL = URL.createObjectURL(file);
                setBlobURL(blobURL);
                setIsRecording(false);

                // Upload audioFile info to firebase and make AssemblyAI API calls
                console.log(file.name);
                uploadAudio(file);
            })
            .catch((e) => console.error(e));
    }

    /**
     * @description uploads audio file to AssemblyAI and creates a readable URL for the file
     */
    const uploadAudio = (audioFile) => {
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
            .then((response) => {
                console.log("reaced URL:", response.data['upload_url']);         //FIRST LOG URL
                postTranscript(response.data['upload_url'], audioFile.name);
            })
            .catch((err) => console.log(err));
    }

    /**
     * @description sends audiofile url to AssemblyAI and creates a transcription and an id linked to the transcription
     */
    const postTranscript = (fileURL, filename) => {
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });
        assembly
            .post("/transcript", {
                audio_url: fileURL,
                disfluencies: true
            })
            .then((response) => {
                console.log("postTranscript returns: ", response.data.id);
                setTimeout(() => {
                    getTranscript(response.data.id, filename)
                }, 21000);
            })
            .catch((err) => console.error("postTranscript Error: ", err));
    }

    /**
     * @description sends ID to AssemblyAI and receives transcription
     * the transcription is then uploaded to Firebase and the app is directed to the finished page to display
     */
    const getTranscript = (transcriptID, filename) => {
        console.log("getTranscript input: ", transcriptID);
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });
        assembly
            .get(`/transcript/${transcriptID}`)
            .then((response) => {
                console.log("getTranscript returns: ", response)
                setAssemblyData(response.data);
                setTranscription(response.data.text);

                // Push transcription to Firebase database
                fbUploadRecording(filename, question[0], response.data.text);
                setisUploading(false);

                // Analysis 
                const ml = new MonkeyLearn(process.env.REACT_APP_MONKEY_LEARN_API_KEY);
                let keyword_model_id = 'ex_YCya9nrn'
                let profanity_model_id = 'cl_KFXhoTdt'
                let data = [response.data.text];
                ml.extractors.extract(keyword_model_id, data).then(res => {
                    console.log(res)
                    setKeywordClassification(res);
                    ml.classifiers.classify(profanity_model_id, data).then(res => {
                        console.log(res)
                        setProfanityClassification(res);
                        //redirected to finished page
                        history("/finished", {
                            state: {
                                name: filename,
                                keywordClassification: keywordClassification,
                                profanityClassification: profanityClassification
                            }
                        });
                    })
                })


            })
            .catch((err) => console.error("getTranscript Error: ", err));
    }

    const renderTimer = () => {
        console.log(isUploading);
        if (!isUploading) {
            return (
                <div>
                    <div className="timer">
                        <div className="clock">
                            <img className="clock-icon" src={Clock} alt="clock" />
                            <Countdown format="mm:ss" value={isRecording ? countdownValue : countdownValue} valueStyle={{ color: "#fff" }} onFinish={handleCountdownFinish} />
                        </div>
                    </div>
                    <div className="question">
                        <h1 className="question-prompt">{question}</h1>
                    </div>
                    <div className="record">
                        <div className='ButtonRecord'>
                            {/* onclick should change state, change icon, change padding bc of icon, and change to disabled */}
                            <button
                                className='record-btn'
                                onClick={isRecording ? null : startRecording}
                                style={isRecording ? { padding: "1rem", cursor: "not-allowed" } : { padding: "1rem 0.8125rem 1rem 1.1875rem" }}>
                                <img src={isRecording ? Mic : Play} alt="Play Button" />
                            </button>
                        </div>
                    </div>
                    <div className="tip">
                        <h3 className="tip-text">Hello there! Take a breath. Once you're ready, <span className="redHighlight">press the Play button</span> and present!</h3>
                    </div>
                </div>)

        } else {
            return (
                <div className="loading-page">
                    <h1 className="question-prompt">
                        <Typewriter
                            options={{
                                strings: ["Getting your audio file...", "Building your recording...", "Writing your transcription...", "Analyzing the data...", "Finding those filler words..."],
                                autoStart: true,
                                loop: true,
                                color: "#fff",
                                delay: 75,
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