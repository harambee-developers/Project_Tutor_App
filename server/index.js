const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const path = require('path')
const http = require("http");
const socketIo = require("socket.io");
const { Message } = require("./model/User");

require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

//I reccomend doing a console.log as well to make sure the names match*
console.log(`./.env.${process.env.NODE_ENV}`)

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
  origin: [FRONTEND_URL,'https://js.stripe.com', BACKEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Ensure all necessary methods are allowed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Static routes
app.use('/routes/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// Setting up the route for images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Modularized routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes)

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [FRONTEND_URL, BACKEND_URL],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
    
    const message = new Message({ senderId, receiverId, content });
    
    try {
      await message.save(); // Save the message to the database
      console.log("Message saved:", message);
      socket.broadcast.to(receiverId).emit("message", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
