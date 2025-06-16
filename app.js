const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const stripAnsi = require("strip-ansi").default; // ✅ fix lỗi .default

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Phục vụ file tĩnh (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const minerPath = path.join(__dirname, "miner", "index.js");
let logBuffer = "";

// Hàm phát log + lưu vào RAM
function broadcastLog(msg) {
  const clean = stripAnsi(msg);
  io.emit("miner-log", clean);
  logBuffer += clean;
  if (logBuffer.length > 10000) logBuffer = logBuffer.slice(-10000);
}

// Khi client truy cập
io.on("connection", (socket) => {
  socket.emit("miner-log", logBuffer);
});

// Chạy miner NodeJS
const miner = spawn("node", [minerPath]);

miner.stdout.on("data", (data) => {
  const msg = data.toString();
  broadcastLog(msg);
  process.stdout.write("[MINER] " + msg);
});

miner.stderr.on("data", (data) => {
  const msg = data.toString();
  broadcastLog(msg);
  process.stderr.write("[MINER-ERR] " + msg);
});

miner.on("exit", (code) => {
  const msg = `Miner exited with code ${code}\n`;
  broadcastLog(msg);
  console.log("[EXIT]", msg);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Web UI đang chạy tại http://localhost:${PORT}`);
});
