import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export const handle_error: ErrorRequestHandler = (error, req, res, next) => {
  return res
    .status(500)
    .json({ success: false, error: error.message, mgs: 'Server Error' });
};
