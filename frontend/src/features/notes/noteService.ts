import axios from 'axios';
import { CreateNote } from '../../@types/note.dto';

const API_URL = '/api/v1/tickets';
const API_URL2 = '/api/v1/notes';
//get all notes
const getAllNotes = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${ticketId}/notes`, config);
  return response.data;
};

//create note
const createNote = async (createNote: CreateNote, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `/${createNote.ticketId}/notes`,
    { text: createNote.text },
    config
  );
  return response.data;
};

//delete Note
const deleteNote = async (noteId: string, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL2 + `/${noteId}`,

    config
  );

 
  return response.data;
};

const noteService = {
  getAllNotes,
  createNote,
  deleteNote,
};

export default noteService;
