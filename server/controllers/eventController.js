import Event from '../models/Event.js';
import { buildEventMatch, buildEventSort } from '../utils/eventQueryHelpers.js';

// GET /api/events
export async function getAllEvents(req, res) {
  try {
    const match = buildEventMatch(req.query);
    const sort = buildEventSort(req.query.sort);
    const events = await Event.find(match).sort(sort);
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: err.message });
  }
}

// GET /api/events/my-events — events the logged-in user has registered for
export async function getMyEvents(req, res) {
  try {
    const events = await Event.find({ registeredUsers: req.user.id }).sort({ eventDate: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch your events', error: err.message });
  }
}

// GET /api/events/:id
export async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id).populate('registeredUsers', 'name email profilePhoto');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch event', error: err.message });
  }
}

// POST /api/events (admin only)
export async function createEvent(req, res) {
  try {
    const { title, eventDate } = req.body;
    if (!title || !eventDate) {
      return res.status(400).json({ success: false, message: 'Title and event date are required' });
    }

    const event = await Event.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create event', error: err.message });
  }
}

// PUT /api/events/:id (admin only)
export async function updateEvent(req, res) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update event', error: err.message });
  }
}

// DELETE /api/events/:id (admin only)
export async function deleteEvent(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete event', error: err.message });
  }
}

// POST /api/events/register/:id
export async function registerForEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ success: false, message: 'Registration deadline has passed' });
    }

    if (event.registeredUsers.some((u) => u.toString() === req.user.id)) {
      return res.status(409).json({ success: false, message: 'You are already registered for this event' });
    }

    if (event.registeredUsers.length >= event.maximumParticipants) {
      return res.status(400).json({ success: false, message: 'This event is fully booked' });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    res.status(200).json({ success: true, message: 'Registered successfully', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
}
