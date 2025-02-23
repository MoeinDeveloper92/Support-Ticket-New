// src/components/NoteComponent.tsx
import { useAppDispatch, useAppSelector } from '../app/hook';
import { Note } from '../@types/note.dto';
import { deleteNote } from '../features/notes/notesSlice';
import Modal from '../shared/Modal';
import { useState } from 'react';

const NoteComponent = ({ note }: { note: Note }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDeleteNote = () => {
    // Instead of using window.confirm, open our custom modal
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteNote(note._id));
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
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
        </h4>
        <p>{note.text}</p>
        <div className="note-date">
          {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
        <div>
          <button onClick={handleDeleteNote}>Delete</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCancelDelete}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={handleCancelDelete} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleConfirmDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NoteComponent;
