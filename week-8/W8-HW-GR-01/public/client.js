const socket = new WebSocket("ws://localhost:8080");
let myUsername = null;
let currentChatUser = null;
let chatHistory = {}; // { username: [{text, fromSelf, time}] }

// Hỏi tên người dùng khi vào
socket.onopen = () => {
  myUsername = prompt("Nhập tên của bạn:");
  socket.send(JSON.stringify({ type: "login", username: myUsername }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Cập nhật danh sách user online
  if (data.type === "userList") {
    const ul = document.getElementById("userList");
    ul.innerHTML = "";
    data.users
      .filter((u) => u !== myUsername)
      .forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user;
        li.style.cursor = "pointer";
        li.onclick = () => switchChat(user);
        ul.appendChild(li);
      });
  }

  // Khi nhận tin nhắn
  if (data.type === "message") {
    const { from, to, text } = data;
    const otherUser = from === myUsername ? to : from;
    addMessage(otherUser, text, from === myUsername);
    if (currentChatUser === otherUser) renderChat(otherUser);
  }
};

// Lưu tin nhắn
function addMessage(user, text, fromSelf) {
  if (!chatHistory[user]) chatHistory[user] = [];
  chatHistory[user].push({
    text,
    fromSelf,
    time: new Date().toLocaleTimeString(),
  });
}

// Hiển thị đoạn chat với user
function renderChat(user) {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  const messages = chatHistory[user] || [];

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = msg.fromSelf ? "message self" : "message other";
    div.textContent = `[${msg.time}] ${msg.text}`;
    chatBox.appendChild(div);
  });

  document.getElementById("chatTitle").textContent = `💬 Đang chat với ${user}`;
}

// Đổi người chat
function switchChat(user) {
  currentChatUser = user;
  renderChat(user);
}

// Gửi tin nhắn
document.getElementById("sendBtn").onclick = () => {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (!text || !currentChatUser) return;

  socket.send(
    JSON.stringify({
      type: "message",
      from: myUsername,
      to: currentChatUser,
      text,
    })
  );

  addMessage(currentChatUser, text, true);
  renderChat(currentChatUser);
  input.value = "";
};
