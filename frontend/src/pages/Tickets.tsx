import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { getAllTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../shared/Spinner';
const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useAppSelector(
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
  }, []);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return <div>Tickets</div>;
};

export default Tickets;
