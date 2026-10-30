import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import EventRegistrationButton from '@/components/events/EventRegistrationButton';

function EventCard({ event, onRegistered }) {
  const remaining = Math.max(event.maximumParticipants - (event.registeredUsers?.length || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-100 transition-shadow overflow-hidden flex flex-col"
    >
      <img loading="lazy" src={event.image} alt={event.title} className="w-full h-36 object-cover" />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">
            {event.category}
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {event.eventType}
          </span>
        </div>

        <h3 className="font-display font-semibold text-ink leading-snug">{event.title}</h3>

        <div className="text-xs text-slate-500 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-500 shrink-0" />
            {new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          {(event.startTime || event.endTime) && (
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-brand-500 shrink-0" />
              {event.startTime} {event.endTime && `– ${event.endTime}`}
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-500 shrink-0" /> {event.venue}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-brand-500 shrink-0" />
            {remaining} seat{remaining === 1 ? '' : 's'} left of {event.maximumParticipants}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <Link to={`/events/${event._id}`} className="text-xs font-medium text-brand-600 hover:text-brand-700">
            View Details
          </Link>
          <EventRegistrationButton event={event} onRegistered={onRegistered} />
        </div>
      </div>
    </motion.div>
  );
}

export default memo(EventCard);
