

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
