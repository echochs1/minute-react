import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

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
                const blobURL = URL.createObjectURL(blob);
                this.setState({ blobURL, isRecording: false });
            })
            .catch((e) => console.error(e));
    };

    render() {
        return(
            <div className='ButtonRecord'>
                <button onClick={this.startRecording} disabled={this.state.isRecording}>Record</button>
                <button onClick={this.stopRecording} disabled={!this.state.isRecording}>Stop</button>
                <audio src={this.state.blobURL} controls='controls'/>
            </div>
        )
    }
}

export default ButtonRecord;