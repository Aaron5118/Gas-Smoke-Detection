// Define pins for components
#define MQ_SENSOR_PIN A0
#define BUZZER_PIN 13
#define LIGHT_PIN 7

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Set pin modes
  pinMode(MQ_SENSOR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LIGHT_PIN, OUTPUT);
}

void loop() {
  // Read the value from the MQ sensor
  int gasValue = analogRead(MQ_SENSOR_PIN);
  
  // Print the sensor value (for debugging)
  Serial.print("Gas value: ");
  Serial.println(gasValue);
  
  // Check if gas value exceeds a certain threshold
  if (gasValue > 300) {  // Adjust this threshold according to your sensor and environment
    // Gas/smoke detected
    Serial.println("Gas/smoke detected!");
    
    // Activate the buzzer and light
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LIGHT_PIN, HIGH);
    
    // Delay to avoid rapid triggering
    delay(1000);  // Adjust as needed
  } else {
    // No gas/smoke detected
    Serial.println("No 
    /smoke detected.");
    
    // Turn off the buzzer and light
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LIGHT_PIN, LOW);
  }
  
  // Delay before taking next reading
  delay(500);  // Adjust as needed
}
