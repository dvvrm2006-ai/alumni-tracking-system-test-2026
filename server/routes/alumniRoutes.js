import express from 'express';
import { getAllAlumni, searchAlumni, getAlumniById } from '../controllers/alumniController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/search', verifyToken, searchAlumni);
router.get('/:id', verifyToken, getAlumniById);
router.get('/', verifyToken, getAllAlumni);

export default router;
