import { Request, Response, NextFunction, Errback } from 'express';
import ErrorResponse from '../utils/errorResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  const statusCode = err.statusCode ? err.statusCode : 500;
  if (err.name === 'CastError') {
    const message = `Resouce with id ${err.value} not found!`;
    error.statusCode = 404;
    error = new ErrorResponse(message, error.statusCode);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err?.message,
    stack: process.env.NODE_ENV === 'development' && err.stack,
  });
};

export default errorHandler;
