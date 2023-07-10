// socket.addEventListener('message', (event) => {
//   const max_nodes = 10;
//   const jsonData = JSON.parse(event.data);
//   const temperature = jsonData.temperature;
//   const humidity = jsonData.humidity;
//   const gas = jsonData.gas;
const max_nodes = 10;
const time = new Date().toLocaleTimeString();
function sendfunction1(temperaturedata1,humiditydata1,gasdata1) {

  temperatureChart.data.labels.push(time);
  temperatureChart.data.datasets[0].data.push(temperaturedata1);
  console.log("chart: ",temperaturedata1)
  if (temperatureChart.data.labels.length > max_nodes) {
    temperatureChart.data.labels.shift();
    temperatureChart.data.datasets[0].data.shift();
  }
  temperatureChart.update();
  console.log(temperaturedata1);

  temperatureChart.data.labels.push(time);
  temperatureChart.data.datasets[1].data.push(humiditydata1);
  console.log("chart: ",humiditydata1);
  if (temperatureChart.data.labels.length > max_nodes) {
    temperatureChart.data.labels.shift();
    temperatureChart.data.datasets[1].data.shift();
  }
  temperatureChart.update();
  console.log(humiditydata1);

  temperatureChart.data.labels.push(time);
  temperatureChart.data.datasets[2].data.push(gasdata1);
  console.log("chart: ",gasdata1);
  if (temperatureChart.data.labels.length > max_nodes) {
    temperatureChart.data.labels.shift();
    temperatureChart.data.datasets[2].data.shift();
  }
  temperatureChart.update();
  console.log(gasdata1);
}
//chart2
function sendfunction2(temperaturedata2,humiditydata2,gasdata2) {

  humidityChart.data.labels.push(time);
  humidityChart.data.datasets[0].data.push(temperaturedata2);
  console.log("chart: ",temperaturedata2)
  if (humidityChart.data.labels.length > max_nodes) {
    humidityChart.data.labels.shift();
    humidityChart.data.datasets[0].data.shift();
  }
  humidityChart.update();
  console.log(temperaturedata2);

  humidityChart.data.labels.push(time);
  humidityChart.data.datasets[1].data.push(humiditydata2);
  console.log("chart: ",humiditydata2);
  if (humidityChart.data.labels.length > max_nodes) {
    humidityChart.data.labels.shift();
    humidityChart.data.datasets[1].data.shift();
  }
  humidityChart.update();
  console.log(humiditydata2);

  humidityChart.data.labels.push(time);
  humidityChart.data.datasets[2].data.push(gasdata2);
  console.log("chart: ",gasdata2);
  if (humidityChart.data.labels.length > max_nodes) {
    humidityChart.data.labels.shift();
    humidityChart.data.datasets[2].data.shift();
  }
  humidityChart.update();
  console.log(gasdata2);
}
//chart3
function sendfunction3(temperaturedata3,humiditydata3,gasdata3) {

  gasChart.data.labels.push(time);
  gasChart.data.datasets[0].data.push(temperaturedata3);
  console.log("chart: ",temperaturedata3)
  if (gasChart.data.labels.length > max_nodes) {
    gasChart.data.labels.shift();
    gasChart.data.datasets[0].data.shift();
  }
  gasChart.update();
  console.log(temperaturedata3);

  gasChart.data.labels.push(time);
  gasChart.data.datasets[1].data.push(humiditydata3);
  console.log("chart: ",humiditydata3);
  if (gasChart.data.labels.length > max_nodes) {
    gasChart.data.labels.shift();
    gasChart.data.datasets[1].data.shift();
  }
  gasChart.update();
  console.log(humiditydata3);

  gasChart.data.labels.push(time);
  gasChart.data.datasets[2].data.push(gasdata3);
  console.log("chart: ",gasdata3);
  if (gasChart.data.labels.length > max_nodes) {
    gasChart.data.labels.shift();
    gasChart.data.datasets[2].data.shift();
  }
  gasChart.update();
  console.log(gasdata3);
}