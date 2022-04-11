// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { connect } from 'react-redux';
import Play from "../../../assets/images/play.svg";
import Mic from "../../../assets/images/mic.svg";

import { fbUploadTranscript, fbUploadAudioFile } from '../../../service/firebase/fbConfig';

import axios from "axios";

// new instance of the mic recorder
const mp3Recorder = new MicRecorder({
    bitRate: 128
});

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
        this.transcribeAudio = this.transcribeAudio.bind(this);
    }

    transcribeAudio = (audioFile) => {
        // Upload audioFile to Firebase Storage
        fbUploadAudioFile(audioFile);

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
                                console.log(res3.data);
                                current2 = Date.now();
                                console.log(current2 - current1);
                                this.setState({transcription: res3.data.text});

                                // Push transcription to Firebase database
                                fbUploadTranscript(res3.data.text, audioFile.name);

                                // Call function to analyze transcript
                                
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
                // TODO: Make each file name unique but easy to look up
                const file = new File(buffer, 'testAudio.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  });

                //   console.log(file);
                
                // const player = new Audio(URL.createObjectURL(file));
                const  blobURL = URL.createObjectURL(file);
                this.setState({ blob: blobURL})
                this.transcribeAudio(file);
                this.setState({ isRecording: false });
                
            })
            .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
    }

    parse = (string) => {
        // return string.split(/(, | )/g)
        let parsable = string.split(/(, | )/g);
    }

    parseDisfluencies = (string) => {
        // return string.split(/(, | )/g)
        let parsable = string.split(/(, | )/g);
        console.log(parsable);
            let output = [];
            let counter = 0;
            for (const element of parsable){
                if (element == 'um' || element == 'um.' ||  element == 'uh' || element == 'uh.' || element == 'hmm' || element == 'hmm.' || element == 'mhm' || element == 'mhm.' || element == 'uh huh' || element == 'uh huh.') {
                    output.push(counter)
                    counter++
                }
                else {
                    //nothing is done
                    counter++
                    continue
                }
            };
            return output
    }
    
    render() {
        return(
            <div className='ButtonRecord'>
                {/* onclick should change state, change icon, change padding bc of icon, and change to disabled */}
                <button
                    className='record-btn'
                    onClick={this.state.isRecording ? this.stopRecording : this.startRecording}
                    style={this.state.isRecording ? { padding: "1rem" } : {padding: "1rem 0.8125rem 1rem 1.1875rem"}}
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