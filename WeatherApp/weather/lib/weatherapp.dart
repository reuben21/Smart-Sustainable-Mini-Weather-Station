import 'package:flutter/material.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:charcode/ascii.dart';
// import 'package:firebase_core/firebase_core.dart';

class WeatherData extends StatefulWidget {
  @override
  _WeatherDataState createState() => _WeatherDataState();
}

class _WeatherDataState extends State<WeatherData> {
  // const int $deg = 0x00B0;
  String _altitude = "0";
  String _heatindex = "0";
  String _humidity = "0";
  String _lightsensor = "0";
  String _pressure = "0";
  String _rainvalue = "0";
  String _temp = "0";
  String _uv = "0";
  readDataAltitude() {
    db.once().then((DataSnapshot snapshot) {
      setState(() {
        _altitude = (snapshot.value);
        print(_altitude);
      });
    });
  }

  readDataHeatIndex() {
    dbheatindex.once().then((DataSnapshot snapshot) {
      setState(() {
        _humidity = (snapshot.value);
        print(_humidity);
      });
    });
  }

  readDataHumidity() {
    dbhumidity.once().then((DataSnapshot snapshot) {
      setState(() {
        _heatindex = (snapshot.value);
        print(_heatindex);
      });
    });
  }

  readLightsensor() {
    dblightsensor.once().then((DataSnapshot snapshot) {
      setState(() {
        _lightsensor = (snapshot.value);
        print(_lightsensor);
      });
    });
  }

  readPressure() {
    dbpressure.once().then((DataSnapshot snapshot) {
      setState(() {
        _pressure = (snapshot.value);
        print(_pressure);
      });
    });
  }

  readRain() {
    dbrainvalue.once().then((DataSnapshot snapshot) {
      setState(() {
        _rainvalue = (snapshot.value);
        print(_rainvalue);
      });
    });
  }

  readTemprature() {
    dbtempreature.once().then((DataSnapshot snapshot) {
      setState(() {
        _temp = (snapshot.value);
        print(_temp);
      });
    });
  }

  readUVsensor() {
    dbuv.once().then((DataSnapshot snapshot) {
      setState(() {
        _uv = (snapshot.value);
        print(_uv);
      });
    });
  }

  final db = FirebaseDatabase.instance.reference().child("altitude");
  final dbheatindex = FirebaseDatabase.instance.reference().child("heat_index");
  final dbhumidity = FirebaseDatabase.instance.reference().child("humidity");
  final dblightsensor =
      FirebaseDatabase.instance.reference().child("light_sensor");
  final dbpressure = FirebaseDatabase.instance.reference().child("pressure");
  final dbrainvalue = FirebaseDatabase.instance.reference().child("rain_value");
  final dbtempreature =
      FirebaseDatabase.instance.reference().child("temperature");
  final dbuv = FirebaseDatabase.instance.reference().child("uv_intensity");
  @override
  Widget build(BuildContext context) {
    readDataAltitude();
    readDataHeatIndex();
    readDataHumidity();
    readLightsensor();
    readPressure();
    readRain();
    readTemprature();
    readUVsensor();
    void initState() {
      super.initState();
    }

    return Scaffold(
      body: Container(
        color: Colors.grey[100],
        // readData();
        child: Column(
          children: <Widget>[
            SafeArea(
              child: Container(
                height: 230,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    // Where the linear gradient begins and ends
                    begin: Alignment.topRight,
                    end: Alignment.bottomLeft,
                    // Add one stop for each color. Stops should increase from 0 to 1
                    stops: [0.1, 0.5, 0.7, 0.9],
                    colors: [
                      // Colors are easy thanks to Flutter's Colors class.
                      Colors.blue[900],
                      Colors.blue[800],
                      Colors.blue[700],
                      Colors.blue[500],
                    ],
                  ),
                  borderRadius: BorderRadius.only(
                    bottomRight: Radius.circular(40),
                    bottomLeft: Radius.circular(40),
                  ),
                ),
                // decoration: BoxDecoration(
                //   image: DecorationImage(
                //     fit: BoxFit.cover,
                //     colorFilter: ColorFilter.mode(
                //         Colors.black.withOpacity(0.3), BlendMode.dstATop),
                //     image: AssetImage('assets/images/weather_img.jpg'),
                //   ),
                //   borderRadius: BorderRadius.only(
                //     bottomRight: Radius.circular(40),
                //     bottomLeft: Radius.circular(40),
                //   ),
                // ),
                child: Stack(
                  children: <Widget>[
                    Positioned(
                      left: 120,
                      top: 80,
                      width: 150,
                      height: 200,
                      child: Text(
                        'Temperature',
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ),
                    Positioned(
                      left: 20,
                      top: 40,
                      width: 70,
                      height: 200,
                      child: Container(
                          child: Image(
                        image: AssetImage('assets/images/cloudy.png'),
                      )),
                    ),
                    Positioned(
                      left: 120,
                      top: 100,
                      width: 300,
                      height: 200,
                      child: Container(
                        child: Text(
                          _temp + " \u2103" ?? '0.0 \u2103',
                          style: TextStyle(
                            fontSize: 45.0,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/rainy.png'),
                      ),
                      Text(_rainvalue + " V" ?? '0 V',
                          style: TextStyle(
                            fontSize: 25,
                          )),
                      Text('Rain')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/humidity.png'),
                      ),
                      Text(_humidity + " %" ?? '0.0 %',
                          style: TextStyle(
                            fontSize: 25,
                          )),
                      Text('humidity')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/gauge.png'),
                      ),
                      Text(_pressure + " Pa" ?? '0.0 Pa',
                          style: TextStyle(
                            fontSize: 25,
                          )),
                      Text('Pressure')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/uv-protection.png'),
                      ),
                      Text(_uv + " " ?? '0.0',
                          style: TextStyle(
                            fontSize: 30,
                          )),
                      Text('UV index')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/exposure.png'),
                      ),
                      Text(_lightsensor + " V" ?? '0 Vsssss',
                          style: TextStyle(
                            fontSize: 25,
                          )),
                      Text('Light')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.symmetric(vertical: 20),
                  height: 150,
                  width: 150,
                  child: Center(
                      child: Container(
                          child: Column(
                    children: <Widget>[
                      Image(
                        height: 80,
                        image: AssetImage('assets/images/heat.png'),
                      ),
                      Text(_heatindex + " \u2109" ?? '0.0 \u2109',
                          style: TextStyle(
                            fontSize: 25,
                          )),
                      Text('heat index')
                    ],
                  ))),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.blue.withOpacity(0.2),
                        spreadRadius: 6,
                        blurRadius: 0,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                ),
              ],
            ),
            // Text(_altitude ?? 'altitude'),
            // Text(_heatindex ?? 'heatindex'),
            // Text(_humidity ?? 'humidity'),
            // Text(_lightsensor ?? 'lightsensor'),
            // Text(_rainvalue ?? 'rain'),
            // Text(_uv ?? 'UV'),
          ],
        ),
      ),
    );
  }
}
