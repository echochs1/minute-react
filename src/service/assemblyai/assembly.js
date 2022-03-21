// RESOURCES
// https://developer.mozilla.org/en-US/docs/Web/API/Blob
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

import uploadAudio from "./uploadAudio";
import uploadUrl from "./uploadURL";
import getTranscript from "./getTranscript";

export default async function assembly(audioFile) {

    // const blobURL = URL.createObjectURL(audioFile);
    console.log(typeof audioFile);
    // console.log(typeof blobURL);
    // console.log(blobURL);

    // all web recordings come in as a blob
    const blobReader = new FileReader();
    blobReader.readAsDataURL(audioFile);
    blobReader.onloadend = function() {
        let base64 = blobReader.result;
        base64 = base64.split(',')[1];
        // console.log(base64);
        let audioStuff = new Audio('data:audio/ogg;base64,' + base64);
        console.log(audioStuff);
        uploadAudio(audioStuff);
    }

    // const text = await (new Response(audioFile)).text();
    // const text = await audioFile.text();
    // console.log("DID WE GET IT?", text);
    // const text = await (audioFile.prototype.arrayBuffer());
    // const newUrl = uploadAudio(text);
    uploadUrl("https://cdn.assemblyai.com/upload/f3faf5c4-160c-43a0-bb99-6821154d0186");
    getTranscript("osibandplx-2f8a-45e6-8e75-8f3c47d89e0f");

    // uploadAudio(audioFile);
}