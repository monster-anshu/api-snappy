import { Request, Response, NextFunction } from 'express';
import { User } from '../Models';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.KEY || 'KEY_JWT_TOKEN';

export const fetch_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization');
    const key = process.env.KEY;

    if (!token || !key)
      return res.status(401).json({ success: false, msg: 'Not Authorized' });

    let validate: any = null;
    try {
      validate = verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, msg: 'Not Authorized' });
    }

    if (!validate.user)
      return res.status(401).json({ success: false, msg: 'Not Authorized' });

    const user = await User.findById(validate.user._id).select('-password');

    if (!user)
      return res.status(401).json({ success: false, msg: 'Not Authorized' });

    req.user = (user as any)._doc;
    next();
  } catch (error) {
    next(error);
  }
};
