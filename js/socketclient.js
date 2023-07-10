



    // function changename() {
    //   const messageInput1 = document.getElementById('messageChangeName');
    //   const message1 = messageInput1.value;
    //   socket.send(message1);
    //   messageInput1.value = '';
    // }

    const socket = new WebSocket('ws://localhost:8000');

    // Dùng một đối tượng để lưu trữ các hàm xử lý dữ liệu từng topic
    const topicHandlers = {
      data1: sendfunction1,
      data2: sendfunction2,
      data3: sendfunction3
    };
    
    // Xử lý sự kiện khi kết nối được thiết lập
    socket.onopen = function(event) {
      console.log('Connected to server');
    };
    
    socket.onmessage = function(event)  {
      const { event: eventName, data: message } = JSON.parse(event.data);
      
      // Xử lý dữ liệu từ các topic đã định nghĩa trong topicHandlers
      if (eventName in topicHandlers) {
        const { temp, hum, gas } = JSON.parse(message);
        console.log(eventName);
        console.log(temp);
        topicHandlers[eventName](temp, hum, gas);
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