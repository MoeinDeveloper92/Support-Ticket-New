import { Request, Response, NextFunction, Errback } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err?.message,
    stack: process.env.NODE_ENV === 'development' && err.stack,
  });
};

export default errorHandler;
