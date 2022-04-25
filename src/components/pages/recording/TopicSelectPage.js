import React, {useState, useEffect} from "react";
import { Input, Slider } from "antd";
import { useNavigate } from "react-router-dom";
// import LoadingPage from "./LoadingPage";
import MicRecorder from 'mic-recorder-to-mp3';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";
import { fbUploadRecording, fbUploadAudioFile } from '../../../service/firebase/fbConfig';
import axios from 'axios';
// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

// https://github.com/tameemsafi/typewriterjs
import Typewriter from "typewriter-effect";

const TopicSelectPage = () => {
    const [question, setQuestion] = useState(null); // question inputted by user
    const [hasPrompt, setHasPrompt] = useState(false); // whether or not the user has set a prompt
    const [isRecording, setIsRecording] = useState(false); // is recording state
    const [isUploading, setisUploading] = useState(false); // true when assemblyAI/firebase uploading
    const [blobURL, setBlobURL] = useState(null); // blob url of recording
    const [isBlocked, setIsBlocked] = useState(false); // true when recording is blocked (permission issue)
    const [assemblyData, setAssemblyData] = useState(null); // assembly data of recording
    const [transcription, setTranscription] = useState(null); // transcription of recording

    const [savefile, setSaveFile] = useState(null);
    const [time, setTime] = useState(0); // recording length
    
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
        let interval = null;
        if(isRecording) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
        clearInterval(interval);
        };
      }, [isRecording]);

    /**
     * @description start audio recording with mp3Recorder -> returns Promise
     */
    const startRecording = () => {
        if(!isRecording && !isBlocked && hasPrompt) {
            setIsRecording(!isRecording); // start false and then set to true on click
            mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    };

    // stop recording -> calls getMp3() which returns a Promise
    // blob and buffers received as arguments when Promise is resolved
    const stopRecording = () => {
        mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setIsRecording(false);
                setisUploading(true);
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
        assembly2
            .get(`/transcript/${transcriptID}`)
            .then((res3) => {
                console.log("getTranscript returns: ", res3)
                setAssemblyData(res3.data);
                setTranscription(res3.data.text);
                
                console.log("savefile.name: ", name);
                // Push transcription to Firebase database
                fbUploadRecording(name, question, res3.data.text);
                setisUploading(false);
                // Go to finished page
                history("/finished", {state: {name: name}});
            })
            .catch((err) => console.error("getTranscript Error: ", err));
    }

    const onInputChange = (e) => {
        setQuestion(e.target.value);
    }
    const onSetPrompt = () => {
        if(question != '') {
            setHasPrompt(true);
        }
    }

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
                            <span className="digits">
                                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                            </span>
                            <span className="digits">
                                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                            </span>
                            <span className="digits mili-sec">
                                {("0" + ((time / 10) % 100)).slice(-2)}
                            </span>
                        </div>
                    </div>
                    {hasPrompt ?
                    <div className="question">
                        <h1 className="question-prompt">{question}</h1>
                    </div>
                    : 
                    <div className="question">
                        <Input showCount maxLength={50} onChange={onInputChange} onPressEnter={onSetPrompt} style={{width:'50%',marginTop:'5%',marginBottom:'10%'}}/>
                    </div> }
                    <div className="record">
                        <div className='ButtonRecord'>
                            <button
                                className='record-btn'
                                onClick={isRecording ? stopRecording : startRecording}
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
                                delay: 75,
                            }}
                        />
                    </h1>
                </div>
            )
        }
    }

    return (
        <div className="oneMinPage" style={{height:'100vh'}}>
            {renderTimer()}
        </div>
    )
}

export default TopicSelectPage;