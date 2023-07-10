

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

    function sendMessage() {
      const messageInput = document.getElementById('messageInput');
      const message = messageInput.value;
      socket.send(message);
      messageInput.value = '';
    }
    // Xử lý sự kiện nhận thông điệp từ máy chủ
    // socket.onmessage = function(event) {
    //   console.log('Received message (client):', event.data);
    // };


  /*
{
        "temp": 26,
        "hum":  69,
        "gas":  26.300365447998047,
        "error":        0
}
*/