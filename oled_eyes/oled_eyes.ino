#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display1(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1); // Display 1, I2C address 0x3C
Adafruit_SSD1306 display2(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1); // Display 2, I2C address 0x3D

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  if (!display1.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Display 1 allocation failed"));
    while (1);
  }

  if (!display2.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
    Serial.println(F("Display 2 allocation failed"));
    while (1);
  }

}

void loop() {
  free_eyes();
  //look_around_eyes();
}

void free_eyes(int x0,int y0,int x1, int y1,int radius,bool display){
  if(display){
    display1.clearDisplay();
    display1.fillRoundRect(x0, y0, x1, y1, radius, WHITE);
    display1.setCursor(0, 0);
    display1.display();
  }
  else{
    display2.clearDisplay();
    display2.fillRoundRect(x0, y0, x1, y1, radius, WHITE);
    display2.setCursor(0, 0);
    display2.display();
  }
}

void free_eyes(){
  free_eyes(30, 10, 64, 48, 8,0);
  free_eyes(30, 10, 64, 48, 8,1);
  delay(4000);

  free_eyes(25, 20, 64, 30, 8,0);
  free_eyes(25, 20, 64, 30, 8,1);

  free_eyes(30, 20, 64, 0, 8,0);
  free_eyes(30, 20, 64, 0, 8,1);

  free_eyes(25, 20, 64, 30, 8,0);
  free_eyes(25, 20, 64, 30, 8,1);
}

void look_around_eyes() {
}


