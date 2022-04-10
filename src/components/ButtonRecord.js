// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import assembly from '../service/assemblyai/assembly';
import { connect } from 'react-redux';
import axios from "axios";
import { Server } from "socket.io";
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';

let socket;
let recorder;
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
        this.uploadAudio = this.uploadAudio.bind(this);
        console.log(this.props)
        // props.socket.on('completed', console.log('hello'));
    }

    componentDidMount() {
    }
    
    realtimeTranscript = async () => {
        const {isRecording} = this.state;
        if (isRecording) { 
          if (socket) {
            socket.send(JSON.stringify({terminate_session: true}));
            socket.close();
            socket = null;
          }
      
          if (recorder) {
            recorder.pauseRecording();
            recorder = null;
          }
        } else {
          const response = await fetch('http://localhost:8000'); // get temp session token from server.js (backend)
          const data = await response.json();
      
          if(data.error){
            alert(data.error)
          }
          
          const { token } = data;
      
          // establish wss with AssemblyAI (AAI) at 16000 sample rate
          socket = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);
      
          // handle incoming messages to display transcription to the DOM
          const texts = {};
          socket.onmessage = (message) => {
            let msg = '';
            const res = JSON.parse(message.data);
            texts[res.audio_start] = res.text;
            const keys = Object.keys(texts);
            keys.sort((a, b) => a - b);
            for (const key of keys) {
              if (texts[key]) {
                msg += ` ${texts[key]}`;
              }
            }
          };
      
          socket.onerror = (event) => {
            console.error(event);
            socket.close();
          }
          
          socket.onclose = event => {
            console.log(event);
            socket = null;
          }
      
          socket.onopen = () => {
            // once socket is open, begin recording
            navigator.mediaDevices.getUserMedia({ audio: true })
              .then((stream) => {
                recorder = new RecordRTC(stream, {
                  type: 'audio',
                  mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
                  recorderType: StereoAudioRecorder,
                  timeSlice: 250, // set 250 ms intervals of data that sends to AAI
                  desiredSampRate: 16000,
                  numberOfAudioChannels: 1, // real-time requires only one channel
                  bufferSize: 4096,
                  audioBitsPerSecond: 128000,
                  ondataavailable: (blob) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64data = reader.result;
      
                      // audio data must be sent as a base64 encoded string
                      if (socket) {
                        socket.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                      }
                    };
                    reader.readAsDataURL(blob);
                  },
                });
      
                recorder.startRecording();
              })
              .catch((err) => console.error(err));
          };
        }
      
      };

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
                console.log(`URL: ${res1.data['upload_url']}`);
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
                        webhook_url: `http://localhost:3001/socket.io`
                    })
                    .then((res2) => {
                        console.log(res2.data);
                        // const assembly2 = axios.create({
                        //     baseURL: "https://api.assemblyai.com/v2",
                        //     headers: {
                        //         authorization: "53a86dcca7c0414d8a4a553ad03cb797",
                        //         "content-type": "application/json",
                        //     },
                        //     webhook_url: `http://localhost:3001/`
                        // });
                        // assembly2
                        //     .get(`/transcript/${res2.data.id}`, {
                        //         webhookUrl: `http://localhost:3001`
                        //     })
                        //     .then((res3) => {
                        //         console.log(res3.data);
                        //         this.setState({transcription: res3.data.text});
                        //     })
                        //     .catch((err) => console.error(err));
                        // setTimeout(() => {
                        //     assembly2
                        //     .get(`/transcript/${res2.data.id}`, {
                        //         webhook_url: `http://${window.location.hostname}:3000`
                        //     })
                        //     .then((res3) => {
                        //         console.log(res3.data);
                        //         this.setState({transcription: res3.data.text});
                        //     })
                        //     .catch((err) => console.error(err));
                        // }, 15000);
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
                const blobURL = URL.createObjectURL(file);
                const player = new Audio(blobURL);
                this.uploadAudio(file);
                this.setState({ isRecording: false, blobURL: blobURL });
            })
            .catch((e) => console.error(e));
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