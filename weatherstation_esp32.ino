#include<WiFi.h>
#include <DHT.h>
#include <FirebaseESP32.h>
#include <ArduinoJson.h>

// Include BMP180 Pressure Sensor
#include <Wire.h>
//#include <Adafruit_BMP085.h>

#include <SFE_BMP180.h>
//PIN for Temp SENSOR
#define DHTPIN 4

//PIN for Rain SENSOR
#define rainAnalog 35
int val_analogique;

//PIN for Light SENSOR
#define LIGHTSENSORDP 33

//Adafruit_BMP085 bmp;
SFE_BMP180 pressure;


#define ALTITUDE 20.0 // Altitude of SparkFun's HQ in Boulder, CO. in meters


// Set DHT type, uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11 


// Initialize DHT sensor for normal 16mhz Arduino:
DHT dht = DHT(DHTPIN, DHTTYPE);
double baseline;


#define FIREBASE_HOST "https://weatherapp-324e6.firebaseio.com/"
#define FIREBASE_AUTH "Nw16GESkrK9Lat3Jz2Y0Eh0SUy9aWDuQK1BBZPmz"
#define WIFI_SSID "reuben21"
#define WIFI_PASSWORD "reuben21"

FirebaseData firebaseData;

FirebaseJson SendTemperature;
FirebaseJson SendHumidity;
FirebaseJson SendHeatIndex;
FirebaseJson SendRainValue;
FirebaseJson SendLightValue;
FirebaseJson SendPressureValue;
FirebaseJson SendAltitudeValue;

void setup()
{
    dht.begin();
    Serial.begin(9600);
    pinMode(LIGHTSENSORDP, INPUT);
    // Set WiFi to station mode and disconnect from an AP if it was previously connected
//    WiFi.mode(WIFI_STA);
//    WiFi.disconnect();
//    delay(100);
  // Setup sensor for BMP180 Pressure Sensor:
//  if (!bmp.begin()) {
//  Serial.println("Could not find a valid BMP085/BMP180 sensor, check wiring!");
//  while (1) {}
//  }
  if (pressure.begin()){
    Serial.println("BMP180 init success");
  }
  else
  {
    Serial.println("BMP180 init fail\n\n");
    while(1); // Pause forever.
  }
  baseline = readPressure();
    Serial.println("Setup done");

 WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

 
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
 
  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "tiny");
 
  /*
  This option allows get and delete functions (PUT and DELETE HTTP requests) works for device connected behind the
  Firewall that allows only GET and POST requests.
  
  Firebase.enableClassicRequest(firebaseData, true);
  */
 
  //String path = "/data";
  
 
  Serial.println("------------------------------------");
  Serial.println("Connected...");

}

void loop()
{
    Serial.println("scan start");

//    // WiFi.scanNetworks will return the number of networks found
//    int n = WiFi.scanNetworks();
//    Serial.println("scan done");
//    if (n == 0) {
//        Serial.println("no networks found");
//    } else {
//        Serial.print(n);
//        Serial.println(" networks found");
//        for (int i = 0; i < n; ++i) {
//            // Print SSID and RSSI for each network found
//            Serial.print(i + 1);
//            Serial.print(": ");
//            Serial.print(WiFi.SSID(i));
//            Serial.print(" (");
//            Serial.print(WiFi.RSSI(i));
//            Serial.print(")");
//            Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN)?" ":"*");
//            delay(10);
//        }
//    }
//    Serial.println("");
//
//    // Wait a bit before scanning again
//    delay(5000);
  float temp_value = get_Temp();
  float humidity_value = get_Humidity();
  float heat_index = get_HeatIndex();
  float rain_sensor_value = get_Rain_Sensor();
  unsigned int ligt_sensor_value = get_light_sensor();
  double altitude_value = get_altitude();
  double pressure_value = get_pressure();
  Serial.println("Temperature: "+String(temp_value) +" C");
  Serial.println("Humidity : "+String(humidity_value)+" %");
  Serial.println("Heat Index : "+String(heat_index)+" C");
  Serial.println("Rain Value: "+String(rain_sensor_value));
  Serial.println("Light Sensor Value: "+String(ligt_sensor_value));
  Serial.println("Altitude: "+String(altitude_value)+" meters");
  Serial.println("Pressure: "+String(pressure_value)+" Pa");
  delay(2000);
  SendTemperature.set("/temperature", String(temp_value));
  SendHumidity.set("/humidity",String( humidity_value));
  SendHeatIndex.set("/heat_index", String(heat_index));
  SendRainValue.set("/rain_value", String(rain_sensor_value));
  SendLightValue.set("/light_sensor", String(ligt_sensor_value));
  SendAltitudeValue.set("/altitude", String(altitude_value));
  SendPressureValue.set("/pressure",String(pressure_value));
  Firebase.updateNode(firebaseData,"/Sensor",SendTemperature);
  Firebase.updateNode(firebaseData,"/Sensor",SendHumidity);
  Firebase.updateNode(firebaseData,"/Sensor",SendHeatIndex);
  Firebase.updateNode(firebaseData,"/Sensor",SendRainValue);
  Firebase.updateNode(firebaseData,"/Sensor",SendLightValue);
  Firebase.updateNode(firebaseData,"/Sensor",SendAltitudeValue);
  Firebase.updateNode(firebaseData,"/Sensor",SendPressureValue);
  
}

float get_Temp(){
   // Read the humidity in %:

  float t = dht.readTemperature();
  
//  Serial.print("Temperature: ");
//  Serial.print(t);
//  Serial.print(" \xC2\xB0");
//  Serial.print("C | ");
 return t;
}
float get_Humidity(){
   // Read the humidity in %:
  float h = dht.readHumidity();

//  Serial.print("Humidity: ");
//  Serial.print(h);
//  Serial.print(" % ");
 return h;
}
float get_HeatIndex(){
   // Read the humidity in %:
  float h = dht.readHumidity();
  // Read the temperature as Celsius:
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again):
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
//    return;
  }
  
  // Compute heat index in Celsius:
  float hic = dht.computeHeatIndex(t, h, false);
//  Serial.print("Heat index: ");
//  Serial.print(hic);
//  Serial.print(" \xC2\xB0");
//  Serial.print("C | ");
return hic;
}

int get_Rain_Sensor(){
  
val_analogique=analogRead(rainAnalog); 
 Serial.print("Rain Sensor : ");
 Serial.println(val_analogique); 
 Serial.println("");
return val_analogique;
}


unsigned int get_light_sensor(){
  // Light Detection Sensor Module
unsigned int ldrsensor;

ldrsensor = digitalRead(LIGHTSENSORDP);

return ldrsensor;

}

//double get_pressure(){
//  Serial.println("Pressure "+String(bmp.readPressure()));
//
//}
//
//double get_sea_level_pressure(){
//Serial.println("Sea Level Pressure "+String(bmp.readSealevelPressure()));
//
//}
//double get_altitude(){
//  Serial.print("Altitude "+String(bmp.readAltitude()));
//
//}

double get_pressure(){
  char status;
  double T,P,p0,a;
  
  status = pressure.startTemperature();
  if (status != 0)
  {
    // Wait for the measurement to complete:
    delay(status);


    status = pressure.getTemperature(T);
    if (status != 0)
    {
  

      status = pressure.startPressure(3);
      if (status != 0)
      {
        // Wait for the measurement to complete:
        delay(status);

        status = pressure.getPressure(P,T);
        if (status != 0)
        {
          // Print out the measurement:
//          Serial.print("absolute pressure: ");
//          Serial.print(P,2);
//          Serial.print(" mb, ");
//          Serial.print(P*0.0295333727,2);
//          Serial.println(" inHg");

          p0 = pressure.sealevel(P,ALTITUDE); // we're at 1655 meters (Boulder, CO)

          a = pressure.altitude(P,p0);
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");

  return P * 0.000986923;

}
double get_altitude(){
   double a, P;
  P = readPressure();
  a = pressure.altitude(P, baseline);
  Serial.print("relative altitude: ");
  if (a >= 0.0) Serial.print(" ");
  Serial.print(a, 1);
  Serial.println(" meters, ");
  delay(500);
  return a;
}

double readPressure()
{
  char status;
  double T, P, p0, a;
  status = pressure.startTemperature();
  if (status != 0)
  {
    delay(status);
    status = pressure.getTemperature(T);
    if (status != 0)
    {
      status = pressure.startPressure(3);
      if (status != 0)
      {
        delay(status);
        status = pressure.getPressure(P, T);
        if (status != 0)
        {
          return (P);
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");
}
