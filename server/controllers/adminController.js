import User from '../models/User.js';
import Event from '../models/Event.js';

// GET /api/admin/stats
export async function getDashboardStats(req, res) {
  try {
    const now = new Date();

    const [totalUsers, totalAlumni, totalEvents, upcomingEvents, events] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'alumni' }),
      Event.countDocuments(),
      Event.countDocuments({ eventDate: { $gte: now } }),
      Event.find({}, 'registeredUsers'),
    ]);

    const registeredUsers = events.reduce((sum, e) => sum + e.registeredUsers.length, 0);

    res.status(200).json({
      success: true,
      data: { totalUsers, totalAlumni, totalEvents, upcomingEvents, registeredUsers },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load dashboard stats', error: err.message });
  }
}

// GET /api/admin/users
export async function getAdminUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: err.message });
  }
}

// PUT /api/admin/users/:id/status — toggle active/suspended
export async function updateUserStatus(req, res) {
  try {
    const { accountStatus } = req.body;
    if (!['active', 'suspended'].includes(accountStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { accountStatus }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user status', error: err.message });
  }
}

// DELETE /api/admin/users/:id
export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: err.message });
  }
}
