# Gas-Smoke-Detection
## Overview
This project is an **Arduino-based Gas and Smoke Detection System** that uses an **MQ sensor** to detect gas/smoke levels in the environment. If dangerous levels are detected, an **alarm (buzzer) and warning light** will be activated to alert users.

## 🚀 Features
- ✅ **Real-time gas/smoke detection** using the MQ sensor.
- ✅ **Buzzer alert system** when gas levels exceed the threshold.
- ✅ **Warning light activation** upon detection.
- ✅ **Serial Monitor Output** for debugging and monitoring gas levels.

## 🛠 Hardware Requirements
- **Arduino Board** (Uno, Mega, or Nano)
- **MQ Gas Sensor** (e.g., MQ-2, MQ-5, MQ-135)
- **Buzzer** (Piezo or Active Buzzer)
- **LED or Warning Light**
- **Jumper Wires**

## 🔧 Wiring Diagram
| Component      | Arduino Pin |
|---------------|------------|
| MQ Sensor     | A0         |
| Buzzer        | 13         |
| Warning Light | 7          |



## 🔄 How It Works
The MQ sensor continuously measures the gas/smoke concentration.

If the reading exceeds the threshold (300):

The buzzer turns ON.

The light indicator turns ON.

A warning message is printed on the Serial Monitor.

If the gas level drops below the threshold, the system resets.


## 🚀 Getting Started
1️⃣ Install Arduino IDE
Download and install the Arduino IDE.

2️⃣ Upload the Code
Connect your Arduino board via USB.

Open the Arduino IDE and paste the provided code.

Select the correct board and COM port.

Click Upload.

3️⃣ Test the System
Open the Serial Monitor (Baud rate: 9600).

Expose the MQ sensor to gas (e.g., lighter gas, alcohol vapor).

Observe the buzzer and warning light activation.


## 🛠 Customization
Modify the gas detection threshold (if (gasValue > 300)) based on your environment.

Change the buzzer and LED activation delay in delay(1000);.

Use different MQ sensors for detecting other gases like CO2, LPG, or methane.


## 📜 License
This project is open-source and available under the MIT License.


## 🙌 Contribution
Feel free to fork this repository, improve the project, and submit a pull request.


### **📩 Connect with Me**
🔗 **LinkedIn**: [Aaron Cardozo](https://www.linkedin.com/in/aaronardozo)  
📧 **Email**: aaroncardozo7115@gmail.com
