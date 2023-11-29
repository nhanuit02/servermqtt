

const socket = new WebSocket('ws://localhost:8000');

const topicHandlers = {
  data1: sendfunction1,
  data2: sendfunction2,
  data3: sendfunction3
};

socket.onopen = function(event) {
  console.log('Connected to server');
};

socket.onmessage = function(event)  {
  const { event: eventName, data: message } = JSON.parse(event.data);
  
  if (eventName in topicHandlers) {
    const { temp, hum, gas } = JSON.parse(message);
    console.log(eventName);
    console.log(temp);
    topicHandlers[eventName](temp, hum, gas);
  }
};

socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
}


/*
{
    "temp": 26,
    "hum":  69,
    "gas":  26.300365447998047,
    "error":        0
}
*/