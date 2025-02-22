import express from 'express';
import protect from '../middleware/auth';
import { getNotes, addNote, deleteNote } from '../controllers/noteController';

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/').get(getNotes).post(addNote);
router.route('/:noteId').delete(deleteNote);

export default router;
