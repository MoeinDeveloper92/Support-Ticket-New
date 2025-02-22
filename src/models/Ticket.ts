import { InferSchemaType, Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['iPhone', 'iPad', 'iPod', 'Macbook Pro', 'iMac', 'iPad'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description of the issue!'],
  },
  status: {
    type: String,
    enum: ['new', 'open', 'closed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface ITiket extends InferSchemaType<typeof ticketSchema> {}

export const Ticket = model<ITiket>('Ticket', ticketSchema);
