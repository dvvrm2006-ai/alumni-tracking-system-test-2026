import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { fetchEventById, createEvent, updateEvent } from '@/services/eventService';
import EventForm from '@/components/events/EventForm';

function toDateInputValue(date) {
  return date ? new Date(date).toISOString().slice(0, 10) : '';
}

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');

  const [defaultValues, setDefaultValues] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editId) {
      fetchEventById(editId).then((event) =>
        setDefaultValues({
          ...event,
          eventDate: toDateInputValue(event.eventDate),
          registrationDeadline: toDateInputValue(event.registrationDeadline),
        })
      );
    } else {
      setDefaultValues({});
    }
  }, [editId]);

  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <ShieldAlert className="text-slate-300 mb-4" size={40} />
        <h1 className="font-display text-xl font-bold text-ink mb-2">Admin access required</h1>
        <p className="text-sm text-slate-500">Only admins can create or edit events.</p>
      </div>
    );
  }

  async function handleSubmit(values) {
    setError('');
    try {
      if (editId) {
        await updateEvent(editId, values);
      } else {
        await createEvent(values);
      }
      navigate('/admin/events');
      toast.success(editId ? 'Event updated' : 'Event created');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event.');
    }
  }

  if (!defaultValues) {
    return <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-8">
        <h1 className="font-display text-2xl font-bold text-ink mb-1">
          {editId ? 'Edit Event' : 'Create Event'}
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          {editId ? 'Update the details for this event.' : 'Add a new event to the alumni network.'}
        </p>

        {error && (
          <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{error}</div>
        )}

        <EventForm defaultValues={defaultValues} onSubmit={handleSubmit} submitLabel={editId ? 'Save Changes' : 'Create Event'} />
      </div>
    </div>
  );
}
