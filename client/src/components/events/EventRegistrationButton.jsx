import { useState } from 'react';
import { CheckCircle2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { registerForEvent } from '@/services/eventService';

export default function EventRegistrationButton({ event, onRegistered, className = '' }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const alreadyRegistered = event.registeredUsers?.some((u) => (u._id || u) === user?.id);
  const isFull = (event.registeredUsers?.length || 0) >= event.maximumParticipants;
  const deadlinePassed = event.registrationDeadline && new Date() > new Date(event.registrationDeadline);

  async function handleRegister() {
    setSubmitting(true);
    setError('');
    try {
      const updated = await registerForEvent(event._id);
      toast.success('You\'re registered for this event!');
      onRegistered?.(updated);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (alreadyRegistered) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-medium ${className}`}>
        <CheckCircle2 size={14} /> Registered
      </span>
    );
  }

  if (isFull || deadlinePassed) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 text-slate-400 text-xs font-medium ${className}`}>
        {isFull ? 'Fully booked' : 'Registration closed'}
      </span>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={handleRegister}
        disabled={submitting}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 disabled:opacity-60 transition-colors"
      >
        <UserPlus size={14} /> {submitting ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
