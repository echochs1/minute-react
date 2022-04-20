import React from "react";

// https://github.com/tameemsafi/typewriterjs
import Typewriter from "typewriter-effect";

const LoadingPage = () => {

    return (
        <div className="loading-page">
            <h1 className="question-prompt">
                <Typewriter
                    options={{
                        strings: ["Getting your audio file...", "Building your recording...", "Writing your transcription...", "Analyzing the data...", "Finding those filler words..."],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </h1>
        </div>
    )

}

export default LoadingPage;
