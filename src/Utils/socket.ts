import { Server } from 'socket.io';
import { User } from '../Models';

export const set_socket_id = async (user_id: string, socker_id: string) => {
  await User.findByIdAndUpdate(user_id, {
    $set: {
      socketId: socker_id,
    },
  });
};

export const remove_socket_id = async (socket_id: string) => {
  await User.updateOne(
    { socketId: socket_id },
    {
      $set: {
        socketId: null,
      },
    },
  );
};

export const send_real_time_message = async (
  reciver: string,
  chat: {
    message: string;
    sender: string;
    createdAt: string;
  },
  io: Server,
) => {
  const user = await User.findById(reciver);
  const socketId = user?.socketId;
  if (!socketId) return;
  io.to(socketId).emit('recieve_chat', chat);
};
