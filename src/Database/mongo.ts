import mongoose, { MongooseError } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connect = () => {
  const url = process.env.MONGO_URL;
  if (!url) throw new MongooseError('Database url not found');
  mongoose
    .connect(url)
    .then(() => {
      console.log('Connected mongodb');
    })
    .catch((err) => {
      console.log(err.toString());
    });
};
