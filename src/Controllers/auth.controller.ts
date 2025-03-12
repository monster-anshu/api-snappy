import { RequestHandler } from 'express';
import { User } from '../Models';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
export const register: RequestHandler = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res
        .status(409)
        .json({ msg: 'User name already used', success: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(409)
        .json({ msg: 'User name already used', success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = sign({ user }, process.env.KEY || '');

    return res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const {
      username,
      password,
    }: { username: string; email: string; password: string } = req.body;

    if (!username)
      return res.status(401).json({ msg: 'Username required', success: false });

    if (!password)
      return res.status(401).json({ msg: 'Password required', success: false });

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ msg: 'User name not exists', success: false });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res
        .status(401)
        .json({ msg: 'Incorrect Password', success: false });

    const token = sign({ user }, process.env.KEY || '');
    return res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
