const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public")); // phục vụ index.html

// Danh sách user đang online
const clients = new Map(); // Map<username, ws>

// Gửi danh sách user online cho tất cả client
function broadcastUserList() {
  const userList = Array.from(clients.keys());
  const data = JSON.stringify({ type: "userList", users: userList });
  for (const ws of clients.values()) {
    ws.send(data);
  }
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    // Khi user đăng nhập
    if (data.type === "login") {
      clients.set(data.username, ws);
      ws.username = data.username;
      broadcastUserList();
      console.log(`${data.username} đã đăng nhập`);
    }

    // Khi user gửi tin nhắn
    if (data.type === "message") {
      const { from, to, text } = data;
      const receiver = clients.get(to);

      // Gửi cho người nhận nếu đang online
      if (receiver) {
        receiver.send(
          JSON.stringify({
            type: "message",
            from,
            to,
            text,
          })
        );
      }

      // Gửi lại cho người gửi để hiển thị
      ws.send(
        JSON.stringify({
          type: "message",
          from,
          to,
          text,
        })
      );
    }
  });

  ws.on("close", () => {
    if (ws.username) {
      clients.delete(ws.username);
      broadcastUserList();
      console.log(`${ws.username} đã ngắt kết nối`);
    }
  });
});

server.listen(8080, () => console.log("Server chạy tại http://localhost:8080"));
