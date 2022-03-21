// RESOURCES
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
// https://github.com/Matheswaaran/react-mp3-audio-recording/blob/master/src/App.js

import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import assembly from '../service/assemblyai/assembly';

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
    }

    // check permissions of web browser to access mic for recording
    // componentDidMount() {
    //     navigator.getUserMedia({ audio: true },
    //         () => {
    //             console.log('Permission Granted');
    //             this.setState({ isBlocked: false });
    //         },
    //         () => {
    //             console.log('Permission Denied');
    //             this.setState({ isBlocked: true });
    //         },
    //     );
    // };

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
                // const blobURL = URL.createObjectURL(blob);
                // this.setState({ blobURL, isRecording: false });
                // console.log(blobURL);
                // const transcription = assembly(blob);
                // this.setState({ transcription });
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  });

                //   console.log(file);
                
                // const player = new Audio(URL.createObjectURL(file));
                const text = assembly(file);
                this.setState({transcription: text});
            })
            .catch((e) => console.error(e));
            // uploadAudio(this.state.blobURL);
    };

    render() {
        return(
            <div className='ButtonRecord'>
                <button onClick={this.startRecording} disabled={this.state.isRecording}>Record</button>
                <button onClick={this.stopRecording} disabled={!this.state.isRecording}>Stop</button>
                <audio src={this.state.blobURL} controls='controls'/>
                <p>{this.state.blobURL}</p>
                {/* <p>{this.state.transcription}</p> */}
            </div>
        )
    }
}

export default ButtonRecord;