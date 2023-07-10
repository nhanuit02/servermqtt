const max_nodes = 20;

const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = createChart(ctx);

const ctx1 = document.getElementById('humidityChart').getContext('2d');
const humidityChart = createChart(ctx1);

const ctx2 = document.getElementById('gasChart').getContext('2d');
const gasChart = createChart(ctx2);

function createChart(ctx) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Humidity',
          data: [],
          backgroundColor: 'rgba(192, 75, 192, 0.2)',
          borderColor: 'rgba(192, 75, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Gas',
          data: [],
          backgroundColor: 'rgba(192, 192, 75, 0.2)',
          borderColor: 'rgba(192, 192, 75, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true
        },
        y: {
          display: true
        }
      }
    }
  });
}

function updateChart(chart, value1, value2, value3) {
  const time = new Date().toLocaleTimeString();

  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(value1);
  console.log("temp: ", value1);
  if (chart.data.labels.length > max_nodes) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
  console.log(value1);

  chart.data.labels.push(time);
  chart.data.datasets[1].data.push(value2);
  console.log("hum: ", value2);
  if (chart.data.labels.length > max_nodes) {
    chart.data.labels.shift();
    chart.data.datasets[1].data.shift();
  }
  chart.update();
  console.log(value2);

  chart.data.labels.push(time);
  chart.data.datasets[2].data.push(value3);
  console.log("gas: ", value3);
  if (chart.data.labels.length > max_nodes) {
    chart.data.labels.shift();
    chart.data.datasets[2].data.shift();
  }
  chart.update();
  console.log(value3);
}

// Chart 1
function sendfunction1(temperaturedata1, humiditydata1, gasdata1) {
  updateChart(temperatureChart, temperaturedata1, humiditydata1, gasdata1);
}

// Chart 2
function sendfunction2(temperaturedata2, humiditydata2, gasdata2) {
  updateChart(humidityChart, temperaturedata2, humiditydata2, gasdata2);
}

// Chart 3
function sendfunction3(temperaturedata3, humiditydata3, gasdata3) {
  updateChart(gasChart, temperaturedata3, humiditydata3, gasdata3);
}
