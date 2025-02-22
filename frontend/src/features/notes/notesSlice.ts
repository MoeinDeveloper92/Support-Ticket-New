import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';
import {
  CreateNote,
  Note,
  NoteInitialState,
  NoteResponseFromServer,
} from '../../@types/note.dto';
import { RootState } from '../../app/store';

const initialState: NoteInitialState = {
  notes: null,
  note: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

//@desc get all ntoes
export const getAllNotes = createAsyncThunk<NoteResponseFromServer, string>(
  'notes/getAll',
  async (ticketId: string, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      return await noteService.getAllNotes(ticketId, auth.token as string);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//@desc get all ntoes
export const createNote = createAsyncThunk<NoteResponseFromServer, CreateNote>(
  'notes/createNote',
  async (createNote: CreateNote, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      return await noteService.createNote(createNote, auth.token as string);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//@desc   Delete Note
export const deleteNote = createAsyncThunk<NoteResponseFromServer, string>(
  'note/delete',
  async (noteId: string, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;
      return await noteService.deleteNote(noteId, auth.token as string);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes = action.payload.data as Note[];
    });
    builder.addCase(createNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.notes?.push(action.payload.data as Note);
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    state.notes = state.notes?.filter(
      (note) => note._id.toString() !== action.payload.noteId?.toString()
    );
    });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
