import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../Models';

export const set_avatar: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req;

    const { avatar }: { avatar: string } = req.body;
    const db_user = await User.findByIdAndUpdate(user?._id, {
      $set: {
        isAvatarImageSet: true,
        avatarImage: avatar,
      },
    });

    if (!db_user)
      return res.status(404).json({ msg: 'User not found', success: false });

    res.json({ success: true, msg: 'Avatar set successfully' });
  } catch (error) {
    next(error);
  }
};

export const all_users: RequestHandler = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { user } = req;
    const current_page = (page as any as number) ?? 1;
    const limit = 20;
    const skip = (current_page - 1) * limit;
    const users = await User.find({ _id: { $ne: user?._id } })
      .sort({ username: 1 })
      .skip(skip)
      .limit(limit)
      .select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const get_me: RequestHandler = async (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
};
