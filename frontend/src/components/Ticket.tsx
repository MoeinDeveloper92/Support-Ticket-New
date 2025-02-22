import { Ticket as TicketDto } from '../@types/ticket.dto';
import { Link } from 'react-router-dom';

const Ticket = ({ ticket }: { ticket: TicketDto }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt as Date).toLocaleDateString()}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View Ticket
      </Link>
    </div>
  );
};

export default Ticket;
