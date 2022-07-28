import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { connect } from './Database/mongo';
import { remove_socket_id, set_socket_id } from './Utils/socket';
import { router as user_routes } from './Routes/user.routes';
import { router as auth_routes } from './Routes/auth.routes';
import { router as messages_routes } from './Routes/messages.routes';
import { handle_error } from './Utils/handle_error';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'https://app-snappy.vercel.app',
    credentials: true,
  }),
);

app.use(morgan('common'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/api/auth', auth_routes);
app.use('/api/user', user_routes);
app.use('/api/chat', messages_routes);
app.use(handle_error);

const server = app.listen(PORT, () => {
  console.log('Server is running');
  connect();
});
server.maxHeadersCount = 100;
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
