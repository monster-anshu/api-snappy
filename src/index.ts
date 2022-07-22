import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { connect } from './Database/mongo';
import { api } from './api';
import { remove_socket_id, set_socket_id } from './Utils/socket';
import helmet from 'helmet';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware
app.use(
  cors({
    origin: '*',
  }),
);

app.use(morgan('common'));
app.use(express.json());
app.use('/api', api);
app.use(helmet());

app.get('/', (req, res) => {
  res.send('ok');
});

const server = app.listen(PORT, () => {
  console.log('Server is running');
  connect();
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  socket.on('online', (req) => {
    set_socket_id(req.user_id, socket.id);
  });
  socket.on('disconnect', () => {
    remove_socket_id(socket.id);
  });
});
