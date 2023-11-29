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
  username: 'eXUeRHMZWmaE7CqW9nj2Peio1iKtDrNFdyHS3jGNtGgq6wa6KjYpn5CdbcuCs87v', 
  clientId: 'nhanne'
});

mqttClient.on('connect', () => {
  console.log('Connected to Flespi MQTT broker');

  const topics = ['/NODE_01/DATA/SENSOR', '/NODE_02/DATA/SENSOR', '/NODE_03/DATA/SENSOR'];

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
  if (topic === '/NODE_01/DATA/SENSOR') {
    sendDataToClients('data1', message.toString());
    console.log(message.toString());
  } else if (topic === '/NODE_02/DATA/SENSOR') {
    sendDataToClients('data2', message.toString());
  } else if (topic === '/NODE_03/DATA/SENSOR') {
    sendDataToClients('data3', message.toString());
  }
});

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    const topicpub = 'ADD/NEW_NODE_NAME'
    console.log('Received message:', message.toString());
    broadcast(message.toString(), ws);
    mqttClient.publish(topicpub, message, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published:', message.toString());
      }
    })
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
}

function sendDataToClients(event, data) {
  const message = JSON.stringify({ event, data });

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
