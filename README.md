Voice Management Demonstration.
https://www.youtube.com/watch?v=EcGdtz8JKoo


# intellimate - Small Robot with AI Enhancements for Human Assistance

This project aims to enhance the capabilities of a small robot with legs control using servo motors, OLED displays as eyes to react differently and display informations to the user, a speaker for react to the user as a sound or speak with user, Time Of Flight sensors for distance measurements and walk on a table without falling down, camera for object identification, and a microphone for voice input for the various tasks. The enhanced robot will be capable of assisting humans in various tasks using AI technologies such as a voice assistant for control smart home. 

<img src="https://www.pikpng.com/pngl/b/122-1221795_mini-robot-cartoon-clipart.png" width="20%">

## Functions of the intellimate.
1.  **Object Recognition and Interaction:** The robot uses its camera and TOF sensors to recognize and interact with objects on the table, allowing it to perform tasks.
    
2.  **Stable Tabletop Mobility:** Equipped with TOF sensors in its legs, the robot moves and navigates the table confidently without falling, ensuring stable mobility and preventing accidents.
    
3.  **Intuitive OLED Display Eyes:** The two OLED displays serve as expressive eyes, conveying emotions and information to users in an engaging and relatable manner.
    
4.  **Personalized Face Detection:** The camera identifies faces and greets each individual by name, creating a personalized and welcoming interaction for users and visitors. (Next step)
    
5.  **Voice-Activated Conversations:** The built-in microphone captures voice commands, enabling natural and interactive conversations with the robot for tasks, queries, and even companionship.
    
7.  **AI-Driven Responses:** Utilizing the power of Chat GPT, the robot can provide insightful and comprehensive answers to user queries, enhancing its role as an information resource.
    
9.  **Home Automation Integration:** Seamlessly connects with smart home devices, allowing users to control lights, appliances, and other compatible devices using voice commands.
    
10.  **Assistance and Convenience:** Performs various tasks, such as setting reminders, providing weather updates, and even assisting with shopping lists, enhancing daily efficiency.
***
**Functions that I implement for the semester project.**
 1. Walking on the table (don't use TOF sensors in this stage).
 2. Follow some voice commands. (Ex. Control a smart bulb)
 3. Answering human voice questions using Chatgpt api via speaker.
 4. When someone who is not in front of intellimate speaks, intellimate turns and tries to find him using object detection techniques.
 5. Bit of eye reactions implement on the oled displays.

 ***
**There are 6 main steps in the development process.**
1. Select components and develop the main hardware structure.
2. Develop robot movements, eye reactions and how use tof sensors.
3. Develop voice recognition.
4. Develop image recognition (esp32 camera).
5. Combine them all in sync and manage communications.

***
## 1. Select components & develop the main hardware  structure

   In this step select sensors, actuators, development board and other circuits for the pet_robot by considering their diamentions and compatibility with my application. Next start 3D designing parts using solidworks.
   
   <img src="pictures/devices_intellimate.jpeg" width="50%">
   
**Select components**

 - **Development boards** - When the intellimate walk on the table, he has to perform multiple tasks in parallel, such as detecting objects on the table and taking readings from TOF sensors to take the idea of the environment. 
 So I select esp32-cam and esp32 development boards. The esp32-cam module has esp32s chip which is single core chip. But the esp32 have two cores. So I can handle these tasks optimally using these 3 cores. 
 I use SPI communication protocol to communicate with each other.
 
   <img src="https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2020/03/ESP32-CAM-pinout-new.png?quality=100&strip=all&ssl=1" width="40%" >
   <img src="https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/08/ESP32-DOIT-DEVKIT-V1-Board-Pinout-36-GPIOs-updated.jpg?quality=100&strip=all&ssl=1" width="40%" >
 - **Servo motors** - use MG90S micro servos for bottom end bend. Because it
   should handle whole weight of the robot. Also use SG90 servo motors
   for other two ends.
   
 - **Display** -  Two i2c different hardware addressed 128*64 oled displays using one I2C lines.
 
 - **Distance Sensors** - Ultrasonic distance sensors size is very large. So
   it is not suitable for this. So I use time of flight sensors for this
   application which is only 3cm*2cm dimentions.
    
    <img src="https://esphome.io/_images/vl53l0x.png" width="20%" >
   
 - **Speakers** - I2S Audio Amplifier with a small size speaker.
 
 - **Microphone** -  INMP441 MEMS  Microphone Module I2S
 
   <img src="https://i0.wp.com/www.techiesms.com/wp-content/uploads/2023/07/INMP441-MEMS-High-Precision-Omnidirectional-Microphone-Module-I2S-4.jpg?fit=800%2C800&ssl=1" width="20%" >


 - **Power** - In this stage not focus on batteries. Mainly need two voltages. 3.3v for esp32 boards and 5v for servo motors.  Use a power module which can step down voltage into 3.3v and 5v.

   
**Design parts for 3D printing**

   Mainly I have design head, body, legs, foot and other small supporting parts using solidworks 2019.
   
 - head- I design head part for assemble power distribution circuit and display.    
 
 - Body - In this part include development board, two servo motors to
   control legs, speaker, tof sensors and batteries.
   
 - legs- There are two legs. I include servo motors in this leg for foot control.
 
 - foot- In the foot, there are two time of flight sensors in each feet.

***

## 2.  Develop robot movements, eye reactions and how use tof sensors. 
There are 4 servo motors to take robot movements. There is a library which is match to intellimate robot movements. So we can directly use that library for develop robot movements further more.

Use two 128*64 i2c oled displays to design eye reactions. When we use two oled displays, both of have same hardware address. So we need to change hardware address by changing backside resistor. Finally can controll two oled displays using one i2c line.

Instead of the camera, use time of flight sensors to get some idea of the environment. We use four [time of flight sensors](https://www.st.com/en/imaging-and-photonics-solutions/time-of-flight-sensors.html) to detect objects around the robot and four tof sensors (two per foot each) to detect the edges of the living table. We can't use same addressed TOF sensors in same I2C bus. Because I2C protocol use hardware address of each device. So the solution is to use an I2C 1 to 8 multiplexer for connect 8 tof sensors together.

In the final project we use two i2c buses in the same ESP32 board. Because any pins in esp32 board has I2C capabilities. Only thing is configure that in the code.
***

## 3. Research and develop voice recognition.


The voice recognition part of the project involves taking voice inputs from the user and processing them to generate answers and emotions. The voice recognition part consists of the following steps:

-   **Voice input control:** The ESP32 firmware uses the I2S protocol to receive audio data from the INMP441 microphone. The firmware stores the audio data in a buffer and writes it to the EEPROM memory. The firmware also triggers an interrupt when the buffer is full or when the user stops speaking.
-   **Voice recording upload control:** The ESP32 firmware uses the HTTP protocol to send a POST request to the backend server with the audio data as the payload. The firmware also sends a unique ID for each voice recording to identify it later.
-   **Voice to text conversion:** The backend server uses a machine learning model API to convert the audio data into text. The API takes the audio data as an input and returns a JSON response with the text as an output. The backend server parses the JSON response and extracts the text.
-   **Text to answer generation:** The backend server uses a chatgpt API to generate an answer for the text. The API takes the text as an input and returns a JSON response with the answer as an output. The backend server parses the JSON response and extracts the answer.
-   **Emotion recognition:** The backend server uses a machine learning model API to recognize the emotion of the user based on the voice recording context. The API takes the voice recording as an input and returns a JSON response with the emotion as an output. The backend server parses the JSON response and extracts the emotion.
-   **Answer to speech synthesis:** The backend server uses a text-to-speech API to synthesize speech for the answer. The API takes the answer as an input and returns an audio file as an output. The backend server saves the audio file in a temporary folder.
-   **Sound or speech output control:** The backend server sends a GET request to the ESP32 firmware with the ID of the voice recording, the answer, and the emotion as parameters. The ESP32 firmware uses the ID to match the voice recording with its corresponding answer and emotion. The ESP32 firmware uses the HTTP protocol to download the audio file from the backend server. The ESP32 firmware uses the I2S protocol to send audio data to the MAX98357A amplifier, which drives the speaker. The ESP32 firmware also uses I2C commands to display different expressions on the OLED displays according to the emotion.

  **I2S protocol**

The protocol which is used to transmit digital audio data from one device to another device is known as I2S or Inter-IC Sound protocol. This protocol transmits PCM (pulse-code modulated) audio data from one IC to another within an electronic device. I2S plays a key role in transmitting audio files which are pre-recorded from an MCU to a DAC or amplifier. This protocol can also be utilized to digitize audio using a microphone.

The  **I2S protocol features**  include the following.

-   It has 8 to 32 data bits for each sample.
-   Tx & Rx FIFO interrupts.
-   It supports DMA.
-   16-bit, 32-bit, 48-bit, or 64-bit word select period.
-   Simultaneous bi-directional audio streaming.
-   8-bit, 16-bit, and 24-bit sample width.
-   It has different sample rates.
-   The data rate is up to 96 kHz through the 64-bit word select period.
-   Interleaved stereo FIFOs or Independent right & left channel FIFOs




                       
