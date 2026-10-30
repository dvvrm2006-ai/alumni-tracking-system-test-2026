import { useEffect, useState } from 'react';
import { fetchEvents } from '@/services/eventService';
import { useDebounce } from '@/hooks/useDebounce';
import EventSearchBar from '@/components/events/EventSearchBar';
import EventFilters from '@/components/events/EventFilters';
import EventCard from '@/components/events/EventCard';
import EventSkeleton from '@/components/events/EventSkeleton';
import EmptyEventState from '@/components/events/EmptyEventState';
import UpcomingEvents from '@/components/events/UpcomingEvents';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'date', label: 'Date' },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', eventType: '', timeframe: '' });
  const [sort, setSort] = useState('newest');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchEvents({ ...filters, q: debouncedSearch, sort });
        if (!cancelled) setEvents(data);
      } catch {
        if (!cancelled) setError('Could not load events. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [debouncedSearch, filters, sort]);

  const isDefaultView = !debouncedSearch && !filters.category && !filters.eventType && !filters.timeframe;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Events</h1>
        <p className="text-slate-500 text-sm">Discover reunions, workshops, and meetups happening across the network.</p>
      </div>

      {isDefaultView && !loading && <UpcomingEvents events={events} />}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <EventSearchBar value={searchTerm} onChange={setSearchTerm} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <EventFilters filters={filters} onChange={setFilters} />
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)
          : events.length === 0
          ? <EmptyEventState />
          : events.map((event) => (
              <EventCard key={event._id} event={event} onRegistered={(updated) =>
                setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)))
              } />
            ))}
      </div>
    </div>
  );
}
