//SD Card Libaries
#include <SD.h>
#include <SPI.h>

//GPS Libaries
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <ezButton.h>

//Timezone Adjustments
const int timezone_hours = 10;
const int timezone_minutes = 0;

//Time values
int hour;
int minute;
int second;

//GPS RXD -> Uno TX. GPS TXD -> Uno RX
static const int RXPin = 7, TXPin = 3;

static const uint32_t GPSBaud = 9600;

// The TinyGPSPlus object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

ezButton limitSwitch(8);
int buttonValue;
int gpsSeconds;
int gpsMinutes;
int gpsHours;
int gpsCentisecond;
File file;



 
 void setup() {
  Serial.begin(9600);
  limitSwitch.setDebounceTime(75); 
  ss.begin(GPSBaud);
  
  while (!Serial){
      ;
    }
  Serial.print("Initialising SD Card...");

  if(!SD.begin(4)){
    Serial.println("initialising failed");
    while(1);
  }

  Serial.println("init done");

  if(SD.exists("ouch.txt")){
    Serial.println("ouch.txt exists.");
  }else{
    Serial.println("ouch.txt doesn't exist."); 
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  limitSwitch.loop();
  int state = limitSwitch.getState();
  
  while (ss.available() > 0){
    if (gps.encode(ss.read()))
    {
      if(state == HIGH)
      {
        Serial.println("BUTTON PRESSED");
        writeToSD();
        delay(200);
      }
    }
  }
  
}

void buttonCheck(){
  if(limitSwitch.isReleased())
  {
    
  }
}

void writeToSD(){
  file = SD.open("ouch.txt", FILE_WRITE);
  file.print ("Button Pressed! ");
  file.print("Location: "); 
  if (gps.location.isValid())
  {
    file.print(gps.location.lat(), 6);
    file.print(",");
    file.print(gps.location.lng(), 6);
  }
  else
  {
    file.print("INVALID");
  }

  file.print("  Date/Time: ");
  if (gps.date.isValid())
  {
    file.print(gps.date.month());
    file.print("/");
    file.print(gps.date.day());
    file.print("/");
    file.print(gps.date.year());
  }
  else
  {
    file.print("INVALID");
  }

  file.print(" ");
  if (gps.time.isValid())
  {
    timeZoneAdjustment();
    
    if (hour < 10) file.print("0");
    file.print(hour);
    file.print(":");
    if (gps.time.minute() < 10) file.print("0");
    file.print(gps.time.minute());
    file.print(":");
    if (gps.time.second() < 10) file.print("0");
    file.print(gps.time.second());
    file.print(".");
    if (gps.time.centisecond() < 10) file.print("0");
    file.print(gps.time.centisecond());
  }
  else
  {
    file.print("INVALID");
  }

  file.println();
 
  Serial.println("Writing to SD card successful");
  file.close();
  displayInfo();
}

void timeZoneAdjustment()
{
  hour = gps.time.hour();
  minute = gps.time.minute();
  second = gps.time.second();

  hour = hour + timezone_hours;
  if(hour >= 24){
    hour = hour - 24;
  }
}

void displayInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    timeZoneAdjustment();
    if (hour < 10) Serial.print(F("0"));
    Serial.print(hour);
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}