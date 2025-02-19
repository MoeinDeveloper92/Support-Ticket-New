export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
