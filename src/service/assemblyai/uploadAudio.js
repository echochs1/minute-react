import axios from "axios";
import {} from 'dotenv/config';
import fs from 'fs';

const baseURL = "https://api.assemblyai.com/v2";

/*
 * node ./src/utils/uploadAudio.js ./src/assets/audio/voice-memo-1.m4a
 */

/**
 * Function that takes in an audioFile recorded from the device.
 * Returns an "upload_url" from AssemblyAI API JSON that can be processed by uploadUrl.js.
 * @param {*} audioFile - audio file recorded from mobile device supported file types: https://docs.assemblyai.com/#supported-languages
 */
// export default function uploadAudio(audioFile) {
    let args = process.argv.slice(2);
    let audioFile = args[0];

    fs.readFile(audioFile, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const assembly = axios.create({
            baseURL: baseURL,
            headers: {
                // authorization: process.env.ASSEMBLYAI_API_KEY,
                authorization: "53a86dcca7c0414d8a4a553ad03cb797",
                "content-type": "application/json",
                "transfer-encoding": "chunked",
            },
        });

        assembly
            .post("/upload", data)
            .then((res) => {
                console.log(res.data);
                console.log(`URL: ${res.data['upload_url']}`);
                return res.data['upload_url'];
            })
            .catch((err) => console.log(err));
    })
// }