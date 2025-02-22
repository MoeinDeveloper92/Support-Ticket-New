import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  LoginUserDto,
  RegisterUserInServer,
  UserDto,
  UserResponseFromServer,
} from '../../@types/user.dto';
import authService from './authService';
interface authState {
  token?: string;
  user?: UserDto | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

//get user from local storage
const tokenInLocaLStorage = JSON.parse(localStorage.getItem('token') as string);
const userInLocalStorage = JSON.parse(localStorage.getItem('user') as string);
//Define initialState usign that Type/
const initialState: authState = {
  token: tokenInLocaLStorage ? tokenInLocaLStorage : null,
  user: userInLocalStorage ? userInLocalStorage : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

//@desc   Register function
export const registerUser = createAsyncThunk<
  UserResponseFromServer, // Fulfilled return type
  RegisterUserInServer, // Argument type
  { rejectValue: string } // Rejected return type
>('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.registerUser(userData);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//@desc   Login User
export const loginUser = createAsyncThunk<
  UserResponseFromServer,
  LoginUserDto,
  { rejectValue: string }
>('auth/login', async (userData: LoginUserDto, thunkAPI) => {
  try {
    return await authService.loginUser(userData);
  } catch (error: any) {
    console.log('ERROR =>>>>>', error);
    const message =
      error.response?.data?.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//@desc   Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_: unknown) => {
    console.log(_);
    await authService.logoutUser();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<authState>) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<UserResponseFromServer>) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload as string;
      state.user = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = '';
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload.token;
      state.user = action.payload.data;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
