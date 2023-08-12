#include <Arduino.h>
#include <WiFi.h>
#include <gTTS.h>
#include <WiFiMulti.h>
#include <DFRobotDFPlayerMini.h> // Library for DFPlayer Mini MP3 module

// Replace with your WiFi credentials
const char* ssid = "AndroidAP";
const char* password = "blng3542";

// gTTS API key
const char* apiKey = "AIzaSyBdo6G4yRruyWR8K70LqRtSVN9Z3fvwpZg";

// DFPlayer Mini setup
SoftwareSerial mySoftwareSerial(4, 5); // RX, TX
DFRobotDFPlayerMini dfPlayer;

void setup() {
  Serial.begin(115200);
  mySoftwareSerial.begin(9600);
  
  WiFiMulti wifiMulti;
  
  // Connect to Wi-Fi
  wifiMulti.addAP(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (wifiMulti.run() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Read user input from Serial Monitor
  Serial.println("Enter the text you want to convert to speech:");
  while (!Serial.available()) {
    delay(100); // Wait for user input
  }
  String userInput = Serial.readStringUntil('\n');
  
  // Perform text-to-speech conversion
  gTTS tts(userInput.c_str(), apiKey);
  
  Serial.println("Converting text to speech...");
  if (tts.save("output.mp3")) {
    Serial.println("Text converted to speech successfully");
    
    // Play the generated MP3 file
    dfPlayer.begin(mySoftwareSerial);
    dfPlayer.playMP3("output.mp3");
  } else {
    Serial.println("Text to speech conversion failed");
  }
}

void loop() {
  // Nothing to do in the loop
}
