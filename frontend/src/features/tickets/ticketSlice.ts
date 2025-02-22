import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateTicketDto,
  DataForTicketUpdate,
  ResponseFromServerAfterTicketCreation,
  Ticket,
} from '../../@types/ticket.dto';
import { RootState } from '../../app/store';
import ticketService from './ticketService';
//Thats very cruicial for every resource that we have we should create such structure
//to handle the beahvior of the state during API call.
interface InitialStateTicket {
  tickets?: Ticket[];
  ticket?: Ticket;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: InitialStateTicket = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

//@desc     create a Tciket
export const createTicket = createAsyncThunk<
  ResponseFromServerAfterTicketCreation, // this is the response from sever
  CreateTicketDto,
  { state: RootState; rejectValue: string }
>('ticket/create', async (ticketData: CreateTicketDto, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState() as RootState;
    return await ticketService.createTicket(ticketData, auth.token as string);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//@desc     get all the ticket
export const getAllTickets =
  createAsyncThunk<ResponseFromServerAfterTicketCreation>(
    'ticket/getAll',

    async (_: any, thunkAPI) => {
      const { auth } = thunkAPI.getState() as RootState;
      return await ticketService.getAllTickets(auth.token as string);
    }
  );

//@desc get single ticket
//By passing this to createAsynThunk we specify the type of the data we get ffrom backend
//then in th action we can easiyl get the desired data wihtough compaing about the data
export const getSingleTicket = createAsyncThunk<
  ResponseFromServerAfterTicketCreation,
  string,
  { state: RootState }
>('ticket/getTicket', async (ticketId: string, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState() as RootState;
    return await ticketService.getSingleTicket(ticketId, auth.token as string);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//@desc   close the ticket
export const updateTicket = createAsyncThunk<
  ResponseFromServerAfterTicketCreation,
  DataForTicketUpdate
>(
  'ticket/close',
  async (dataForTicketUpdate: DataForTicketUpdate, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as RootState;

      return await ticketService.updateTicket(
        dataForTicketUpdate,
        auth.token as string
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets?.push(action.payload.data as Ticket);
      console.log(action.payload);
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });

    builder.addCase(getAllTickets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets = action.payload.data as Ticket[];
    });
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
    builder.addCase(getSingleTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ticket = action.payload.data as Ticket;
    });
    builder.addCase(getSingleTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
    builder.addCase(updateTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ticket = action.payload.data as Ticket;
    });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
