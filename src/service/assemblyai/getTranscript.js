// RESOURCES
// https://docs.assemblyai.com/walkthroughs#getting-the-transcription-result

import axios from "axios";
import {} from 'dotenv/config';

/*
 * node ./src/service/assemblyai/getTranscript.js
 */

// export default function getTranscript(audioID) {

    // const audioID = "og3aszo649-a10f-4dbd-aa96-9148bbdf64d9"
    const audioID = "os7s1gf3xc-d304-4a09-8832-85ab2761243e" // hello? this is andy...

    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            // authorization: process.env.ASSEMBLYAI_API_KEY,
            // authorization: "53a86dcca7c0414d8a4a553ad03cb797",
            "content-type": "application/json",
        },
    });
    
    assembly
        .get(`/transcript/${audioID}`)
        .then((res) => {
            console.log(res.data);
            return res.data['text'];
        })
        .catch((err) => console.error(err));
// }