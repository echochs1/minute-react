// RESOURCES
// https://www.assemblyai.com/blog/uploading-files-to-assemblyai-using-node-js-and-javascript/
// https://github.com/AssemblyAI/nodejs-getting-started-stt/blob/main/upload.js
// https://www.assemblyai.com/blog/getting-started-with-speech-to-text-transcriptions-with-assemblyai-javascript-and-node-js/

import axios from "axios";
import {} from 'dotenv/config';
import fs from 'fs';

/*
 * node ./src/service/assemblyai/uploadAudio.js ./src/assets/audio/voice-memo-1.m4a
 */

/**
 * Function that takes in an audioFile recorded from the device.
 * Returns an "upload_url" from AssemblyAI API JSON that can be processed by uploadUrl.js.
 * @param {*} audioFile - audio file recorded from mobile device supported file types: https://docs.assemblyai.com/#supported-languages
 */
export default function uploadAudio(audioFile) {
    // let args = process.argv.slice(2);
    // let audioFile = args[0];

    // fs.readFile(audioFile, (err, data) => {
    //     if (err) {
    //         return console.log(err);
    //     }

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
                        // audio_url: "https://bit.ly/3yxKEIY",
                        audio_url: res1.data['upload_url'],
                        // audio_url: "https://cdn.assemblyai.com/upload/865cc688-2fbe-4b4d-8911-ac7283cb64cd", // hello? this is andy um yeah this is my recording
                        // audio_url: "https://cdn.assemblyai.com/upload/db2cc70f-e7e4-4d4b-99d7-bd23a283afa0", // i like chicken so like um yeah
                        disfluencies: true,
                        sentiment_analysis: true,
                    })
                    .then((res2) => {
                        console.log(res2.data.id);
                        const assembly2 = axios.create({
                            baseURL: "https://api.assemblyai.com/v2",
                            headers: {
                                // authorization: process.env.ASSEMBLYAI_API_KEY,
                                authorization: "53a86dcca7c0414d8a4a553ad03cb797",
                                "content-type": "application/json",
                            },
                        });
                        setTimeout(function(){
                            assembly2
                            .get(`/transcript/${res2.data.id}`)
                            .then((res3) => {
                                console.log(res3.data);
                                return res3.data.text;
                            })
                            .catch((err) => console.error(err));
                        }, 10000);
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
}