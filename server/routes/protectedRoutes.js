import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// GET /api/protected/dashboard-data
// Example of a route that requires a valid JWT to access.
router.get('/dashboard-data', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'This is protected data — you only see this if your token is valid.',
    userId: req.user.id,
  });
});

export default router;
