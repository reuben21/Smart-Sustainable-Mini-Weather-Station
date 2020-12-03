import React, {useEffect, useState} from 'react';
import {ResponsiveContainer, Pie, PieChart, Tooltip} from 'recharts';
import firebase from '../../config';
import './LineChart.css'
const App = ({props}) => {
    const [data, setData] = useState([]);
    const temperatureValue = firebase.database().ref().child('temperature') //check

    const data02 = [
        {
            name: "UV Index",
            value: 2400,
            fill:"#C09923"
        },
        {
            name: "",
            value: 4567,
            fill:"#eee"
        },

    ];

    // 1. listen for a cpu event and update the state
    // useEffect(() => {
    //     // socket.on('cpu', cpuPercent => {
    //     //     setData(currentData => [...currentData, cpuPercent]);
    //     // });
    //     temperatureValue.on('value', snap => {
    //         const valueTOSet = {
    //             "Temperature": parseFloat(snap.val()),
    //             "Date": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    //         }
    //         setData(currentData =>
    //             [...currentData.slice(Math.max(currentData.length - 5, 0)), valueTOSet]
    //         )
    //     });
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // 2. render the line chart using the state
    return (
        <div id="dcontainer">
            <ResponsiveContainer  >

                <PieChart >
                    <Pie data={data02} dataKey="value"
                         nameKey="name" cx="50%" cy="50%"
                         isAnimationActive={true}
                         animationBegin={400}
                         animationDuration={2000}
                         animationEasing={"ease-out"}
                         startAngle={180}
                         endAngle={0}
                         innerRadius={150}
                         outerRadius={190}
                         fill="#82ca9d"
                         />
                        <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default App;
