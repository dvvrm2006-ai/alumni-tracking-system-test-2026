import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getMyEvents,
} from '../controllers/eventController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.get('/my-events', verifyToken, getMyEvents);
router.post('/register/:id', verifyToken, registerForEvent);
router.get('/:id', verifyToken, getEventById);
router.get('/', verifyToken, getAllEvents);
router.post('/', verifyToken, verifyAdmin, createEvent);
router.put('/:id', verifyToken, verifyAdmin, updateEvent);
router.delete('/:id', verifyToken, verifyAdmin, deleteEvent);

export default router;
