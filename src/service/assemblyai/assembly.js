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

    const url = uploadAudio(audioFile);
    console.log(url)
    // const id = uploadUrl(url);
    console.log(getTranscript("osi2n6e34o-5b7d-457c-b968-96a0beeabb25"));

    // uploadAudio(audioFile);
}