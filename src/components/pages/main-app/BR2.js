// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { connect } from 'react-redux';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";

import { fbUploadRecording, fbUploadAudioFile, fbGetUrl } from '../../../service/firebase/fbConfig';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

// new instance of the mic recorder
const mp3Recorder = new MicRecorder({
    bitRate: 128
});

class ButtonRecord extends React.Component {
    constructor(props) {
        super(props);
        this.handleFinish = (data) => this.props.handleFinish(data);
        this.question = this.props.question;
        this.goToLoadingPage = this.props.startLoading;

        // some basic state values to manage
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            transcription: '',
            url: '',
            assemblyData: null,
            transcriptionStrlist: [],
        };
        this.uploadAudio = this.uploadAudio.bind(this);
        this.postTranscript = this.postTranscript.bind(this);
        this.getTranscript = this.getTranscript.bind(this);
    }

    uploadAudio = async (audioFile) => {
        try {
            const assembly = axios.create({
                baseURL: "https://api.assemblyai.com/v2",
                headers: {
                    authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                    "content-type": "application/json",
                    "transfer-encoding": "chunked",
                },
            });
                assembly
                    .post("/upload", audioFile)
                    .then((res) => {return res.data})
                    .catch((err) => console.error("uploadAudio Error1: ", err));
            } catch (err) {
                console.log("uploadAudio Error2: ", err)
            }
        }

    postTranscript = async (fileURL) => {
        try {
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
                .then((res) => {return res.data})
                .catch((err) => console.error("postTranscript Error1: ",err));
        }
        catch (err){
            console.log("postTranscript Error2: ", err)
        }
    }

getTranscript = async (transcriptID) => {
    try{
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
                "content-type": "application/json",
            },
        });
        assembly
            .get(`/transcript/${transcriptID}`)
            .then((res) => {return res.data})
            .catch((err) => console.error(err));
    } catch (err) {

    }
}

    // start audio recording with mp3Recorder -> returns Promise
    startRecording = () => {
            if (this.state.isBlocked) {
                // if permissions not granted
                console.log('Permission Denied');
            } else {
                mp3Recorder
                    .start()
                    .then(() => {
                        this.setState({ isRecording: true });
                    })
                    .catch((e) => console.error(e));
                setTimeout(() => { this.stopRecording(); this.goToLoadingPage(); }, 60000);

            }
        };

        // stop recording -> calls getMp3() which returns a Promise
        // blob and buffers received as arguments when Promise is resolved
        stopRecording = () => {
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
                    const blobURL = URL.createObjectURL(file);
                    this.setState({ blob: blobURL })
                    this.setState({ isRecording: false });
                    // Upload audioFile to Firebase Storage
                    fbUploadAudioFile(file);
                    // Upload audioFile info to assemblyAI and firebase
                    const fileURL = await this.uploadAudio(file);
                    const transcriptID = await this.postTranscript(fileURL);
                    const data = await this.getTranscript(transcriptID);
                })
                .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
        }

        parseDisfluencies = (string) => {
            this.setState({ transcriptionStrlist: string.split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g) });
            console.log("transcriptionlist: ", this.state.transcriptionStrlist);
        }

        render() {
            return (
                <div className='ButtonRecord'>
                    {/* onclick should change state, change icon, change padding bc of icon, and change to disabled */}
                    <button
                        className='record-btn'
                        onClick={this.state.isRecording ? this.stopRecording : this.startRecording}
                        style={this.state.isRecording ? { padding: "1rem", cursor: "not-allowed" } : { padding: "1rem 0.8125rem 1rem 1.1875rem" }}
                    /*disabled={this.state.isRecording ? true : false}*/>
                        <img src={this.state.isRecording ? Mic : Play} alt="Play Button" />
                    </button>
                    {/* <button onClick={this.stopRecording} disabled={!this.state.isRecording}>Stop</button> */}
                    {/* <audio src={this.state.blobURL} controls='controls'/> */}
                    <p>{this.state.transcription}</p>
                </div>
            )
        }
    }

// mapStateToProps = state => {
//     return {
//         someProp: state.someProp,
//         anotherProp: state.anotherProp
//     };
//   };
// mapDispatchToProps = dispatch => {
//     return {
//         updateSomeProp: () => dispatch({ type: 'SOME_ACTION' }),
//         updateAnotherProp: () => dispatch({ 
//             type: 'ANOTHER_ACTION',
//             payload: someValue 
//         })
//     };
// };

export default ButtonRecord;