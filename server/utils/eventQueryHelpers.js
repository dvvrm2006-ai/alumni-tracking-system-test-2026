export function buildEventMatch(query) {
  const match = {};

  if (query.category) match.category = { $regex: escapeRegex(query.category), $options: 'i' };
  if (query.eventType) match.eventType = query.eventType;

  const now = new Date();
  if (query.timeframe === 'upcoming') match.eventDate = { $gte: now };
  if (query.timeframe === 'past') match.eventDate = { $lt: now };

  if (query.q) {
    const regex = { $regex: escapeRegex(query.q), $options: 'i' };
    match.$or = [{ title: regex }, { description: regex }, { organizer: regex }, { venue: regex }];
  }

  return match;
}

export function buildEventSort(sort) {
  switch (sort) {
    case 'oldest':
      return { createdAt: 1 };
    case 'date':
      return { eventDate: 1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
