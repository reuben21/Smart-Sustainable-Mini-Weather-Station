import React, {useEffect, useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,ResponsiveContainer} from 'recharts';
import firebase from '../../config';
import './LineChart.css'
const App = (props) => {
    const [data, setData] = useState([]);
    const temperatureValue = firebase.database().ref().child('temperature') //check

    // 1. listen for a cpu event and update the state
    useEffect(() => {
        // socket.on('cpu', cpuPercent => {
        //     setData(currentData => [...currentData, cpuPercent]);
        // });
        temperatureValue.on('value', snap => {
            const valueTOSet = {
                "Temperature": parseFloat(snap.val()),
                "Date": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
            }
            setData(currentData =>
                [...currentData.slice(Math.max(currentData.length - 5, 0)), valueTOSet]
            )
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 2. render the line chart using the state
    return (
        <div id="container">
            <ResponsiveContainer  >

            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="Date" allowDecimals={true} stroke={Math.round(props.LightStatus) === 0 ? "#000000" : "#eeeeee"}/>
                <YAxis dataKey="Temperature" stroke={Math.round(props.LightStatus) === 0 ? "#000000" : "#eeeeee"} domain={[30, 35]}/>
                <Tooltip/>
                <Legend/>
                <CartesianGrid stroke={Math.round(props.LightStatus) === 0 ? "#000000" : "#eeeeee"} strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="Temperature" stroke="#8884d8"/>
            </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default App;
