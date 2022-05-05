import React, { useState, useContext, useEffect } from "react";
import { moneyverse } from "../../../assets/images/moneyverse";
import { logos } from "../../../assets/images/logos/logos";
import { fbGetAllRecordings } from "../../../service/firebase/fbConfig";
import { FirebaseContext } from "../../../service/firebase/fbContext";
import { Button, Space, Spin } from "antd";
import { redHighlight, fillerWordCount } from "../../../service/recording/fillerWordDetect";
import { useNavigate } from "react-router-dom";
import { MonkeyLearn } from "monkeylearn";

/**
 *
 * @param {*} arr array of items
 * @returns random index of the array arr
 */
const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

// TODO: the ui for this page is so wack, the list of recordings is cut off and not scrollable rn
// so need to add some css
const History = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [recordings, setRecordings] = useState(null);
  const { authUser } = useContext(FirebaseContext);
  const history = useNavigate();

  useEffect(() => {
    setRecordings(fbGetAllRecordings().reverse());
  }, []);
 
  const emotion = () => {
    const ml = new MonkeyLearn(process.env.REACT_APP_MONKEY_LEARN_API_KEY);
    // let model_id = 'cl_pi3C7JiL'
    // let data = ['This is a great tool!', {text: 'The location is excellent.', external_id: 'ANY_ID'}]
    // ml.classifiers.classify(model_id, data).then(res => {
    //     console.log(res.body)
    // })

    let model_id = 'ex_YCya9nrn'
    let data = [
        "I have to say that this hotel has the worst customer support ever. It is a shame that people in management positions (who should be more respectful of their customers) are rude and have bad attitudes. They completely ruined my vacations.",
      ]
  
    ml.extractors.extract(model_id, data).then(res => {
      console.log(res)
  })
  }

  const handleHistoryResultsClick = (recording) => {
    history("/app/history/results", { state: { recordingData: recording } });
  };

  const renderHistory = () => {
    <div>{emotion()}</div>
    if (recordings) {
      return (
        <ul className="recordingsList">
          {recordings.map((recording, index) => (
            <li key={index} className="recordingItem">
              <div className="recordingContent">
                <div className="recordingImage">
                  <img
                    src={logos[randomIndex(logos)]}
                    alt="fun recording img"
                  />
                </div>
                <div className="recordingInfo">
                  {/* <h3 className="fieldName">{index+1}.</h3> */}
                  <p className="fieldValue" style={{ fontSize: "18px" }}>
                    <b>Topic: </b>
                    {recording.prompt}
                  </p>
                  <p className="fieldName">
                    <b>Transcription: </b>
                    {recording.transcript
                      ? redHighlight(recording.transcript)
                      : ""}
                    <br />
                    <b>Filler Word Count: </b>
                    {recording.transcript
                      ? fillerWordCount(recording.transcript)
                      : ""}
                  </p>
                  <audio controls>
                    <source src={recording.url} type="audio/mpeg" />
                  </audio>
                  <Button
                    className="history-item-button"
                    type="link"
                    onClick={() => handleHistoryResultsClick(recording)}
                  >
                    Show Results Page
                  </Button>
                </div>
              </div>
              <hr
                className="recordingLine"
                size="2px"
                width="100%"
                color="#BBD2E7"
              ></hr>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      );
    }
  };

  return (
    <div className="historyPage">
      <h1>History</h1>
      {/* <h3>Logged in as: {authUser.email ? authUser.email : "none"}</h3> */}
      {renderHistory()}
    </div>
  );
};

export default History;
