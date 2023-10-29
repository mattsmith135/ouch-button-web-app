// SD Card Libaries
#include <SD.h>
#include <SPI.h>

// GPS Libaries
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
#include <ezButton.h>

// Timezone Adjustments
const int timezone_hours = 10;
const int timezone_minutes = 0;

// Time values
int hour;
int minute;
int second;
int centisecond;

//GPS Value Save
String dayValue = "";
String monthValue= "";
String yearValue = "";

float latValue;
float lngValue;

// Button ID
const int buttonID = 1;

// GPS RXD -> Uno TX. GPS TXD -> Uno RX
static const int RXPin = 7, TXPin = 3;

static const uint32_t GPSBaud = 9600;

// The TinyGPSPlus object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

// Chip select
const int chipSelect = 4;

// Status Lights
const int redLightPin = 6;
const int yellowLightPin = 9;
const int greenLightPin = 10;

// Button Status Warnings
bool isSDCardFail = false;
bool isGPSFail = false;

// Big Button Config
ezButton limitSwitch(5);

// General Variables
int buttonValue;
File file;
bool buttonState = LOW;


 void setup() {
  // Led status indicator setup
  pinMode(redLightPin, OUTPUT);
  pinMode(yellowLightPin, OUTPUT);
  pinMode(greenLightPin, OUTPUT);
  
  digitalWrite(redLightPin, LOW);
  digitalWrite(yellowLightPin, LOW);
  digitalWrite(greenLightPin, LOW);

  Serial.begin(9600);
  limitSwitch.setDebounceTime(75); 
  ss.begin(GPSBaud);
  while (!Serial){
      ;
    }
  Serial.print("Initialising SD Card...");
  if(!SD.begin(chipSelect)){
    Serial.println("initialising failed");
    isSDCardFail = true;
    digitalWrite(redLightPin, HIGH);
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
  bool currentState = limitSwitch.getState();

  // GPS Moduel fail check
  if(ss.available() > 0)
  {
    captureGPSData();
  }

  if (currentState != buttonState) {
    if(currentState == HIGH)
    {
      Serial.println("Button Pressed");
      writeToSD();
    }
    buttonState = currentState;
  } 
}

void writeToSD(){
  isGPSFail = false;
  file = SD.open("ouch.txt", FILE_WRITE);
  isSDCardFail = false;
  
  // Check to see the file has been successfully opened
  if(!file)
  {
    isSDCardFail = true;
    statusLightDisplay();
  }
  
  file.print("Button ID: ");
  file.print(buttonID);
  file.print(" Location: "); 
  if (gps.location.isValid())
  {
    file.print(latValue, 6);
    file.print(",");
    file.print(lngValue, 6);
  }
  else
  {
    file.print("INVALID");
    isGPSFail = true;
  }
  file.print("  Date/Time: ");
  if (gps.date.isValid())
  {
    file.print(monthValue);
    file.print("/");
    file.print(dayValue);
    file.print("/");
    file.print(yearValue);
  }
  else
  {
    file.print("INVALID");
    isGPSFail = true;
  }
  file.print(" ");
  if (gps.time.isValid())
  {
    timeZoneAdjustment();

    if (hour < 10) file.print("0");
    file.print(hour);
    file.print(":");
    if (minute < 10) file.print("0");
    file.print(minute);
    file.print(":");
    if (second < 10) file.print("0");
    file.print(second);
    file.print(".");
    if (centisecond < 10) file.print("0");
    file.print(centisecond);
  }
  else
  {
    file.print("INVALID");
    isGPSFail = true;
  }
  file.println();
 
  Serial.println("Writing to SD card successful");
  file.close();
  statusLightDisplay();
  displayInfo();
}

void captureGPSData()
{
  if (gps.encode(ss.read()))
  {
    if (gps.date.isValid())
    {
      if (gps.date.isUpdated())
      {
        Serial.println("GPS data updated");
        monthValue = String(gps.date.month());
        dayValue = String(gps.date.day());
        yearValue = String(gps.date.year());

      }
    }
    if (gps.time.isValid())
    {
      if (gps.time.isUpdated())
      {
        hour = gps.time.hour();
        minute = gps.time.minute();
        second = gps.time.second();
        centisecond = gps.time.centisecond();
      }
    }
    if (gps.location.isValid())
    {
      if (gps.location.isUpdated())
      {
        latValue = gps.location.lat();
        lngValue = gps.location.lng();
       
      }
    }
  }
}

void gpsFailFilePrint()
{
  file = SD.open("ouch.txt", FILE_WRITE);
  isSDCardFail = false;
  // Check to see the file has been successfully opened
  if(!file)
  {
    isSDCardFail = true;
    statusLightDisplay();
  }
  file.print("Button ID: ");
  file.print(buttonID);
  file.print(" Location: INVALID  Date/Time: INVALID INVALID");
  statusLightDisplay();
}

void timeZoneAdjustment()
{
  hour = hour + timezone_hours;
  if(hour >= 24){
    hour = hour - 24;
  }
}

void statusLightDisplay()
{
  if(isSDCardFail == true)
  {
    digitalWrite(redLightPin, HIGH);
    delay(500);
    digitalWrite(redLightPin, LOW);
  }
  else if(isGPSFail == true)
  {
    digitalWrite(yellowLightPin, HIGH);
    delay(500);
    digitalWrite(yellowLightPin, LOW);
  }
  else
  {
    digitalWrite(greenLightPin, HIGH);
    delay(500);
    digitalWrite(greenLightPin, LOW);
  }
}


void displayInfo(){
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(latValue, 6);
    Serial.print(F(","));
    Serial.print(lngValue, 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }
  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(monthValue);
    Serial.print(F("/"));
    Serial.print(dayValue);
    Serial.print(F("/"));
    Serial.print(yearValue);
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
    if (minute < 10) Serial.print(F("0"));
    Serial.print(minute);
    Serial.print(F(":"));
    if (second < 10) Serial.print(F("0"));
    Serial.print(second);
    Serial.print(F("."));
    if (centisecond < 10) Serial.print(F("0"));
    Serial.print(centisecond);
  }
  else
  {
    Serial.print(F("INVALID"));
  }
  Serial.println();
}
