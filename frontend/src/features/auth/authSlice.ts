import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '../../@types/user.dto';

interface authState {
  token?: string;
  user?: UserDto | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

//Define initialState usign that Type
const initialState: authState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
