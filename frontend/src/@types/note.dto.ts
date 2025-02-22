export interface Note {
  _id: string;
  user: string;
  ticket: string;
  text: string;
  isStaff: false;
  createdAt: Date;
  __v: 0;
}

export interface NoteResponseFromServer {
  success: boolean;
  data: Note | Note[];
  noteId?: string;
}

export interface CreateNote {
  text: string;
  ticketId: string;
}

export interface NoteInitialState {
  notes?: Note[] | null;
  note?: Note | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
