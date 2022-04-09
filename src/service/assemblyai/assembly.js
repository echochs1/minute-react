// RESOURCES
// https://developer.mozilla.org/en-US/docs/Web/API/Blob
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
// https://www.assemblyai.com/blog/uploading-files-to-assemblyai-using-node-js-and-javascript/
// https://github.com/AssemblyAI/nodejs-getting-started-stt/blob/main/upload.js
// https://www.assemblyai.com/blog/getting-started-with-speech-to-text-transcriptions-with-assemblyai-javascript-and-node-js/

import axios from "axios";
import {} from 'dotenv/config';

// doesn't work, uploading happens in ButtonRecord transcribeAudio
export const assembly = (audioFile) => {
    var current1 = new Date();
    var current2 = new Date();
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
                            return {data: res3.data};
                        })
                        .catch((err) => console.error(err));
                    }, 15000);

                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.log(err));
}