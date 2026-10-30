import { CalendarClock, PlayCircle, StopCircle } from 'lucide-react';

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
}

export default function EventTimeline({ event }) {
  const steps = [
    { icon: CalendarClock, label: 'Registration closes', value: formatDate(event.registrationDeadline) || 'No deadline' },
    { icon: PlayCircle, label: 'Event starts', value: `${formatDate(event.eventDate)}${event.startTime ? ` · ${event.startTime}` : ''}` },
    { icon: StopCircle, label: 'Event ends', value: event.endTime || formatDate(event.eventDate) },
  ];

  return (
    <div className="relative pl-8">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
      <div className="space-y-6">
        {steps.map(({ icon: Icon, label, value }) => (
          <div key={label} className="relative flex items-start gap-3">
            <div className="absolute -left-8 w-8 h-8 rounded-full bg-white border-2 border-brand-100 flex items-center justify-center">
              <Icon size={14} className="text-brand-500" />
            </div>
            <div>
              <div className="text-xs text-slate-400">{label}</div>
              <div className="text-sm font-medium text-ink">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
