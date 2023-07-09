

const mqttClient = mqtt.connect('mqtt://mqtt.flespi.io:1883', {
  username: 'eXUeRHMZWmaE7CqW9nj2Peio1iKtDrNFdyHS3jGNtGgq6wa6KjYpn5CdbcuCs87v', // Replace with your Flespi username
  //password: '', // Replace with your Flespi password
  clientId: 'nhanne', // Replace with your Flespi client ID
});

function subscribeTopics() {
  const topicInput = document.getElementById('topicInput');
  const topics = topicInput.value.split(',');

  topics.forEach(topic => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Error while subscribing to topic:', topic, err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });
  });

  topicInput.value = ''; // Xóa nội dung nhập liệu sau khi subscribe
}
const max_nodes = 10;
//Temperature
const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(ctx, {
  type :'line',
  data: {
    labels: [],
    datasets: [{
      label: 'temperature',
      data: [0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
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
//Humidity
const ctx1 = document.getElementById('humidityChart').getContext('2d');
const humidityChart = new Chart(ctx1, {
  type :'line',
  data: {
    labels: [],
    datasets: [{
      label: 'humidity',
      data: [0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
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
//Gas
const ctx2 = document.getElementById('gasChart').getContext('2d');
const gasChart = new Chart(ctx2, {
  type :'line',
  data: {
    labels: [],
    datasets: [{
      label: 'gas',
      data: [0],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
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

  /*socket.addEventListener('message', (event) => {
  const datatest = {
    "node":[
      {
        "teamperature":30, 
        "humidity":30, 
        "gas":10,
        "error":0
      },
      {
        "teamperature":30, 
        "humidity":30, 
        "gas":10,
        "error":0
      },
      {
        "teamperature":20, 
        "humidity":10, 
        "gas":20,
        "error":0
      }
    ]   
  }
  //const jsonData = JSON.parse(event.data);
  const jsonData = JSON.parse(datatest);
  const node = jsonData.node;
  const temperature = node[i].temperature;
  const humidity = node[i].humidity;
  const gas = node[i].gas;*/
  mqttClient.on('message', (topic, message) => {
  const jsonData = JSON.parse(message.toString());
  const temperature = jsonData.temperature;
  const humidity = jsonData.humidity;
  const gas = jsonData.gas;

  const time = new Date().toLocaleTimeString();
  temperatureChart.data.labels.push(time);
  temperatureChart.data.datasets[0].data.push(temperature);
  if (temperatureChart.data.labels.length > max_nodes) {
    temperatureChart.data.labels.shift();
    temperatureChart.data.datasets[0].data.shift();
  }
  temperatureChart.update();
  console.log(temperature);

  humidityChart.data.labels.push(time);
  humidityChart.data.datasets[0].data.push(humidity);
  if (humidityChart.data.labels.length > max_nodes) {
    humidityChart.data.labels.shift();
    humidityChart.data.datasets[0].data.shift();
  }
  humidityChart.update();
  console.log(humidity);

  gasChart.data.labels.push(time);
  gasChart.data.datasets[0].data.push(gas);
  if (gasChart.data.labels.length > max_nodes) {
    gasChart.data.labels.shift();
    gasChart.data.datasets[0].data.shift();
  }
  gasChart.update();
  console.log(gas);
})