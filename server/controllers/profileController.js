import User from '../models/User.js';
import { validateProfileInput } from '../utils/validateProfile.js';

// Fields a user is allowed to edit via PUT /api/profile.
// Email, role, password, and createdAt are intentionally excluded.
const EDITABLE_FIELDS = [
  'profilePhoto',
  'phone',
  'collegeName',
  'branch',
  'graduationYear',
  'currentCompany',
  'jobTitle',
  'experience',
  'location',
  'bio',
  'skills',
  'linkedinUrl',
  'githubUrl',
  'portfolioUrl',
];

// GET /api/profile
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile', error: err.message });
  }
}

// PUT /api/profile
export async function updateProfile(req, res) {
  try {
    const errors = validateProfileInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const updates = {};
    for (const field of EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: err.message });
  }
}
