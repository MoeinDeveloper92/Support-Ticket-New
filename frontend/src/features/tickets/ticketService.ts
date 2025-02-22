import axios from 'axios';
import { CreateTicketDto, DataForTicketUpdate } from '../../@types/ticket.dto';
import { createTicket } from './ticketSlice';

const API_URL = '/api/v1/tickets';

//create Tciket
const createTicket = async (ticketData: CreateTicketDto, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const getAllTickets = async (token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const resposne = await axios.get(API_URL, config);

  return resposne.data;
};

//@desc get single Ticket
const getSingleTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `/${ticketId}`, config);

  return response.data;
};

//@desc close ticket
const updateTicket = async (
  dataForTicketUpdate: DataForTicketUpdate,
  token: string
) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const { status } = dataForTicketUpdate;
  const response = await axios.put(
    API_URL + `/${dataForTicketUpdate.ticketId}`,
    { status },
    config
  );

  return response.data;
};

const ticketService = {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
};

export default ticketService;
