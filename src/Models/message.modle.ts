import mongoose, { Schema, model } from 'mongoose';

interface interface_message {
  users: string[];
  chats: {
    sender?: string;
    message?: string;
    createdAt: string;
  }[];
}

const message_schema = new Schema<interface_message>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    chats: {
      type: [
        {
          sender: Schema.Types.ObjectId,
          message: String,
          createdAt: Date,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Message = model<interface_message>('messages', message_schema);
