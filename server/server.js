const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('sendMessage', ({ senderId, receiverId, content }) => {
        // Save the message to your database
        const message = { senderId, receiverId, content, createdAt: new Date() };
        // Emit the message to the receiver
        socket.broadcast.to(receiverId).emit('message', message);
    });

    socket.on('joinRoom', (userId) => {
        socket.join(userId); // Join a room for private messaging
        console.log(`User joined room: ${userId}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
