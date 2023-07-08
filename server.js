/*
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const express = require('express');
const { count } = require('console');
const app = express();

app.use(express.static('.'));
const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const wss = new WebSocket.Server({ server });

const clients = new Set();

// function sendCount(ws) {
//   const count = Math.floor(Math.random()*100);
//   const sendInterval = setInterval(() => {
//       ws.send(count.toString());
//     }
//   , 1000);
// }

// setInterval(() => {
//   const randomData = Math.floor(Math.random() * 100); // Dữ liệu ngẫu nhiên
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(randomData.toString());
//     }
//   });
// }, 1000);

wss.on('connection', (ws) => {
  clients.add(ws);
  //ws.send('Welcome to the server!');

  //sendCount(ws);

  ws.on('message', (message) => {
    console.log('Received message: %s', message);
    broadcast(message, ws);
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
  
  // ws.on('message', (message) => {
  //   try {
  //     const jsonData = JSON.parse(message.toString());
  //     console.log("testtttt",jsonData);
  //     const temperature = jsonData.temp;
  //     const humidity = jsonData.humidity;
  //     const gas = jsonData.gas;

  //     const time = new Date().toLocaleDateString();
  //     chart.data.labels.push(time);
  //     chart.data.datasets[0].data.push(temperature);
  //     chart.update();
  //     broadcast(message, ws);
  //   } catch (error){
  //     //console.error('invalid json data', error);
  //   }
  // })
});

function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
}

*/

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set();

// Serve static files
app.use(express.static('.'));

// WebSocket connection handler
wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message);
    broadcast(message, ws);
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

// MQTT client configuration
// const mqttClient = mqtt.connect('mqtt://mqtt.flespi.io:1883', {
//   username: 'eXUeRHMZWmaE7CqW9nj2Peio1iKtDrNFdyHS3jGNtGgq6wa6KjYpn5CdbcuCs87v', // Replace with your Flespi username
//   //password: '', // Replace with your Flespi password
//   clientId: 'nhanne', // Replace with your Flespi client ID
// });

// mqttClient.on('connect', () => {
//   console.log('Connected to Flespi MQTT broker');

//   const topics = ['sensor/data1', 'sensor/data2', 'sensor/data3'];

//   topics.forEach(topic => {
//     mqttClient.subscribe(topic, (err) => {
//       if (err) {
//         console.error('Error while subscribing to topic:', topic, err);
//       } else {
//         console.log('Subscribed to topic:', topic);
//       }
//     });
//   });
// });

// mqttClient.on('message', (topic, message) => {
//   const data = message.toString();
//   console.log(data);
//   broadcast(data);
// });

// Broadcast message to all WebSocket clients
function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Start the server
const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
