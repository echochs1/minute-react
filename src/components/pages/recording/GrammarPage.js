import React, {useEffect, useState} from "react";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { grammarCheck, underlineErrors } from "../../../service/recording/grammarCheck";

const Home = () => {
    const [editedTranscript, setEditedTranscript] = useState("");
    const transcription = "What is your favorite color? I don't really have one. Um, sometimes it changes. Um, usually it's red, blue or green. I remember when I was a kid, though, it was definitely blue. Just because all the other kids, all the other boys specifically, um, like the color blue. So I was like, oh, that's like the boy color. Um, and then, I don't know, at some point changed to red. And then I think recently it's been more greenish and yellow. I don't know. Yellow and lavender has been a very pretty color combination. I also like pastel colors a little bit more than the not rude, but, like the more, um, harsh primary colors that are, uh, like the normal contrast. I don't know. I just like the softer kind of colors. It, uh, gives off better vibes for me. Um, what else? I feel like I've.";
    const setTranscript = () => {
        grammarCheck(transcription)
        .then(function(response) {
            setEditedTranscript(underlineErrors(transcription, response.data));
        });
    }
    useEffect(() => {
        setTranscript();
    }, []);    

    return (
        <div style={{height: '100vh'}}>
            <h1>Grammar Check Test</h1>
            <div>{editedTranscript ? editedTranscript : ""}</div>
        </div>
    );
}

export default Home;