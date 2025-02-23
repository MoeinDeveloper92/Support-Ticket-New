import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { getSingleTicket, updateTicket } from '../features/tickets/ticketSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../shared/BackButton';
import Spinner from '../shared/Spinner';
import { toast } from 'react-toastify';
import { DataForTicketUpdate } from '../@types/ticket.dto';
import {
  createNote,
  getAllNotes,
  reset as resetNote,
} from '../features/notes/notesSlice';
import NoteComponent from '../components/NoteComponent';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import Input from '../shared/Input';
import { CreateNoteDto } from '../@types/note.dto';

const customStyle: Modal.Styles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');
const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');

  const { isLoading, isError, ticket, message } = useAppSelector(
    (state) => state.ticket
  );
  const {
    isLoading: noteLoading,
    notes,
    isSuccess: noteSuccess,
  } = useAppSelector((state) => state.note);

  const { ticketId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getSingleTicket(ticketId as string));
    dispatch(getAllNotes(ticketId as string));
    // eslint-disabled
  }, [isError, message, ticketId]);

 
  useEffect(() => {
    return () => {
      if (noteSuccess) {
        dispatch(resetNote());
      }
    };
  }, [noteSuccess, dispatch]);

  const handleCloseTicket = () => {
    const dataForUpdate: DataForTicketUpdate = {
      ticketId: ticketId as string,
      status: 'closed',
    };
    dispatch(updateTicket(dataForUpdate));
  };

  const handleOpenTicket = () => {
    const dataForUpdate: DataForTicketUpdate = {
      ticketId: ticketId as string,
      status: 'open',
    };

    dispatch(updateTicket(dataForUpdate));
  };

  const onNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: CreateNoteDto = {
      text: noteText,
      ticketId,
    };
    dispatch(createNote(newNote));
    closeModal();
  };

  //Open/Close Modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  //Handle loading State
  if (isLoading || noteLoading) {
    return <Spinner loading={isLoading} />;
  }
  if (isError) {
    return <h3>Something Went wrong!</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID:{ticket?._id}
          <span className={`status status-${ticket?.status}`}>
            {ticket?.status}
          </span>
        </h2>
        {ticket?.status === 'closed' && (
          <div>
            <button onClick={handleOpenTicket} className="btn-sm btn-reverse">
              Open The Ticket
            </button>
          </div>
        )}
        <h3>
          Date Submitted:{' '}
          {new Date(ticket?.createdAt as Date).toLocaleDateString('en-US')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket?.status !== 'closed' && (
        <button onClick={openModal} className="btn">
          Add Note <FaPlus />
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button onClick={closeModal} className="btn-close">
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <Input
              as="textarea"
              name="noteText"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              id="noteText"
              className="form-control"
              placeholder="Note Text"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes?.map((note) => (
        <NoteComponent note={note} key={note._id} />
      ))}
      {(ticket?.status === 'new' || ticket?.status === 'open') && (
        <button
          onClick={handleCloseTicket}
          className="btn btn-block btn-danger"
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
