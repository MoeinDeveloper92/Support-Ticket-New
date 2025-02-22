import ErrorResponse from '../utils/errorResponse';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
import Note from '../models/Note';
import asyncHandler from '../middleware/async';
import { NextFunction, Response, Request } from 'express';

//@desc     get All the niotes
//@route    GET /api/v1/tickets/:ticketId/notes
//@access   Private
export const getNotes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //Get the user from JWT
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('User Not Found', 401));
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== user._id.toString()) {
      return next(new ErrorResponse('User not authorized', 401));
    }
    const notes = await Note.find({ user: user._id, ticket: ticket._id });

    res.status(200).json({
      success: true,
      data: notes,
    });
  }
);

//@desc     create note
//@route    POST /api/v1/tickets/:ticketId/notes
//@access   Private
export const addNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //Get the user from JWT
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('User Not Found', 401));
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== user._id.toString()) {
      return next(new ErrorResponse('User not authorized', 401));
    }
    const newNote = await Note.create({
      ticket: ticket._id,
      user: user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: newNote,
    });
  }
);

//@desc   Delete a note by user
//@route  DELETE /api/v1/notes/:noteId
//access  protected
export const deleteNote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.user?.email });

    if (!user) {
      return next(new ErrorResponse('Unauthorized', 401));
    }

    //find the Note  and compatre with userId
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return next(new ErrorResponse('Not Not Found!', 404));
    }
    if (user._id.toString() !== note.user.toString()) {
      return next(new ErrorResponse('UnAuhtoized actions', 401));
    }

    await Note.findByIdAndDelete(req.params.noteId);
    res.status(200).json({
      success: true,
      noteId: req.params.noteId,
    });
  }
);
