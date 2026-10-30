import EventCard from '@/components/events/EventCard';

export default function UpcomingEvents({ events }) {
  const upcoming = events
    .filter((e) => new Date(e.eventDate) >= new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    .slice(0, 3);

  if (upcoming.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="font-display text-lg font-semibold text-ink mb-4">Happening Soon</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcoming.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
