// socket.addEventListener('message', (event) => {
//   const max_nodes = 10;
//   const jsonData = JSON.parse(event.data);
//   const temperature = jsonData.temperature;
//   const humidity = jsonData.humidity;
//   const gas = jsonData.gas;
const max_nodes = 10;
const time = new Date().toLocaleTimeString();

function updateChart(chart, value1, value2, value3) {
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