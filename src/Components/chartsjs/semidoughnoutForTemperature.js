// import React, {Component} from "react";
// import { Line } from "react-chartjs-2";
// // import "chartjs-plugin-streaming";
import ChartTempCss from './semidoughnutTemperature.module.css';

import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
// var createReactClass = require("create-react-class");




const DoughnutJs = (props) => {
    // displayName: "LineExample",

    const data = {
        datasets: [
            {
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                lineTension: 0,
                borderDash: [8, 4],
                data: []
            }
        ]
    };

    const options = {
        title: {
            display: true,
            text: "Temperature"
        },
        scales: {
            xAxes: [
                {
                    type: "realtime",
                    realtime: {
                        onRefresh: function () {
                            data.datasets[0].data.push({
                                x: Date.now(),
                                y: Math.random() * 10000
                            });
                        },
                        delay: 10000
                    }
                }
            ],
            yAxes: [
                {
                    display: true
                }
            ]
        }
    };

    return (
        <div className={ChartTempCss.chart_width}>
            <Line data={data} options={options} />
        </div>
    );
};

export default DoughnutJs;



