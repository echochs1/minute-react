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
            .then((res) => {
                console.log(res.data);
                console.log(`URL: ${res.data['upload_url']}`);
                return res.data['upload_url'];
            })
            .catch((err) => console.log(err));
    // });
}