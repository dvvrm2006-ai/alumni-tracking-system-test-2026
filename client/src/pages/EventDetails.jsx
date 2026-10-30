import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, User } from 'lucide-react';
import { fetchEventById } from '@/services/eventService';
import EventTimeline from '@/components/events/EventTimeline';
import EventRegistrationButton from '@/components/events/EventRegistrationButton';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setEvent(null);
    fetchEventById(id).then(setEvent).catch(() => setError('Could not load this event.'));
  }, [id]);

  if (error) return <div className="min-h-[70vh] flex items-center justify-center text-red-500 text-sm">{error}</div>;
  if (!event) return <div className="min-h-[70vh] flex items-center justify-center text-slate-400 text-sm">Loading...</div>;

  const remaining = Math.max(event.maximumParticipants - (event.registeredUsers?.length || 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to Events
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />

          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">{event.category}</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{event.eventType}</span>
              </div>

              <h1 className="font-display text-2xl font-bold text-ink mb-3">{event.title}</h1>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{event.description}</p>

              <div className="space-y-2 text-sm text-slate-500">
                {event.venue && (
                  <div className="flex items-center gap-2"><MapPin size={15} className="text-brand-500" /> {event.venue}</div>
                )}
                {event.organizer && (
                  <div className="flex items-center gap-2"><User size={15} className="text-brand-500" /> Organized by {event.organizer}</div>
                )}
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-brand-500" /> {remaining} seats left of {event.maximumParticipants} · {event.registeredUsers?.length || 0} registered
                </div>
              </div>

              <div className="mt-8">
                <EventRegistrationButton event={event} onRegistered={setEvent} />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Timeline</h3>
              <EventTimeline event={event} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
