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
    const id = uploadUrl(url);
    console.log(getTranscript(id));

    // uploadAudio(audioFile);
}