import { useAppDispatch, useAppSelector } from '../app/hook';
import { Note } from '../@types/note.dto';
import { deleteNote } from '../features/notes/notesSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const NoteComponent = ({ note }: { note: Note }) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleDeleteNote = () => {
    if (window.confirm('Are you sure you want to delete the Note')) {
      dispatch(deleteNote(note._id));
    }
  };
  return (
    <>
      <div
        className="note"
        style={{
          backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
          color: note.isStaff ? '#fff' : '#000',
        }}
      >
        <h4>
          Note From{' '}
          {note.isStaff ? <span>Staff</span> : <span>{user?.name}</span>}
          <p>{note.text}</p>
        </h4>
        <div className="note-date">
          {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
        <div>
          <button onClick={handleDeleteNote}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default NoteComponent;
