import React, { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import V, { VictoryTheme, VictoryChart, VictoryScatter } from 'victory';

const Home = () => {
    const [fillerWordData, setFillerWordData] = useState(null)

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];
    return (
        <div className='homePage' style={{ height: '100vh' }}>
            <h1>Home</h1>
            <div>
                <Grid container direction="row">
                    {/* render progress */}
                    <Grid item>
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryScatter
                                style={{ data: { fill: "#6FCDB4" } }}
                                size={7}
                                data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 7 }
                                ]}
                            />
                        </VictoryChart>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Home;