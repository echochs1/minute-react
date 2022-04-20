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
        this.transcribeAudio = this.transcribeAudio.bind(this);
    }

    // transcribeAudio = (audioFile) => {
    //     // Use AssemblyAI to transcribe audioFile
    //     var current1 = new Date();
    //     var current2 = new Date();
    //     const assembly = axios.create({
    //         baseURL: "https://api.assemblyai.com/v2",
    //         headers: {
    //             authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
    //             "content-type": "application/json",
    //             "transfer-encoding": "chunked-request",
    //         },
    //     });
    //     assembly
    //         .post("/upload", audioFile)
    //         .then((res1) => {
    //             console.log(`URL: ${res1.data['upload_url']}`);         //FIRST LOG URL
    //             // this.setState({ url: res1.data['upload_url'] });
    //             const assembly1 = axios.create({
    //                 baseURL: "https://api.assemblyai.com/v2",
    //                 headers: {
    //                     authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
    //                     "content-type": "application/json",
    //                 },
    //             });
    //             // Get audio file download url for firebase now that audio file has been uploaded to storage
    //             // const downloadUrl = fbSetAudioFileDownloadURL(audioFile.name);
    //             // this.setState({ url: downloadUrl });
            
    //             assembly1
    //                 .post("/transcript", {
    //                     audio_url: res1.data['upload_url'],
    //                     disfluencies: true,
    //                     sentiment_analysis: true,
    //                 })
    //                 .then((res2) => {
    //                     console.log(res2.data.id);                          //SECOND LOG receiving transcript code
    //                     current1 = Date.now();
    //                     // console.log(current1.getTime());
    //                     const assembly2 = axios.create({
    //                         baseURL: "https://api.assemblyai.com/v2",
    //                         headers: {
    //                             authorization: process.env.REACT_APP_ASSEMBLYAI_API_KEY,
    //                             "content-type": "application/json",
    //                         },
    //                     });
    //                     setTimeout(() => {
    //                         assembly2
    //                         .get(`/transcript/${res2.data.id}`)
    //                         .then((res3) => {
    //                             // object storing transcription, sentiment, etc.
    //                             // console.log(res3.data);
    //                             current2 = Date.now();
    //                             console.log(current2 - current1);
    //                             this.setState({transcription: res3.data.text});
    //                             this.setState({assemblyData: res3.data});

<<<<<<< Updated upstream
    //                             // Push transcription to Firebase database
    //                             fbUploadRecording(audioFile.name, this.question[0], res3.data.text);
    //                             this.handleFinish({name: audioFile.name, transcription: res3.data.text, assemblyData: res3.data, url: fbGetUrl(audioFile.name)});
    //                         })
    //                         .catch((err) => console.error(err));
    //                     }, 15000);
=======
                                // Push transcription to Firebase database
                                fbUploadRecording(audioFile.name, this.question[0], res3.data.text);
                                this.handleFinish({name: audioFile.name, transcription: res3.data.text, assemblyData: res3.data, url: fbGetUrl(audioFile.name)});
                            })
                            .catch((err) => console.error(err));
                        }, 30000);
>>>>>>> Stashed changes

    //                 })
    //                 .catch((err) => console.error(err));
    //         })
    //         .catch((err) => console.log(err));
    // }

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
            setTimeout(() => {this.stopRecording(); this.goToLoadingPage();}, 60000);

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
                const  blobURL = URL.createObjectURL(file);
                this.setState({ blob: blobURL})
                this.setState({ isRecording: false });
                // Upload audioFile to Firebase Storage
                fbUploadAudioFile(file);
                // Upload audioFile info to assemblyAI and firebase
                // this.transcribeAudio(file);
            })
            .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
    }

    // parseDisfluencies = (string) => {
    //     this.setState({transcriptionStrlist:  string.split(/( um| Um| uh| Uh| hmm| Hmm| mhm| Mhm| uh huh| Uh huh)/g)});
    //     console.log("transcriptionlist: ", this.state.transcriptionStrlist);
    // }
    
    render() {
        return(
            <div className='ButtonRecord'>
                {/* onclick should change state, change icon, change padding bc of icon, and change to disabled */}
                <button
                    className='record-btn'
                    onClick={this.state.isRecording ? this.stopRecording : this.startRecording}
                    style={this.state.isRecording ? { padding: "1rem", cursor: "not-allowed"} : {padding: "1rem 0.8125rem 1rem 1.1875rem"}}
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