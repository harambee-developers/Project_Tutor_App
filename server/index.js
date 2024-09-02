const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const path = require("path");
const http = require("http");
const fs = require('fs').promises;
const socketIo = require("socket.io");
const { Message } = require("./model/User");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

//I reccomend doing a console.log as well to make sure the names match*
console.log(`./.env.${process.env.NODE_ENV}`);

const app = express();
const PORT = process.env.PORT || 7777;

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  FRONTEND_URL,
  BACKEND_URL,
  JWT_SECRET,
} = process.env;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment variables.");
  process.exit(1);
}

mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/?authMechanism=DEFAULT`
);

const corsOptions = {
  origin: [FRONTEND_URL, "https://js.stripe.com", BACKEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Ensure all necessary methods are allowed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Static routes
app.use(
  "/routes/uploads",
  express.static(path.join(__dirname, "routes/uploads"))
);

// Setting up the route for images
app.use("/images", express.static(path.join(__dirname, "images")));

// Modularized routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: [FRONTEND_URL, BACKEND_URL],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });

//   socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
//     const message = new Message({ senderId, receiverId, content });

//     try {
//       await message.save(); // Save the message to the database
//       console.log("Message saved:", message);
//       socket.broadcast.to(receiverId).emit("message", message);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("joinRoom", (userId) => {
//     socket.join(userId);
//     console.log(`User joined room: ${userId}`);
//   });
// });

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

authorize().then(listEvents).catch(console.error);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
