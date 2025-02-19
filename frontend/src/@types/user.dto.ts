export interface UserDto {
  name: string;
  email: string;
  _id: string;
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
