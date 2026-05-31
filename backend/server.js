import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/users.js';
import gameRoutes from './src/routes/games.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eborajedrez')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: '🎯 Bienvenido a Eborajedrez API v1.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK ✅', timestamp: new Date() });
});

// Socket.io - Gestión de conexiones
const activeGames = new Map();
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('📌 Jugador conectado:', socket.id);
  
  socket.on('user_join', (userId) => {
    activeUsers.set(socket.id, userId);
    io.emit('users_online', activeUsers.size);
  });

  socket.on('join_game', (gameData) => {
    const { gameId, userId } = gameData;
    socket.join(`game_${gameId}`);
    activeGames.set(gameId, { ...activeGames.get(gameId), [userId]: socket.id });
    io.to(`game_${gameId}`).emit('player_joined', { userId, socketId: socket.id });
    console.log('🎮 Jugador uniéndose a partida:', gameId);
  });

  socket.on('make_move', (moveData) => {
    const { gameId, move, userId } = moveData;
    io.to(`game_${gameId}`).emit('move_made', { move, userId, timestamp: new Date() });
    console.log('♞ Movimiento realizado en partida:', gameId, move);
  });

  socket.on('chat_message', (chatData) => {
    const { gameId, message, username } = chatData;
    io.to(`game_${gameId}`).emit('receive_message', {
      username,
      message,
      timestamp: new Date()
    });
  });

  socket.on('game_end', (gameData) => {
    const { gameId, result, winner } = gameData;
    io.to(`game_${gameId}`).emit('game_finished', { result, winner });
    activeGames.delete(gameId);
    console.log('🏁 Partida finalizada:', gameId, result);
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
    io.emit('users_online', activeUsers.size);
    console.log('📌 Jugador desconectado:', socket.id);
  });
});

// Servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Eborajedrez ejecutándose en puerto ${PORT}`);
  console.log(`🌐 Cliente URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

export { app, io };
