import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../shared/Spinner';
import BackButton from '../shared/BackButton';
import TicketComponent from '../components/TicketCompoennt';
const Tickets = () => {
  const { isLoading, isSuccess, tickets } = useAppSelector(
    (state) => state.ticket
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTickets());
  }, []);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        console.log(
          'I am comming from Single Ticket component since the isSuccess is Trure'
        );
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Products</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets?.map((ticket) => (
          <TicketComponent key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
