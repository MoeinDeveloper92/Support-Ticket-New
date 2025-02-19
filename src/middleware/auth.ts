import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '../models/User';
import asyncHandler from './async';
import jwt, { JwtPayload } from 'jsonwebtoken';

import ErrorResponse from '../utils/errorResponse';
import { UserPayload } from '../@types/user/user-payload.dto';

// Extend Request to include `user` property
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      try {
        // Extract token
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload; // Ensure it's a JwtPayload

        if (!decoded.id) {
          return next(new ErrorResponse('Invalid Token, AnAuhtorized', 401));
        }

        // Find user by decoded ID from token
        const user = await User.findById(decoded.id).select('-password'); // Exclude password

        if (!user) {
          return next(new ErrorResponse('UnAuhtorized', 401));
        }

        // Assign user to `req.user`
        req.user = user;

        next();
      } catch (error) {
        return next(new ErrorResponse('Not Authorized', 401));
      }
    } else {
      return next(new ErrorResponse('Not Authorized', 401));
    }
  }
);

//here we can set up the role based authentication
// to make sure that the user has certain role

export default protect;
