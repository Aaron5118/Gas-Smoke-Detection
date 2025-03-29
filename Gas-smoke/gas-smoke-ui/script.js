// Global variables
let port;
const DANGER_THRESHOLD = 300;
const MAX_VALUE = 1000;
let historicalData = [];
let chart;
let alertCount = 0;
let peakLevel = 0;

// Button click feedback
function addClickFeedback(button) {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 100);
}

// Initialize all buttons
function initializeButtons() {
  // Add click feedback to all buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => addClickFeedback(button));
  });

  // Settings buttons
  const thresholdInput = document.getElementById('alertThreshold');
  const saveSettingsBtn = document.getElementById('saveSettings');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const threshold = parseInt(thresholdInput.value);
      if (!isNaN(threshold)) {
        localStorage.setItem('alertThreshold', threshold);
        showNotification('Settings saved successfully!');
      }
    });
  }

  // Clear history button
  const clearHistoryBtn = document.getElementById('clearHistory');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      historicalData = [];
      updateHistoricalData(0);
      showNotification('History cleared!');
    });
  }

  // Alert button
  const alertBtn = document.getElementById('alertBtn');
  if (alertBtn) {
    alertBtn.addEventListener('click', () => {
      document.querySelectorAll('.alert-badge').forEach(badge => {
        badge.classList.add('hidden');
      });
      alertCount = 0;
      document.getElementById('alertCount').textContent = '0';
    });
  }

  // Connect button
  const connectBtn = document.querySelector('button[onclick="connectArduino()"]');
  if (connectBtn) {
    connectBtn.addEventListener('click', async () => {
      try {
        await connectArduino();
        showNotification('Connected to Arduino successfully!');
      } catch (err) {
        showNotification('Failed to connect to Arduino', 'error');
      }
    });
  }
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white z-50 fade-in`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Tab functionality
function showTab(tabName) {
  // Add click feedback
  const clickedTab = document.querySelector(`[data-tab="${tabName}"]`);
  if (clickedTab) {
    addClickFeedback(clickedTab);
  }

  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'text-white');
    btn.classList.add('text-gray-400');
  });
  
  // Update selected tab button
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (selectedBtn) {
    selectedBtn.classList.add('active', 'text-white');
    selectedBtn.classList.remove('text-gray-400');
  }

  // Initialize chart if showing history tab
  if (tabName === 'history') {
    initChart();
  }

  // Save active tab
  localStorage.setItem('activeTab', tabName);
}

// Parallax effect
function handleParallax(e) {
  const layers = document.querySelectorAll('.parallax-layer');
  const speed = 0.01;
  
  const x = (window.innerWidth / 2 - e.clientX) * speed;
  const y = (window.innerHeight / 2 - e.clientY) * speed;
  
  layers.forEach((layer, i) => {
    const depth = i + 1;
    const moveX = x * depth;
    const moveY = y * depth;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
}

// Initialize Chart.js
function initChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Gas Level',
        data: [],
        borderColor: '#00e6c3',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#2a2d31'
          },
          ticks: {
            color: '#6b7280'
          }
        },
        x: {
          grid: {
            color: '#2a2d31'
          },
          ticks: {
            color: '#6b7280'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Update historical data
function updateHistoricalData(value) {
  const now = new Date();
  historicalData.push({ time: now, value: value });
  
  // Keep last 24 hours of data
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  historicalData = historicalData.filter(data => data.time > twentyFourHoursAgo);

  // Update chart
  if (chart) {
    chart.data.labels = historicalData.map(data => 
      data.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    chart.data.datasets[0].data = historicalData.map(data => data.value);
    chart.update();
  }

  // Update statistics
  const sum = historicalData.reduce((acc, curr) => acc + parseInt(curr.value), 0);
  const avg = Math.round(sum / historicalData.length);
  document.getElementById('avgGas').textContent = `${avg} PPM`;

  peakLevel = Math.max(peakLevel, value);
  document.getElementById('peakLevel').textContent = `${peakLevel} PPM`;
}

// Update gauge
function updateGauge(value) {
  const percentage = (value / MAX_VALUE) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;
  document.getElementById('gaugeFill').style.strokeDasharray = `${circumference - offset} ${offset}`;
  
  // Update gas level bar
  document.getElementById('gasBar').style.width = `${percentage}%`;
  document.getElementById('gasPercentage').textContent = `${Math.round(percentage)}%`;
  
  // Update smoke level bar
  const smokePercentage = Math.min(100, (value / DANGER_THRESHOLD) * 100);
  document.getElementById('smokeBar').style.width = `${smokePercentage}%`;
  document.getElementById('smokePercentage').textContent = `${Math.round(smokePercentage)}%`;

  // Update last update time
  document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
}

// Arduino connection
async function connectArduino() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      let gasValue = new TextDecoder().decode(value).trim();
      document.getElementById("gasValue").textContent = gasValue;
      updateGauge(parseInt(gasValue));
      updateHistoricalData(parseInt(gasValue));

      let statusText = document.getElementById("status");
      const gaugeFill = document.getElementById("gaugeFill");
      const threshold = parseInt(document.getElementById('alertThreshold').value);

      if (parseInt(gasValue) > threshold) {
        statusText.innerText = "Status: Danger!";
        statusText.classList.add("text-red-500");
        statusText.classList.remove("text-green-400");
        gaugeFill.style.stroke = "#ef4444";
        
        // Show alert badge
        document.querySelectorAll('.alert-badge').forEach(badge => {
          badge.classList.remove('hidden');
        });
        
        // Increment alert count
        alertCount++;
        document.getElementById('alertCount').textContent = alertCount;
      } else {
        statusText.innerText = "Status: Safe";
        statusText.classList.add("text-green-400");
        statusText.classList.remove("text-red-500");
        gaugeFill.style.stroke = "#00e6c3";
      }
    }
  } catch (err) {
    console.error("Error connecting to Arduino:", err);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particles.js
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#00e6c3'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.2,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00e6c3',
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.3
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });

  // Set up parallax effect
  document.addEventListener('mousemove', handleParallax);

  // Initialize buttons
  initializeButtons();

  // Show last active tab or default to dashboard
  const lastActiveTab = localStorage.getItem('activeTab') || 'dashboard';
  showTab(lastActiveTab);

  // Load saved threshold
  const savedThreshold = localStorage.getItem('alertThreshold');
  if (savedThreshold) {
    document.getElementById('alertThreshold').value = savedThreshold;
  }
});
