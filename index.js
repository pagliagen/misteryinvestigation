const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const WebSocket = require("ws"); // Importa il pacchetto WebSocket
const userRoutes = require("./backend/routes/userRoutes");
const audioRoutes = require("./backend/routes/audioRoutes");
const characterRoutes = require("./backend/routes/characterRoutes");
const testRoutes = require("./backend/routes/testRoutes");
const adminRoutes = require("./backend/routes/adminRoutes");
const { config } = require("./config");
const { costants } = require("./costants");
const AudioFile = require("./backend/models/AudioFile");

// Sovrascrivi console.log()
const originalLog = console.log;
console.log = function () {
  const timestamp = new Date().toISOString();
  const args = Array.from(arguments);
  args.unshift(`[${timestamp}] [LOGGER_INFO]`);
  originalLog.apply(console, args);
};

// Sovrascrivi console.error()
const originalError = console.error;
console.error = function () {
  const timestamp = new Date().toISOString();
  const args = Array.from(arguments);
  args.unshift(`[${timestamp}] [LOGGER_ERROR]`);
  originalError.apply(console, args);
};

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.misteryinvestigation.it",
    "https://misteryinvestigation.it",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Content-Encoding"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use("/user", userRoutes);
app.use("/audio", audioRoutes);
app.use("/character", characterRoutes);
app.use("/test", testRoutes);
app.use("/admin", adminRoutes);

const cronFiles = require("fs").readdirSync(
  path.join(__dirname, "backend", "crons")
);
cronFiles.forEach((file) => require("./backend/crons/" + file));

const PORT = config.server.port || 3001;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${config.db.name}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    if (error instanceof mongoose.Error) {
      console.error("Mongoose error:", error.message);
    } else {
      console.error("Non-Mongoose error:", error);
    }
  }
});

// Creazione del server WebSocket
const wss = new WebSocket.Server({ server });
const clients = {};
let audioFile = {
  file: null,
  masterToken: null,
};

function broadcast(message) {
  const activeClients = Object.entries(clients);
  console.log(
    `Broadcasting message to ${activeClients.length} clients`,
    JSON.stringify(message)
  );
  const currentTime = new Date().getTime();
  activeClients.forEach(([token, client]) => {
    const { socket, lastPing } = client;
    if (
      socket?.readyState === WebSocket.OPEN &&
      currentTime - lastPing < 60000
    ) {
      socket.send(JSON.stringify(message));
    } else {
      delete clients[token];
      if (activeClients.length === 1) {
        audioFile.file = null;
      }
    }
  });
}

setInterval(() => {
  broadcast({ action: "ping" });
}, 30000);

// Gestione delle connessioni WebSocket
wss.on("connection", function connection(ws) {
  console.log("Sending initParameters to client");
  ws.send(
    JSON.stringify({
      action: "initParameters",
      data: { costants },
    })
  );
  if (audioFile.file) {
    console.log("Sending audioStreaming to client");
    ws.send(
      JSON.stringify({
        action: "audioStreaming",
        data: { file: audioFile.file },
      })
    );
  }

  ws.on("message", function incoming(message) {
    try {
      const payload = JSON.parse(message.toString());
      switch (payload.action) {
        case "SESSION_PONG":
          clients[payload.sessionToken] = {
            ...clients[payload.sessionToken],
            lastPing: new Date().getTime(),
          };
          break;
        case "LOGIN_USER":
          console.log("Received LOGIN_USER from client");
          clients[payload.sessionToken] = {
            ...clients[payload.sessionToken],
            lastPing: new Date().getTime(),
            username: payload.data.username,
          };
          broadcast({
            action: "userLogin",
            data: {
              username: payload.data.username,
            },
          });
          break;
        case "SESSION_TOKEN":
          console.log("Received SESSION_TOKEN from client");
          clients[payload.sessionToken] = {
            socket: ws,
            lastPing: new Date().getTime(),
            userInfo: null,
          };
          break;
        case "AUDIO_PLAY":
        case "AUDIO_STOP":
        case "AUDIO_CHANGEVOLUME":
          console.log("Received AUDIO_CHANGEVOLUME from client");
          audioFile.masterToken = payload.sessionToken;
          audioFile.file =
            payload.action === "AUDIO_STOP" ? null : payload.data.file;
          broadcast({
            action: "audioStreaming",
            data: {
              file: audioFile.file,
            },
          });
          break;
        case "DICE_ROLL":
          console.log("Received DICE_ROLL from client");
          broadcast({
            action: "diceRollMessage",
            data: {
              message: payload.data.message,
              level: payload.data.level,
            },
          });
          break;
        case "REFRESH_AUDIOLIST":
          console.log("Received REFRESH_AUDIOLIST from client");
          AudioFile.find().then((data) => {
            broadcast({
              action: "initParameters",
              data: { listAudios: data },
            });
          });
          break;
        default:
          console.log("Invalid action", payload);
          break;
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });
});

module.exports = server;
