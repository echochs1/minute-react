import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fbGetRecording } from "../../../service/firebase/fbConfig";
import { Space, Spin, Select } from "antd";
import Typewriter from "typewriter-effect";
import {
  parseDisfluencies,
  redHighlight,
} from "../../../service/recording/fillerWordDetect";
import { grammarCheck, underlineErrors } from "../../../service/recording/grammarCheck";

const Finished = () => {
  const { Option } = Select;
  const location = useLocation();
  const history = useNavigate();
  const [recordingData, setRecordingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOpt, setSelectedOpt] = useState(0);
  const [grammarTrans, setGrammarTrans] = useState(null);

  useEffect(() => {
    // setRecordingData({name: location.state.name, prompt: location.state.prompt, transcript: location.state.transcript, url:fbGetUrl(location.state.name)});
    setRecordingData(fbGetRecording(location.state.name));
    setTimeout(() => {
      setIsLoading(false);
      // setTimeout(() => {
      //   setGrammar(recordingData.transcript);
      // }, 10000);
    }, 5000); // sleep for 5 seconds before fetching the recoding to ensure url has been uploaded
  }, []);

  const handleHomeClick = () => {
    history("/app/record");
  };

  const handleRecordClick = () => {
    // emotion();
    history("/one-min");
  };

  const setGrammar = (transcript) => {
    grammarCheck(transcript)
    .then(function(response) {
      setGrammarTrans(underlineErrors(transcript, response.data));
    });
  }

//   const emotion = () => {
//     const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2022-04-07',
//   authenticator: new IamAuthenticator({
//     apikey: process.env.REACT_APP_IBM_NATURAL_LANGUAGE_API_KEY,
//   }),
//   serviceUrl: "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com",
// });

// const analyzeParams = {
//   'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
//   'features': {
//     'emotion': {
//       'targets': [
//         'apples',
//         'oranges'
//       ]
//     }
//   }
// };

  // naturalLanguageUnderstanding.analyze(analyzeParams)
  //   .then(analysisResults => {
  //     console.log(JSON.stringify(analysisResults, null, 2));
  //   })
  //   .catch(err => {
  //     console.log('error:', err);
  //   });
  //   }

  const handleTextChange = (value) => {
    setSelectedOpt(value);
  }

  const renderResults = () => {
    console.log(isLoading);
    if (!isLoading && recordingData) {
      return (
        <div className="finishedResults">
          <div className="finishedResults-title">
            <h1>Results</h1>
          </div>
          <div className="finishedResults-textWrapper">
            <span className="finishedResults-textContent">
              <b>Topic:</b> {recordingData.prompt}
            </span>
          </div>
          <hr
            className="recordingLine"
            size="2px"
            width="100%"
            color="#BBD2E7"
          ></hr>
          <Select defaultValue="0" style={{ width: 120 }} onChange={handleTextChange}>
            <Option value="0">Filler Words</Option>
            <Option value="1">Grammar</Option>
          </Select>
          
          <div className="finishedResults-textWrapper">
            <span className="finishedResults-textContent">
              <b>Text:</b> {redHighlight(recordingData.transcript)}
            </span>
          </div>
          {/* <div className="finishedResults-textWrapper">
            <span className="finishedResults-textContent">
              <b>Text:</b> {setGrammar(recordingData.transcript)}
            </span>
          </div> */}

          <hr
            className="recordingLine"
            size="2px"
            width="100%"
            color="#BBD2E7"
          ></hr>
          {recordingData.url && (
            <audio controls>
              <source src={recordingData.url} type="audio/mpeg" />
            </audio>
          )}
          <Space size="large" style={{ marginTop: "20px" }} />

          <div className="finishedPage">
            <button
              className="finishedPage-button finishedPage-button-1"
              onClick={handleRecordClick}
            >
              <span className="button-small-text">Generate another prompt</span>
            </button>
            <button
              className="finishedPage-button finishedPage-button-2"
              onClick={handleHomeClick}
            >
              <span className="button-small-text">Return to app</span>
            </button>
          </div>

          {/* <div>
                        <h3>{typeof(recordingData.transcript)}</h3>
                        <h3>{parseDisfluencies(recordingData.transcript).stringSplit}</h3>
                        <h3>{redHighlight(recordingData.transcript)}</h3>
                    </div> */}
        </div>
      );
    } else {
      return (
        <div className="loadingResults" style={{backgroundColor: '#2a5278'}}>
          <h1 className="question-prompt">
            <Typewriter
              options={{
                strings: [
                  "Getting your audio file...",
                  "Building your recording...",
                  "Writing your transcription...",
                  "Analyzing the data...",
                  "Finding those filler words...",
                ],
                autoStart: true,
                loop: true,
                color: "#fff",
                delay: 75,
              }}
            />
          </h1>
        </div>
      );
    }
  };

  return <div>{renderResults()}</div>;
};

export default Finished;
