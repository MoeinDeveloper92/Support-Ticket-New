import { Schema, model, InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { UserPayload } from '../@types/user/user-payload.dto';
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'please add an emial'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please add a password.'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Generating token
userSchema.methods.generateToken = function (userPayload: UserPayload): string {
  const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

  // Ensure EXPIRES is either a valid string or a number
  const EXPIRES: string | number = process.env.JWT_EXPIRE
    ? +process.env.JWT_EXPIRE || process.env.JWT_EXPIRE
    : '30d';

  return jwt.sign(
    {
      id: userPayload.id,
      name: userPayload.name,
      email: userPayload.email,
    },
    SECRET_KEY,
    {
      expiresIn: EXPIRES, 
    } as SignOptions // Explicitly ensure correct type
  );
};

//Password verification for login process
userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next(); // Skip hashing if the password isn't modified or doesn't exist
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // No need for type assertion

  next();
});

//this methid is called whenever you sent a response to the client
//like res.json(user)
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export interface IUser extends InferSchemaType<typeof userSchema> {
  //as you can see this is open to extension
  verifyPassword(password: string): boolean;
  generateToken(userPayload: UserPayload): string;
}

export const User = model<IUser>('Users', userSchema);
