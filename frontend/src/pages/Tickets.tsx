import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../shared/Spinner';
import BackButton from '../shared/BackButton';
import Ticket from '../components/Ticket';
const Tickets = () => {
  const { isLoading, isSuccess, tickets } = useAppSelector(
    (state) => state.ticket
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
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
          <Ticket key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
