import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchEvents, fetchEventById, deleteEvent } from '@/services/eventService';
import AdminLayout from '@/components/admin/AdminLayout';
import EventsTable from '@/components/admin/EventsTable';
import RegistrationsModal from '@/components/admin/RegistrationsModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AdminEventsPage() {
  const [events, setEvents] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  useEffect(() => {
    fetchEvents({}).then(setEvents).catch(() => toast.error('Could not load events'));
  }, []);

  async function handleDelete(event) {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    try {
      await deleteEvent(event._id);
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success('Event deleted');
    } catch {
      toast.error('Could not delete event');
    }
  }

  async function handleViewRegistrations(event) {
    const fullEvent = await fetchEventById(event._id);
    setViewingEvent(fullEvent);
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink mb-1">Events</h1>
          <p className="text-sm text-slate-500">Create, edit, and manage event registrations.</p>
        </div>
        <Link
          to="/events/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
        >
          <Plus size={16} /> Create Event
        </Link>
      </div>

      {!events ? (
        <LoadingSpinner className="py-12" />
      ) : (
        <EventsTable events={events} onDelete={handleDelete} onViewRegistrations={handleViewRegistrations} />
      )}

      <RegistrationsModal event={viewingEvent} onClose={() => setViewingEvent(null)} />
    </AdminLayout>
  );
}
