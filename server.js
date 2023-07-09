const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set();

app.use(express.static('.'));

const mqttClient = mqtt.connect('mqtt://mqtt.flespi.io:1883', {
  username: 'eXUeRHMZWmaE7CqW9nj2Peio1iKtDrNFdyHS3jGNtGgq6wa6KjYpn5CdbcuCs87v', // Thay bằng tên người dùng của bạn
  //password: 'YOUR_PASSWORD', // Thay bằng mật khẩu của bạn (nếu cần thiết)
  clientId: 'nhanne' // Thay bằng client ID của bạn
});

mqttClient.on('connect', () => {
  console.log('Connected to Flespi MQTT broker');

  const topics = ['sensor/data1', 'sensor/data2', 'sensor/data3'];

  topics.forEach(topic => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Error while subscribing to topic:', topic, err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });
  });
});

mqttClient.on('message', (topic, message) => {
  const data = message.toString();
  console.log(topic,data);
  broadcast(data);
});

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    // Xử lý các thông điệp nhận được từ WebSocket clients
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
