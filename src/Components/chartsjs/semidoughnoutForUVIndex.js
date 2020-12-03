import React, {Component} from "react";
import { Doughnut } from "react-chartjs-2";
// import "chartjs-plugin-streaming";
import ChartCss from './semidoughnut.module.css'

class DoughnutJS extends Component {
    // displayName: "LineExample",

    render() {
        const data = {

            datasets: [
                {
                    backgroundColor: ["#C09923", "#eeeeee"],
                    data: [this.props.HumidityValue,12-this.props.HumidityValue]
                }
            ],
            labels: [
                "UV Index",
                ""],
        };

        const options = {
            title: {
                display: true,
                text:`UV Index ${this.props.HumidityValue}`,
                position:'bottom',
                fontFamily:'Roboto Slab, serif',
                fontSize:20,
                lineHeight:0,
                fontColor:'black'
            },
            rotation: Math.PI,
            circumference: Math.PI,
            cutoutPercentage: 80,
            legend: {
                display: false
            },
        }
        return (
            <div className={ChartCss.chart_width}>
                <img src={this.props.ImageForView} className={ChartCss.image_position} alt={"ERROR"}/>
                <Doughnut data={data} options={options} />
            </div>
        );
    }
};

export default DoughnutJS;
