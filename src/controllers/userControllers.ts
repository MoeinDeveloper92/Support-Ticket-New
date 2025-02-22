import { Response, Request, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { IUser, User } from '../models/User';

import { UserPayload } from '../types/user/user-payload.dto';

//@desc   register a new User
//@route  POST /api/v1/users/register
//@access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //Tip=> we can handle it whough excepion handler, anc check it ther
    // or we can utlize express validator
    //but here we go for the simple way
    const { name, email, password } = req.body;
    if (!email || !password) {
      //next will give the conroll of error to the custom mioddleeare

      return next(new ErrorResponse('Please include all the fields', 400));
    }

    //Find if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorResponse('User Already Exist', 400));
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const payload: UserPayload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id.toString(),
    };
    generateResponse(newUser, payload, res);
  }
);

//@desc   Login a user
//@route  POST /api/v1/users/login
//@access Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const pwMatch = await user?.verifyPassword(password);
    console.log('PW MATCH->>>>', pwMatch);
    //check user and password match
    if (user && pwMatch) {
      const payload: UserPayload = {
        name: user.name,
        email: user.email,
        id: user._id.toString(),
      };
      generateResponse(user, payload, res);
    } else {
      return next(new ErrorResponse('Invalid Credentials!', 401));
    }
  }
);

//@desc   get me
//@route  GET /api/v1/users/me
//@access private
export const getMe = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    // console.log(req.user)
    res.status(200).json({
      success: true,
      message: 'GET ME ROUTE',
    });
  }
);

const generateResponse = (
  user: IUser,
  userPayload: UserPayload,
  res: Response
) => {
  //here I could have added res.cookis to send cookie to the browse and deleage user's authentication by the brower.. becauses it os not a good practice to store the jwt in the local storage cause of the secutory reasons
  const token = user.generateToken(userPayload);
  res.status(200).json({
    success: true,
    data: user,
    token,
  });
};
