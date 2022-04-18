import React, {useState, useContext, useEffect} from "react";
import { fbGetAllRecordings, fbUploadAudioFileDownloadURL } from "../../../service/firebase/fbConfig";
import { FirebaseContext } from "../../../service/firebase/fbContext";

// TODO: the ui for this page is so wack, the list of recordings is cut off and not scrollable rn
// so need to add some css
const History = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [recordings, setRecordings] = useState(null);
    const {authUser} = useContext(FirebaseContext);

    useEffect(() => {
        setRecordings(fbGetAllRecordings());
    }, []);

    return (
        <div className="historyPage">
            <h1>History</h1>
            <h3>Logged in as: {authUser.email ? authUser.email : "none"}</h3>
            {recordings == null ?
                <p>Loading recordings...</p>
                :
                <ul className="recordingsList">
                    {recordings.map((recording, index) =>
                        <li key={index} className="recordingItem">
                            <div className="recordingInfo">
                                <h3 className="fieldName">{index+1}.</h3>
                                <p className="fieldValue">{recording.prompt}</p>
                            </div>
                            <audio controls className="recordingInfo">
                                <source src={recording.url} type="audio/mpeg" />
                            </audio>
                            <div className="recordingInfo">
                                <h4 className="fieldName">Transcription:</h4>
                                <p className="fieldValue">{recording.transcript}</p>
                            </div>
                        </li>
                    )}
                </ul>
            }

        </div>
    );
}

export default History;