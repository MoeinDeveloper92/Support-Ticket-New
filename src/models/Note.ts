import mongoose, { InferSchemaType, Schema } from 'mongoose';

const noteSchema = new Schema({
  user: {
    type: String,
    required: true,
    ref: 'Users',
  },
  ticket: {
    type: String,
    required: true,
    ref: 'Tickets',
  },
  text: {
    type: String,
    required: [true, 'please add some text'],
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  staffId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface INote extends InferSchemaType<typeof noteSchema> {}

const Note = mongoose.model<INote>('Notes', noteSchema);

export default Note;
