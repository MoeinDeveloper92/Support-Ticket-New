import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>What Do you need help with?</h1>
        <p>Please Choose From an option Below!</p>
        <Link className="btn btn-reverse btn-block" to={'/new-ticket'}>
          <FaQuestionCircle />
          Create New Ticket
        </Link>

        <Link className="btn btn-block" to={'/tickets'}>
          <FaTicketAlt />
          View My Tickets
        </Link>
      </section>
    </>
  );
};

export default Home;
