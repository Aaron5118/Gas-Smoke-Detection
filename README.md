# Gas & Smoke Monitor 🚨🔥 
---

## Overview  
This project is an **Arduino-based Gas and Smoke Detection System** that uses an **MQ sensor** to detect gas/smoke levels in the environment. If dangerous levels are detected, an **alarm (buzzer) and warning light** will be activated to alert users. Additionally, a **web-based dashboard** provides real-time monitoring and historical data visualization.  

---

## 🚀 Features  
- ✅ **Real-time gas/smoke detection** using the MQ sensor.  
- ✅ **Buzzer alert system** when gas levels exceed the threshold.  
- ✅ **Warning light activation** upon detection.  
- ✅ **Serial Monitor Output** for debugging and monitoring gas levels.  
- ✅ **Web-based Monitoring System** for visualizing gas/smoke levels in real-time.  
- ✅ **Historical Data & Alerts Log** for tracking previous readings.  
- ✅ **Customizable Settings** such as alert thresholds and notifications.  

---

## 📥 Clone the Repository  
To get started, clone this repository to your local machine using:  

```sh
git clone https://github.com/your-username/gas-smoke-detection.git
cd gas-smoke-detection
```

---

## 🔧 Hardware Requirements  
- **Arduino Board** (Uno, Mega, or Nano)  
- **MQ Gas Sensor** (e.g., MQ-2, MQ-5, MQ-135)  
- **Buzzer** (Piezo or Active Buzzer)  
- **LED or Warning Light**  
- **Jumper Wires**  

---

## 🔄 How It Works  
1️⃣ The MQ sensor continuously measures the gas/smoke concentration.  
2️⃣ If the reading exceeds the threshold (default: **300 PPM**):  
   - The **buzzer** turns ON.  
   - The **warning light** turns ON.  
   - A **warning message** is printed on the Serial Monitor.  
   - The **web dashboard** updates with alert indicators.  
3️⃣ If the gas level drops below the threshold, the system resets.  

---

## 🌐 Web-Based Monitoring System  
The system includes a **real-time web dashboard** where users can:  
- **Monitor gas/smoke levels visually** using a circular gauge and bar graphs.  
- **View historical data** with charts.  
- **Customize alert thresholds** and notification settings.  
- **Check device status** such as firmware version, battery life, and last calibration date.  

### 📌 How to Use the Web Dashboard  
1️⃣ Open the `index.html` file in a web browser.  
2️⃣ Connect the Arduino device and ensure it's sending data.  
3️⃣ Use the **Dashboard Tab** to monitor gas levels in real time.  
4️⃣ Check the **History Tab** for past readings and alert events.  
5️⃣ Adjust **Settings** to configure alert thresholds and notification preferences.  

---

## 🚀 Getting Started  

### 1️⃣ Install Arduino IDE  
Download and install the **Arduino IDE** from the official website.  

### 2️⃣ Upload the Code  
- Connect your **Arduino board** via USB.  
- Open the **Arduino IDE** and paste the provided **code**.  
- Select the correct **board** and **COM port**.  
- Click **Upload**.  

### 3️⃣ Run the Web Dashboard  
To start the web dashboard, follow these steps:  

#### **Option 1: Open Directly**  
- Open `gas-smoke-ui.html` in any browser.  
- Make sure the Arduino is connected and sending data.  

#### **Option 2: Run a Local Server (Recommended)**  
- Install Python if not installed.  
- Run the following command in the project folder:  

```sh
python -m http.server
```

- Open `http://localhost:8000` in your browser.  

---

## 🛠 Customization  
- **Modify the gas detection threshold** in the code: `if (gasValue > 300)`.  
- **Change the buzzer and LED activation delay** in `delay(1000);`.  
- **Use different MQ sensors** for detecting other gases like **CO2, LPG, or methane**.  

---

## 📜 License  
This project is open-source and available under the **MIT License**.  

---

## 🙌 Contribution  
Feel free to **fork this repository**, improve the project, and submit a **pull request**.  

### **📩 Connect with Me**  
🔗 **LinkedIn**: [Aaron Cardozo](https://www.linkedin.com/in/aaronardozo)  
📧 **Email**: aaroncardozo7115@gmail.com  

