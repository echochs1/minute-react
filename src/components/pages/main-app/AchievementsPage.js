import { getDownloadURL } from "firebase/storage";
import React, {useState, useContext, useEffect} from "react";
import { fbGetAllRecordings, fbUploadAudioFileDownloadURL } from "../../../service/firebase/fbConfig";
import { FirebaseContext } from "../../../service/firebase/fbContext";

// TODO: the ui for this page is so wack, the list of recordings is cut off and not scrollable rn
// so need to add some css
const Achievements = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [recordings, setRecordings] = useState(null);
    const {authUser} = useContext(FirebaseContext);

    useEffect(() => {
        setRecordings(fbGetAllRecordings());
    }, []);

    return (
        <div>
            <h3>Logged in as: {authUser.email ? authUser.email : "none"}</h3>
            <h1>Achievements</h1>
            {recordings == null ?
                <p>Loading recordings...</p>
                :
                <ul style={{overflow: "scroll"}}>
                    {recordings.map((recording, index) =>
                        <li key={index}>
                            <div style={{marginBottom:"1em"}}>
                                <h3 style={{display: "inline", marginRight:"1em"}}>{index}.</h3>
                                <p style={{display: "inline"}}>{recording.prompt}</p>
                            </div>
                            <audio controls style={{marginBottom:"1em"}}>
                                <source src={recording.url} type="audio/mpeg" />
                            </audio>
                            <div style={{marginBottom:"2em"}}>
                                <h4 style={{display: "inline", marginRight:"1em"}}>Transcription:</h4>
                                <p style={{display: "inline"}}>{recording.transcript}</p>
                            </div>
                        </li>
                    )}
                </ul>
            }

        </div>
    );
}

export default Achievements;