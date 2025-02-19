import { Request, Response, NextFunction, Errback } from 'express';
import ErrorResponse from '../utils/errorResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  const statusCode = error.statusCode ? error.statusCode : 500;
  if (err.name === 'CastError') {
    const message = `Resouce with id ${err.value} not found!`;
    error.statusCode = 404;
    error = new ErrorResponse(message, error.statusCode);
  }
  res.status(error.statusCode).json({
    success: false,
    message: error?.message,
    stack: process.env.NODE_ENV === 'development' && error.stack,
  });
};

export default errorHandler;
