// RESOURCES
// https://docs.assemblyai.com/walkthroughs#submitting-files-for-transcription

import axios from 'axios';
import {} from 'dotenv/config';
// import uploadAudio from './uploadAudio';

/*
 * node ./src/service/assemblyai/uploadURL.js
 */

// export default function uploadUrl(audioUrl) {

    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            // authorization: process.env.ASSEMBLYAI_API_KEY,
            // authorization: "53a86dcca7c0414d8a4a553ad03cb797",
            "content-type": "application/json",
        },
    });

    assembly
        .post("/transcript", {
            // audio_url: "https://bit.ly/3yxKEIY",
            // audio_url: audioUrl,
            audio_url: "https://cdn.assemblyai.com/upload/865cc688-2fbe-4b4d-8911-ac7283cb64cd", // hello? this is andy um yeah this is my recording
            // audio_url: "https://cdn.assemblyai.com/upload/db2cc70f-e7e4-4d4b-99d7-bd23a283afa0", // i like chicken so like um yeah
            disfluencies: true,
            sentiment_analysis: true,
        })
        .then((res) => {
            console.log(res.data);
            return res.data['id'];
        })
        .catch((err) => console.error(err));
// }