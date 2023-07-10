

    // Gửi chuỗi đến máy chủ khi nhấn nút "Send"
    function sendMessage() {
      const messageInput = document.getElementById('messageInput');
      const message = messageInput.value;
      socket.send(message);
      messageInput.value = '';
    }

    // function changename() {
    //   const messageInput1 = document.getElementById('messageChangeName');
    //   const message1 = messageInput1.value;
    //   socket.send(message1);
    //   messageInput1.value = '';
    // }

    const socket = new WebSocket('ws://localhost:8000');
    //const mqttClient = new mqttClient('mqtt://mqtt.flespi.io:1883');
    // Xử lý sự kiện khi kết nối được thiết lập
    socket.onopen = function(event) {
      console.log('Connected to server');
    };
    socket.onmessage = function(event)  {
      const data = JSON.parse(event.data);
      const eventName = data.event;
      const message = data.data;
  
      // Xử lý dữ liệu từ topic1
      if (eventName === 'data1') {
        // Xử lý dữ liệu từ topic1
        var jsondataevent = JSON.parse(message);
        var temperaturedata1 = jsondataevent.temp;
        var humiditydata1 = jsondataevent.hum;
        var gasdata1 = jsondataevent.gas;
        console.log(temperaturedata1);
        console.log(humiditydata1);
        sendfunction1(temperaturedata1,humiditydata1,gasdata1);
      }
  
      // Xử lý dữ liệu từ topic2
      if (eventName === 'data2') {
        // Xử lý dữ liệu từ topic2
        const jsondataevent = JSON.parse(message);
        const temperaturedata2 = jsondataevent.temp;
        const humiditydata2 = jsondataevent.hum;
        const gasdata2 = jsondataevent.gas;
        console.log(temperaturedata2);
        console.log(humiditydata2);
        sendfunction2(temperaturedata2, humiditydata2, gasdata2);
      }
  
      // Xử lý dữ liệu từ topic3
      if (eventName === 'data3') {
        // Xử lý dữ liệu từ topic3
        const jsondataevent = JSON.parse(message);
        const temperaturedata3 = jsondataevent.temp;
        const humiditydata3 = jsondataevent.hum;
        const gasdata3 = jsondataevent.gas;
        console.log(temperaturedata3);
        console.log(humiditydata3);
        sendfunction3(temperaturedata3, humiditydata3, gasdata3);
      }
    };
  
    // Khi kết nối bị đóng
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Xử lý sự kiện nhận thông điệp từ máy chủ
    // socket.onmessage = function(event) {
    //   console.log('Received message (client):', event.data);
    // };


  /*
  {
  "temperature": 25,
  "humidity": 60,
  "gas": 10
  }
*/