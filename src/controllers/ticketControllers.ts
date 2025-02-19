import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
import { NextFunction, Response, Request } from 'express';
import { CreateTicketDto } from '../types/tickets/ticket.dto';

//@desc     Get all the tickets
//@route    GET /api/v1/tickets
//@access   Private
export const getTickets = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //get user using the id in the JWT
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse(`UnAuthorized!`, 401));
    }

    const tickets = await Ticket.find({ user: user.id });
    res.status(200).json({
      sucess: true,
      data: tickets,
    });
  }
);

//@desc     create a new Ticket
//@rouite   POST /api/v1/ticekts
//@access   Private
export const createTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const createTicketDto: CreateTicketDto = req.body;
    if (!createTicketDto.product || !createTicketDto.description) {
      return next(
        new ErrorResponse('Please add a product and decription', 400)
      );
    }
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('UnAuthorized', 401));
    }

    const ticket = await Ticket.create({
      user: user._id,
      ...createTicketDto,
      status: 'new',
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  }
);

//@desc   get a single ticket
//@route  GET /api/v1/tickets/:id
//@access   Private
export const getTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('NotAuthorized', 401));
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new ErrorResponse(`Ticket Not Found`, 404));
    }
    //we do not want any body to get the ticket
    if (user._id.toString() !== ticket.user.toString()) {
      return next(new ErrorResponse('UnAuthorized', 401));
    }
    res.status(200).json({
      success: true,
      data: ticket,
    });
  }
);

//@desc   DELETE TICKET
//@route  DELETE /api/v1/tickets/:id
//@access   Private
export const deleteTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('NotAuthorized', 401));
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new ErrorResponse(`Ticket Not Found`, 404));
    }
    //we do not want any body to get the ticket
    if (user._id.toString() !== ticket.user.toString()) {
      return next(new ErrorResponse('UnAuthorized', 401));
    }

    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
      message: 'Ticket Deleted',
    });
  }
);

//@desc   UPDATE Ticket
//@route  PUT /api/v1/tickets/:id
//@access   Private
export const updateTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      return next(new ErrorResponse('NotAuthorized', 401));
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new ErrorResponse(`Ticket Not Found`, 404));
    }
    //we do not want any body to get the ticket
    if (user._id.toString() !== ticket.user.toString()) {
      return next(new ErrorResponse('UnAuthorized', 401));
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updatedTicket,
    });
  }
);
