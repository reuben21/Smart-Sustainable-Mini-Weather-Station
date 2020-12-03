import React, {Component} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Navbar from "./Components/Navbar/Navbar";
import firebase from "./config";
import pressure from './Components/assets/pressure.png';
import cloud from './Components/assets/cloud.png';
import cloud_rain from './Components/assets/cloud with rain.png';
import cloud_rain_thunder from './Components/assets/cloud with rain and thunder.png';
import GridCard from './Components/GridItem/GridCard';
import AppCss from './App.module.css';
import Thermometer from "react-thermometer-component";
import DoughnutJSHumidity from './Components/chartsjs/semidoughnoutForHumidity';
import DoughnutUVIndex from './Components/chartsjs/semidoughnoutForUVIndex';
import droplet from './Components/assets/droplet.png';
import sun from './Components/assets/sun.png';
import mountain from './Components/assets/altitude.png';
import './App.css'

// import all the styles
import "react-rain-animation/lib/style.css";
import LineChart from "./Components/recharts/LineChart";


const initVal = 25;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numDrops: initVal,
            knobValue: initVal
        };
    }

    state = {
        altitude: "-0.20",
        heat_index: "34.04",
        humidity: "55.00",
        light_sensor: "1",
        pressure: "1.00",
        rain_value: "4095.00",
        temperature: "31.20",
        uv_intensity: "-0.76",
        numDrops:200

    }

    // Initialize Firebase


    componentDidMount() {


        // fetch("https://weatherapp-37431.firebaseio.com")
        this.temperatureValue = firebase.database().ref().child('temperature') //check
        this.humidityValue = firebase.database().ref().child('humidity') //check
        this.heat_indexValue = firebase.database().ref().child('heat_index')
        this.light_sensorValue = firebase.database().ref().child('light_sensor')
        this.pressureValue = firebase.database().ref().child('pressure') //check
        this.rain_valueValue = firebase.database().ref().child('rain_value') //check
        this.uv_intensityValue = firebase.database().ref().child('uv_intensity') //check
        this.altitudeValue = firebase.database().ref().child('altitude') //check


        this.temperatureValue.on('value', snap => {

            this.setState({
                temperature: snap.val(),
            });


        });

        this.humidityValue.on('value', snap => {
            this.setState({
                humidity: snap.val()
            })
        })
        this.heat_indexValue.on('value', snap => {
            this.setState({
                heat_index: snap.val()
            })
        })
        this.light_sensorValue.on('value', snap => {
            this.setState({
                light_sensor: snap.val()
            })
        })
        this.pressureValue.on('value', snap => {
            this.setState({
                pressure: snap.val()
            })
        })
        this.rain_valueValue.on('value', snap => {
            this.setState({
                rain_value: snap.val()
            })
        })
        this.uv_intensityValue.on('value', snap => {
            var uv_intensity = parseFloat(snap.val())
            var uv_index = Math.abs((uv_intensity / 25) * 100).toFixed(2);
            this.setState({
                uv_intensity: uv_index
            })
        })

        this.altitudeValue.on('value', snap => {
            this.setState({
                altitude: snap.val()
            })
        })
    }


    render() {

        const rainStatus = () => {
            if (Math.round(this.state.rain_value) > 4000) {

                return <>
                    <div className={AppCss.RainImage}>
                        <img src={cloud} width={150} alt={"Erro"}/>
                    </div>
                    <div className={AppCss.RainText}>
                        <h2>Cloudy</h2>
                    </div>
                    <div className={AppCss.RainVolts}>
                        <h2> {Math.round(this.state.rain_value) + " V"} </h2>
                    </div>
                </>


            } else if (Math.round(this.state.rain_value) < 2900 && Math.round(this.state.rain_value) > 2000) {

                return <>
                    <div className={AppCss.RainImage}>
                        <img src={cloud_rain} width={150} alt={"Erro"}/>
                    </div>
                    <div className={AppCss.RainText}>
                        <h2>Raining</h2>
                    </div>
                    <div className={AppCss.RainVolts}>
                        <h2> {Math.round(this.state.rain_value) + " V"} </h2>
                    </div>
                </>
            } else if (Math.round(this.state.rain_value) < 2000 && Math.round(this.state.rain_value) > 0) {

                return <>
                    <div className={AppCss.RainImage}>
                        <img src={cloud_rain_thunder} width={150} alt={"Erro"}/>
                    </div>
                    <div className={AppCss.RainText}>
                        <h1>Raining and Thundering</h1>
                    </div>
                    <div className={AppCss.RainVolts}>
                        <h1> {Math.round(this.state.rain_value) + " V"} </h1>
                    </div>
                </>
            }

        }


        return (
            <>



                <div
                    className={Math.round(this.state.light_sensor) === 1 ? "background_div_for_Color_Night" : "background_div_for_Color_Day"}

                >
                    <Navbar LightStatus={this.state.light_sensor}
                    />
                    <div className={AppCss.grid_container}>
                        <div className={AppCss.TempVal}>
                            <div className={AppCss.ThermometerComponent}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignContent: "center",
                                    paddingTop: "20px",

                                }}>

                                    <Thermometer

                                        theme={(Math.round(this.state.light_sensor) === 1 ? 'dark' : 'light')}
                                        value={this.state.temperature}
                                        max="100"
                                        steps="5"
                                        format="°C"
                                        size="large"
                                        height="300"
                                    />
                                </div>

                            </div>
                            <div className={AppCss.TempDetails}>
                                <div className={AppCss.FeelsLike}>
                                    <h3>Feels Like {this.state.heat_index + "°C"}</h3>
                                </div>
                                <div className={AppCss.TempNo}>
                                    <h1 style={{
                                        fontSize: "50px"
                                    }}>
                                        {this.state.temperature + "°C"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className={AppCss.TempGraph}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignContent: "center",
                                paddingTop: "20px"
                            }}>
                                <LineChart  LightStatus={this.state.light_sensor}/>
                            </div>

                        </div>
                        <div className={AppCss.HumidityGrid}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignContent: "center",
                                paddingTop: "20px",

                            }}>
                                <DoughnutJSHumidity ImageForView={droplet}
                                                    HumidityValue={Math.round(this.state.humidity)}/>
                            </div>


                        </div>
                        <div className={AppCss.UVIndexGrid}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignContent: "center",
                                paddingTop: "20px",

                            }}>

                                <DoughnutUVIndex ImageForView={sun}
                                                 HumidityValue={Math.round(this.state.uv_intensity)}/>
                            </div>
                        </div>
                        <div className={AppCss.Rain}>

                            {rainStatus()}


                        </div>
                        <div className={AppCss.Altitude}>
                            <GridCard image_icon={mountain} SensorText={"Altitude"}
                                      sensor_value={this.state.altitude}
                                      suffix={"m"}/>
                        </div>
                        <div className={AppCss.Pressure}>
                            <GridCard image_icon={pressure} SensorText={"Pressure"}
                                      sensor_value={this.state.pressure}
                                      suffix={"Pa"}/>
                        </div>
                    </div>

                </div>


            </>

        );
    }


}

export default withStyles(useStyles)(App);
