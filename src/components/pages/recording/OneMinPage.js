import React, {useState, useEffect} from "react";
import { Statistic, Slider } from "antd";
import { randomPrompts } from "../../../service/recording/one-min/randomPrompts";
import Clock from "../../../assets/images/clock.svg";
// import ButtonRecord from "../main-app/ButtonRecord";
import { useNavigate } from "react-router-dom";
// import LoadingPage from "./LoadingPage";
import MicRecorder from 'mic-recorder-to-mp3';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";
import { fbUploadRecording, fbUploadAudioFile, fbGetUrl } from '../../../service/firebase/fbConfig';
import axios from 'axios';
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
    const question = useState(randomPrompts[randomIndex(randomPrompts)]); // question generated upon load
    const [isRecording, setIsRecording] = useState(false); // is recording state
    const [countdownValue, setCountdownValue] = useState(0); // countdown value
    const [isUploading, setisUploading] = useState(false); // true when assemblyAI/firebase uploading
    const [blobURL, setBlobURL] = useState(null); // blob url of recording
    const [isBlocked, setIsBlocked] = useState(false); // true when recording is blocked (permission issue)
    const [assemblyData, setAssemblyData] = useState(null); // assembly data of recording
    const [transcription, setTranscription] = useState(null); // transcription of recording
    const [audioUrl, setAudioUrl] = useState(null); // url of recording

    const [savefile, setSaveFile] = useState(null);
    
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
        if(!isRecording && !isBlocked) {
            setIsRecording(!isRecording); // start false and then set to true on click
            setCountdownValue(Date.now() + 6 * 10 * 1000); // 60 seconds
            mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
            // setTimeout(() => {stopRecording();}, 60000);
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

                const  blobURL = URL.createObjectURL(file);
                setBlobURL(blobURL);
                setIsRecording(false);

                // Upload audioFile info to assemblyAI and firebase
                // transcribeAudio(file);
                setSaveFile(file.name);
                console.log(file.name);
                uploadAudio(file);
            })
            .catch((e) => console.error(e));
    }

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
            .then((res1) => {console.log("reaced URL:", res1.data['upload_url']);         //FIRST LOG URL
            postTranscript(res1.data['upload_url'], audioFile.name);})
            .catch((err) => console.log(err));
            }

    const postTranscript = (fileURL, name) => {
        const assembly1 = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });
        assembly1
            .post("/transcript", {
                audio_url: fileURL,
                disfluencies: true
            })
            .then((res) => {console.log("postTranscript returns: ", res.data.id);
            setTimeout(() => {
            getTranscript(res.data.id, name)
        }, 30000);
        })
            .catch((err) => console.error("postTranscript Error: ",err));
    }

    const getTranscript = (transcriptID, name) => {
        console.log("getTranscript input: ", transcriptID);
        const assembly2 = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });
        // setTimeout(() => {
        assembly2
            .get(`/transcript/${transcriptID}`)
            .then((res3) => {
                console.log("getTranscript returns: ", res3)
                setAssemblyData(res3.data);
                setTranscription(res3.data.text);
                
                console.log("savefile.name: ", name);
                // Push transcription to Firebase database
                fbUploadRecording(name, question[0], res3.data.text);
                // setAudioUrl(fbGetUrl(audioFile.name));
                setisUploading(false);
                // const audio_url = fbGetUrl(audioFile.name);
                // handleUploadFinish(audioFile.name, audio_url);
                history("/finished", {state: {name: name}});
            })
            .catch((err) => console.error("getTranscript Error: ", err));
        // }, 5000);
    }

//ox60jdc4dr-af03-4126-8203-e05442adc5a9
//ox60cuj3dy-77d9-4d47-9f9c-d860c7b4d366


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
                const assembly1 = axios.create({
                    baseURL: "https://api.assemblyai.com/v2",
                    headers: {
                        authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                        "content-type": "application/json",
                    },
                });
            
                assembly1
                    .post("/transcript", {
                        audio_url: res1.data['upload_url'],
                        disfluencies: true,
                        sentiment_analysis: true,
                    })
                    .then((res2) => {
                        console.log(res2.data.id);                          //SECOND LOG receiving transcript code
                        current1 = Date.now();
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
                                current2 = Date.now();
                                setAssemblyData(res3.data);
                                setTranscription(res3.data.text);
                                
                                // Push transcription to Firebase database
                                fbUploadRecording(audioFile.name, question[0], res3.data.text);
                                // setAudioUrl(fbGetUrl(audioFile.name));
                                setisUploading(false);
                                // const audio_url = fbGetUrl(audioFile.name);
                                // handleUploadFinish(audioFile.name, audio_url);
                                history("/finished", {state: {name: audioFile.name}});
                            })
                            .catch((err) => console.error(err));
                        }, 30000);

                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
    }

    /**
     * @description once the uploading is finished, we need to redirect to finish page with info
     * about the recording.
     */
    // const handleUploadFinish = (filename, audio_url) => {
    //     history("/finished", {state: {name: filename, prompt: question[0], transcription: transcription, assemblyData: assemblyData, url: audio_url}});
    // }

    const renderTimer = () => {
        console.log(isUploading);
        if(!isUploading) {
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
                    <div className="record">
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
                <div className="loading-page">
                    <h1 className="question-prompt">
                        <Typewriter
                            options={{
                                strings: ["Getting your audio file...", "Building your recording...", "Writing your transcription...", "Analyzing the data...", "Finding those filler words..."],
                                autoStart: true,
                                loop: true,
                                color: "#fff",
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