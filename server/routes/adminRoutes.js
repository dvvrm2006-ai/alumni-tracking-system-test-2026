import express from 'express';
import { getDashboardStats, getAdminUsers, updateUserStatus, deleteUser } from '../controllers/adminController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.use(verifyToken, verifyAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getAdminUsers);
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

export default router;
