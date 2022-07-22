import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Message } from '../Models';
import { send_real_time_message } from '../Utils/socket';
export const send_message: RequestHandler = async (req, res, next) => {
  try {
    const { user, app } = req;
    const { message } = req.body;
    const { id } = req.params;

    const sender = user?._id.toString();
    const users = [sender, id].sort();
    const date = new Date().toISOString();
    sender &&
      send_real_time_message(
        id,
        { message, sender, createdAt: date },
        app.get('io'),
      );

    await Message.updateOne(
      {
        users,
      },
      {
        $push: {
          chats: {
            message,
            sender,
            createdAt: date,
          },
        },
      },
      {
        upsert: true,
      },
    );

    res.send('ok');
  } catch (error) {
    next();
  }
};

export const get_messages: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const sender = user?._id.toString();
    const users = [sender, id].sort();
    const user_ids = users.map((user) => new mongoose.Types.ObjectId(user));
    const result = await Message.aggregate([
      {
        $match: { users: user_ids },
      },
      {
        $unwind: '$chats',
      },
      {
        $sort: {
          'chats.createdAt': -1,
        },
      },
      {
        $group: {
          _id: '$_id',
          chats: { $push: '$chats' },
        },
      },
      {
        $project: {
          chats: 1,
        },
      },
    ]);
    const messages = (result.length ? result[0].chats : []) as [];
    res.json(messages.reverse());
  } catch (error) {
    next(error);
  }
};
