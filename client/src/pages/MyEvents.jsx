import { useEffect, useState } from 'react';
import { fetchMyEvents } from '@/services/eventService';
import EventCard from '@/components/events/EventCard';
import EventSkeleton from '@/components/events/EventSkeleton';
import EmptyEventState from '@/components/events/EmptyEventState';

export default function MyEvents() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyEvents().then(setEvents).catch(() => setError('Could not load your events.'));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold text-ink mb-2">My Events</h1>
      <p className="text-slate-500 text-sm mb-8">Events you've registered for.</p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!events
          ? Array.from({ length: 3 }).map((_, i) => <EventSkeleton key={i} />)
          : events.length === 0
          ? <EmptyEventState message="You haven't registered for any events yet." />
          : events.map((event) => <EventCard key={event._id} event={event} />)}
      </div>
    </div>
  );
}
