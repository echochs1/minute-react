import React, { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Card, Space, Spin } from "antd";
import V, { VictoryTheme, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from 'victory';
import { fbGetAllRecordings } from "../../../service/firebase/fbConfig";
import { redHighlight, fillerWordCount } from "../../../service/recording/fillerWordDetect";


const Home = () => {
    const [recordings, setRecordings] = useState(null);
    const [recordingsCount, setRecordingsCount] = useState(0);
    const [fillerWordData, setFillerWordData] = useState(null)
    const [maxFillerWords, setMaxFillerWords] = useState(5)


    useEffect(() => {
        processRecordings(fbGetAllRecordings().reverse());
    }, []);

    const processRecordings = (recordings) => {
        setRecordings(recordings);
        setRecordingsCount(recordings.length);
        setFillerWordCount(recordings);
    }

    const setFillerWordCount = (recordings) => {
        var data = [];
        if (recordings) {
            for (let i = 0; i < recordings.length; i++) {
                var count = fillerWordCount(recordings[i].transcript);
                data.push({ x: i + 1, y: count });
                if (count > maxFillerWords) {
                    setMaxFillerWords(count);
                }
            }
            setFillerWordData(data);
        }
        console.log(data)
    };

    return (
        <div className='homePage' style={{ height: '100vh' }}>
            <h1>Home</h1>
            <div>
                <Grid container direction="row">
                    {/* render progress */}
                    <Grid item>
                        <Card size="small" title="Filler Word Progress">
                            <VictoryChart
                                theme={VictoryTheme.material}
                            >
                                
                                <VictoryScatter
                                    style={{ data: { fill: "#6FCDB4" } }}
                                    size={7}
                                    data={fillerWordData}
                                    domain={{ x: [0, recordingsCount + 1], y: [0, maxFillerWords + 1] }}

                                />
                            </VictoryChart>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Home;