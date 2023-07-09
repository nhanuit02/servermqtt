    // Kết nối tới máy chủ WebSocket
    const socket = new WebSocket('ws://localhost:8000');
    //const mqttClient = new mqttClient('mqtt://mqtt.flespi.io:1883');
    // Xử lý sự kiện khi kết nối được thiết lập
    socket.onopen = function(event) {
      console.log('Connected to server');
    };

    // Xử lý sự kiện nhận thông điệp từ máy chủ
    socket.onmessage = function(event) {
      console.log('Received message (client):', event.data);
    };

    // Gửi chuỗi đến máy chủ khi nhấn nút "Send"
    // function sendMessage() {
    //   const messageInput = document.getElementById('messageInput');
    //   const message = messageInput.value;
    //   socket.send("USSID: ",message);
    //   messageInput.value = '';
    // }

    // function changename() {
    //   const messageInput1 = document.getElementById('messageChangeName');
    //   const message1 = messageInput1.value;
    //   socket.send(message1);
    //   messageInput1.value = '';
    // }

