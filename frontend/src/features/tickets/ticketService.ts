import axios from 'axios';
import { CreateTicketDto } from '../../@types/ticket.dto';
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

const ticketService = {
  createTicket,
  getAllTickets,
};

export default ticketService;
