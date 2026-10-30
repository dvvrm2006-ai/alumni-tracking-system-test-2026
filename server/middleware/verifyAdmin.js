import User from '../models/User.js';

// Must run after verifyToken — relies on req.user.id being set.
export async function verifyAdmin(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    req.user.role = user.role;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Authorization check failed', error: err.message });
  }
}
