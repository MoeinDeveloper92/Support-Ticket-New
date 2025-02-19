import axios from 'axios';
import {
  LoginUserDto,
  RegisterUserInServer,
  UserResponseFromServer,
} from '../../@types/user.dto';

const API_URL = '/api/v1/users';

//register User
const registerUser = async (
  userdata: RegisterUserInServer
): Promise<UserResponseFromServer> => {
  const response = await axios.post(API_URL + '/register', userdata);
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('user', JSON.stringify(response.data['data']));
  }
  return response.data;
};

//login User
const loginUser = async (userData: LoginUserDto) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('user', JSON.stringify(response.data['data']));
  }

  return response.data;
};

//logout user
const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
