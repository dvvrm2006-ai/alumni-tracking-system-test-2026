import User from '../models/User.js';
import { buildFilterMatch, buildSearchMatch, runAlumniQuery } from '../utils/alumniQueryHelpers.js';

// GET /api/alumni — paginated list, supports filter query params + sorting
export async function getAllAlumni(req, res) {
  try {
    const { page, limit, sort, experience } = req.query;
    const match = buildFilterMatch(req.query);
    await runAlumniQuery(User, res, { match, sort, page, limit, minExperience: experience });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch alumni', error: err.message });
  }
}

// GET /api/alumni/search — free-text search across name, company, skills, branch, location, year
export async function searchAlumni(req, res) {
  try {
    const { q, page, limit, sort } = req.query;
    const match = buildSearchMatch(q);
    await runAlumniQuery(User, res, { match, sort, page, limit });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed', error: err.message });
  }
}

// GET /api/alumni/:id — single alumni profile
export async function getAlumniById(req, res) {
  try {
    const alumnus = await User.findById(req.params.id);
    if (!alumnus) {
      return res.status(404).json({ success: false, message: 'Alumnus not found' });
    }
    res.status(200).json({ success: true, data: alumnus });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch alumnus', error: err.message });
  }
}
