import express from 'express';
import protect from '../middleware/auth';
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketControllers';
import noteRoute from './noteRoutes';
const router = express.Router();

router.use(protect);
router.use('/:ticketId/notes', noteRoute);
router.route('/').get(getTickets).post(createTicket);
router.route('/:id').get(getTicket).delete(deleteTicket).put(updateTicket);

export default router;
