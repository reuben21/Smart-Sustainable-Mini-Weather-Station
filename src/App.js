import logo from './logo.svg';
import './App.module.css';
import React, {Component} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from "./Components/Navbar/Navbar";
import firebase from "./config";
import GridItem from './Components/GridItem/GridItem';
import thermometer from './Components/assets/thermometer.png';
import droplet from './Components/assets/droplet.png';
import sun_icon from './Components/assets/sun.png';
import mountain from './Components/assets/altitude.png';
import pressure from './Components/assets/pressure.png';
import cloud from './Components/assets/cloud.png';
import cloud_rain from './Components/assets/cloud with rain.png';
import cloud_rain_thunder from './Components/assets/cloud with rain and thunder.png';

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

    state = {
        altitude: "-0.20",
        heat_index: "34.04",
        humidity: "55.00",
        light_sensor: "1",
        pressure: "1.00",
        rain_value: "4095.00",
        temperature: "31.20",
        uv_intensity: "-0.76"
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
                temperature: snap.val()
            })
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
            this.setState({
                uv_intensity: snap.val()
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
                console.log("This Rain", Math.round(this.state.rain_value))
                return <GridItem image_icon={cloud} SensorText={"Dry"} sensor_value={Math.round(this.state.rain_value)}
                                 suffix={"V"}/>


            } else if (Math.round(this.state.rain_value) < 2900 && Math.round(this.state.rain_value) > 2000) {

                return <GridItem image_icon={cloud_rain} SensorText={"Raining"}
                                 sensor_value={Math.round(this.state.rain_value)}
                                 suffix={"V"}/>
            } else if (Math.round(this.state.rain_value) < 2000 && Math.round(this.state.rain_value) > 0) {

                return <GridItem image_icon={cloud_rain_thunder} SensorText={"Raining"}
                                 sensor_value={Math.round(this.state.rain_value)}
                                 suffix={"V"}/>
            }

        }
        const {classes} = this.props;
        return (
            <>
                <Navbar LightStatus={this.state.light_sensor}/>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: "30px auto",

                }}>
                    <Grid container spacing={3}
                          style={{
                              display: "block",
                              marginTop: "20px",
                              width: "350px"
                          }}>

                        <GridItem image_icon={thermometer} SensorText={"Temperature"}
                                  sensor_value={this.state.temperature} suffix={"°C"}/>

                        <GridItem image_icon={droplet} SensorText={"Humidity"}
                                  sensor_value={Math.round(this.state.humidity)}
                                  suffix={"%"}/>

                        <GridItem image_icon={sun_icon} SensorText={"UV Index"} sensor_value={this.state.uv_intensity}
                                  suffix={"mW/cm²"}/>

                        <GridItem image_icon={mountain} SensorText={"Altitude"} sensor_value={this.state.altitude}
                                  suffix={"m"}/>

                        <GridItem image_icon={pressure} SensorText={"Pressure"} sensor_value={this.state.pressure}
                                  suffix={"Pa"}/>
                        {rainStatus()}

                    </Grid>
                </div>
            </>

        );
    }


}

export default withStyles(useStyles)(App);
