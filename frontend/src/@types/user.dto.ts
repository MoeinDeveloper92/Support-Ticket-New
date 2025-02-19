export interface UserResponseFromServer {
  success: boolean;
  data: UserDto;
  token: string;
}

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  __v: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export type RegisterUserInServer = Partial<CreateUserDto>;
export type UpdateUserInServer = Partial<CreateUserDto>;
