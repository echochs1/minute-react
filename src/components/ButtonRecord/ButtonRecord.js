// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import assembly from '../../service/assemblyai/assembly';
import { connect } from 'react-redux';

import axios from "axios";

// new instance of the mic recorder
const mp3Recorder = new MicRecorder({
    bitRate: 128
});

var current1 = new Date();
var current2 = new Date();

class ButtonRecord extends React.Component {
    constructor(props) {
        super(props);
        
        // some basic state values to manage
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            transcription: '',
        };
        this.uploadAudio = this.uploadAudio.bind(this);
    }

    uploadAudio = (audioFile) => {
        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                // authorization: process.env.ASSEMBLYAI_API_KEY,
                authorization: "53a86dcca7c0414d8a4a553ad03cb797",
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
                        // authorization: process.env.ASSEMBLYAI_API_KEY,
                        authorization: "53a86dcca7c0414d8a4a553ad03cb797",
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
                        // console.log(current1.getTime());
                        const assembly2 = axios.create({
                            baseURL: "https://api.assemblyai.com/v2",
                            headers: {
                                authorization: "53a86dcca7c0414d8a4a553ad03cb797",
                                "content-type": "application/json",
                            },
                        });
                        setTimeout(() => {
                            assembly2
                            .get(`/transcript/${res2.data.id}`)
                            .then((res3) => {
                                console.log(res3.data);
                                current2 = Date.now();
                                console.log(current2 - current1);
                                this.setState({ isRecording: false });
                                this.setState({transcription: res3.data.text});
                            })
                            .catch((err) => console.error(err));
                        }, 15000);
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
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
        }
    };

    // stop recording -> calls getMp3() which returns a Promise
    // blob and buffers received as arguments when Promise is resolved
    stopRecording = () => {
        mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  });

                //   console.log(file);
                
                // const player = new Audio(URL.createObjectURL(file));
                const  blobURL = URL.createObjectURL(file);
                this.setState({ blob: blobURL})
                const text = this.uploadAudio(file);
                
            })
            .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
    }

    render() {
        return(
            <div className='ButtonRecord'>
                <button onClick={this.startRecording} disabled={this.state.isRecording}>Record</button>
                <button onClick={this.stopRecording} disabled={!this.state.isRecording}>Stop</button>
                <audio src={this.state.blobURL} controls='controls'/>
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