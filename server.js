import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import { authenticateSocket } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Chat socket.io autenticado
io.use(authenticateSocket);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      user: socket.user.username,
      msg
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
