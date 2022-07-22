import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export const handle_error = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res
    .status(500)
    .json({ success: false, error: error.message, mgs: 'Server Error' });
};
